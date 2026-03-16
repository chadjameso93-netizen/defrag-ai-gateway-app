import TopNav from "@/components/TopNav";

export default function HowItWorks() {
  return (
    <main>
      <TopNav />
      <div className="shell" style={{ paddingTop: 24 }}>
        <h1 className="section-title">How it works</h1>
        <p className="muted">Defrag looks at what happened, how much pressure seems to be building, and what kind of next step is least likely to backfire.</p>
        <div className="grid grid-3" style={{ marginTop: 24 }}>
          <div className="card"><h3>1. Tell us what happened</h3><p className="muted">Write what happened in your own words.</p></div>
          <div className="card"><h3>2. Get a calm read</h3><p className="muted">See what may be going on and how risky the moment feels.</p></div>
          <div className="card"><h3>3. Choose a better next move</h3><p className="muted">Get one message and one pacing choice that lowers pressure.</p></div>
        </div>
      </div>
    </main>
  );
}
