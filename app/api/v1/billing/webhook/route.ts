import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/billing/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing Stripe webhook configuration" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const payload = await req.text();

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    const supabase = getSupabaseAdmin();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      await supabase.from("entitlements").upsert({
        user_id: session.client_reference_id,
        plan: "premium",
        status: "active",
        stripe_customer_id: session.customer || null,
        stripe_subscription_id: session.subscription || null,
        updated_at: new Date().toISOString()
      });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as any;

      await supabase
        .from("entitlements")
        .update({
          status: "inactive",
          updated_at: new Date().toISOString()
        })
        .eq("stripe_subscription_id", subscription.id);
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as any;

      await supabase
        .from("entitlements")
        .update({
          status: subscription.status === "active" ? "active" : "inactive",
          current_period_end: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null,
          updated_at: new Date().toISOString()
        })
        .eq("stripe_subscription_id", subscription.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
