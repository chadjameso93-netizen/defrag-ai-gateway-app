type InvitePageProps = {
  params: { token: string };
};

async function getInvite(token: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app";
  const res = await fetch(`${base}/api/v1/invites/${token}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function InvitePage({ params }: InvitePageProps) {
  const data = await getInvite(params.token);

  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="kicker">Invite</div>
          <h1 className="section-title">Complete your profile to join Defrag</h1>

          {!data?.ok ? (
            <p className="muted">This invite could not be found or may have expired.</p>
          ) : (
            <>
              <p className="muted">
                You have been invited to contribute your profile for a Defrag relationship view.
              </p>

              <div className="result-card" style={{ marginTop: 20 }}>
                <div className="result-block">
                  <div className="result-title">Invite status</div>
                  <div className="result-copy">{data.invite.status}</div>
                </div>
                <div className="result-block">
                  <div className="result-title">Channel</div>
                  <div className="result-copy">{data.invite.channel}</div>
                </div>
                <div className="result-block">
                  <div className="result-title">Next step</div>
                  <div className="result-copy">
                    The next sprint will connect this page to the full profile submission form.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
