"use client";

import { useState } from "react";

export default function ExpandableInsight({
  label,
  summary,
  detail,
}: {
  label: string;
  summary: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="expandable-insight">
      <button
        type="button"
        className="expandable-head"
        onClick={() => setOpen(!open)}
      >
        <span className="expandable-label">{label}</span>
        <p className="expandable-summary">{summary}</p>
      </button>

      {open ? <div className="expandable-detail">{detail}</div> : null}
    </div>
  );
}
