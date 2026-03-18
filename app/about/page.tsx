import TopNav from "@/components/TopNav";

export default function AboutPage() {
  return (
    <main className="landing-root">
      <TopNav />

      <section className="shell static-page">
        <div className="kicker">About</div>
        <h1 className="static-title">Defrag is a relational intelligence platform.</h1>
        <p className="static-copy">
          It is built to help people see what is happening between them and their people more clearly, from more than one side, before they act.
        </p>

        <div className="static-grid">
          <section className="rail-map-surface">
            <div className="result-title">Clearer reads</div>
            <div className="result-copy">
              Defrag reduces guesswork by combining timing, patterns, and relationship context into one place.
            </div>
          </section>

          <section className="rail-map-surface">
            <div className="result-title">Calmer guidance</div>
            <div className="result-copy">
              The product is built to help users respond steadily, not react quickly.
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
