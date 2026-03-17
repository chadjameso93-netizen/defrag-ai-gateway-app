"use client";

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import RelationshipHeader from "@/components/relationships/RelationshipHeader"
import RelationshipStateCard from "@/components/relationships/RelationshipStateCard"
import EventHistory from "@/components/relationships/EventHistory"

export default function RelationshipDetail(){

  const params = useParams()
  const relationshipId = params?.id as string

  const [relationship,setRelationship] = useState<any>(null)
  const [state,setState] = useState<any>(null)

  useEffect(()=>{

    async function load(){

      const r = await fetch(`/api/v1/relationships/detail?id=${relationshipId}`)
      const rd = await r.json()

      setRelationship(rd.relationship)

      const s = await fetch(`/api/v1/relationships/state?relationshipId=${relationshipId}`)
      const sd = await s.json()

      setState(sd)

    }

    if(relationshipId) load()

  },[relationshipId])

  return (

    <AppShell
      title="Relationship"
      subtitle="Live relational state, event history, and system signals."
    >

      <div className="grid console-grid-two">

        <RelationshipHeader relationship={relationship} />

        <RelationshipStateCard state={state} />

      </div>

      <div style={{marginTop:24}}>

        <EventHistory relationshipId={relationshipId} />

      </div>

    </AppShell>

  )
}
