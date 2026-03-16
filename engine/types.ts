export type NatalData = {
  birthDate: string
  birthTime: string | null
  birthTimeConfidence: "exact" | "approx" | "unknown"
  birthLocation: string
}

export type PersonProfile = {
  id: string
  name: string
  natal: NatalData
}

export type RelationshipContext = {
  relationshipType: string
  participants: PersonProfile[]
  recentEvents?: string[]
}

export type TimingContext = {
  timestamp: number
  location: string
}

export type DefragContext = {
  user: PersonProfile
  others: PersonProfile[]
  relationship: RelationshipContext
  timing: TimingContext
}

export type DefragInsight = {
  relationalState: string
  pressureLevel: string
  explanation: string
  recommendedAction: string
  messageOption?: string
}
