import TopNav from "@/components/TopNav";

export default function PrivacyPage() {
  return (
    <main>
      <TopNav />
      <div className="shell section">
        <div className="kicker">Privacy</div>
        <h1 className="section-title">Privacy Policy</h1>
        <div className="card" style={{ maxWidth: 860 }}>
          <p className="muted">
            Defrag helps users understand relationship situations through AI-generated guidance.
          </p>
          <p className="muted">
            We may process the text you submit in order to generate responses and improve product reliability.
          </p>
          <p className="muted">
            We do not sell personal information. We use service providers such as hosting, payment, and AI infrastructure providers to operate the product.
          </p>
          <p className="muted">
            If you have privacy questions, contact: support@defrag.app
          </p>
          <p className="muted">
            By using Defrag, you understand that AI output may be imperfect and should be used with judgment.
          </p>
        </div>
      </div>
    </main>
  );
}
