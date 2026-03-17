"use client";

import { useEffect, useState } from "react";

export default function EventHistory({ relationshipId }: any) {

  const [events,setEvents] = useState<any[]>([])

  useEffect(()=>{

    async function load(){
      const res = await fetch(`/api/v1/events?relationshipId=${relationshipId}`)
      const data = await res.json()
      setEvents(data.events || [])
    }

    load()

  },[relationshipId])

  return (

    <div className="card">

      <div className="kicker">Timeline events</div>

      {events.length === 0 && (
        <div className="muted">No events yet.</div>
      )}

      <div style={{display:"grid",gap:12,marginTop:12}}>

        {events.map(e=>(
          <div key={e.id} className="message-box">
            <div className="result-title">{e.event_type}</div>
            <div className="result-copy">{e.notes || "No notes"}</div>
          </div>
        ))}

      </div>

    </div>

  )
}
