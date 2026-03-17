"use client";

export default function AuthSetupNotice() {
  const enabled =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <div className="card">
      <div className="result-title">Auth status</div>
      <div className="result-copy" style={{ marginTop: 12 }}>
        {enabled
          ? "Public auth env is present. Email sign-in can be activated."
          : "Public auth env is not present yet. Preview mode remains active until anon auth env is added."}
      </div>
    </div>
  );
}
