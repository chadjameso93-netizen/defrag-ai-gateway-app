"use client";

import { useState } from "react";

export default function InsightDrawer({
  title,
  summary,
  detail
}: {
  title: string;
  summary: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="insight-drawer">
      <button
        type="button"
        className="insight-drawer-button"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <strong>{summary}</strong>
      </button>

      {open ? <div className="insight-drawer-detail">{detail}</div> : null}
    </div>
  );
}
