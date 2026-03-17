"use client";

export default function ChatMessage({ role, data }: any) {
  if (role === "assistant") {
    return (
      <div className="chat-message assistant">
        <div className="chat-bubble">
          <p className="assistant-summary">{data.summary}</p>

          <div className="chat-section">
            <strong>From your side</strong>
            <p>{data.perspectives?.you || ""}</p>
          </div>

          <div className="chat-section">
            <strong>From their side</strong>
            <p>{data.perspectives?.them || ""}</p>
          </div>

          <div className="chat-section">
            <strong>What this looks like</strong>
            <p>{data.system || ""}</p>
          </div>

          <div className="chat-section">
            <strong>What to do next</strong>
            <p>{data.guidance || ""}</p>
          </div>

          <div className="chat-section">
            <strong>What to avoid</strong>
            <p>{data.avoid || ""}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-message user">
      <div className="chat-bubble">{data}</div>
    </div>
  );
}
