"use client";

import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  return (
    <main className="dashboard">

      {/* LEFT: CHAT */}
      <section className="main">
        <h2>Defrag AI</h2>

        <div className="chat">
          <div className="message ai">
            You can start by describing what’s happening.
          </div>
        </div>

        <textarea
          placeholder="What’s going on?"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button>Send</button>
      </section>

      {/* RIGHT: LIVE SYSTEM */}
      <aside className="side">

        <div className="system-map">
          <p>Relationship map appears here</p>
        </div>

        <div className="daily-read">
          <h3>Today</h3>
          <p>
            Keep communication simple today. Let things settle before pushing clarity.
          </p>
        </div>

      </aside>

    </main>
  );
}
