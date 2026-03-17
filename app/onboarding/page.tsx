"use client";

import { useState } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    date: "",
    time: "",
    location: ""
  });

  function update(key: string, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <main className="onboarding">
      <div className="onboarding-inner">

        <h1>Set up your profile</h1>
        <p>This allows Defrag to read timing and interaction patterns accurately.</p>

        {step === 0 && (
          <div className="step">
            <input placeholder="Your name" onChange={(e)=>update("name", e.target.value)} />
            <button onClick={()=>setStep(1)}>Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="step">
            <input type="date" onChange={(e)=>update("date", e.target.value)} />
            <input type="time" onChange={(e)=>update("time", e.target.value)} />
            <input placeholder="City / Location" onChange={(e)=>update("location", e.target.value)} />
            <button onClick={()=>setStep(2)}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <p>We’ll use this to guide timing, communication, and relationship dynamics.</p>
            <button onClick={()=>window.location.href="/app"}>
              Enter Defrag
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
