import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
});

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature");

    const body = await req.text();

    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {

      const session: any = event.data.object;

      const supabase = getSupabaseAdmin();

      await supabase
        .from("entitlements")
        .upsert({
          user_id: session.client_reference_id,
          plan: "premium",
          status: "active",
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription
        });

    }

    return NextResponse.json({ received: true });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
