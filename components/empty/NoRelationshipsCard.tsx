"use client";

import Link from "next/link";

export default function NoRelationshipsCard() {
  return (
    <div className="card">
      <div className="result-title">No relationships yet</div>
      <div className="result-copy" style={{ marginTop: 12 }}>
        Add your first relationship to begin building the live relational system.
      </div>
      <div className="actions" style={{ marginTop: 16 }}>
        <Link href="/relationships" className="btn btn-primary">Open relationships</Link>
      </div>
    </div>
  );
}
