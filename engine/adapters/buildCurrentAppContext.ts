import { DefragContext, PersonProfile } from "../types"

export function buildCurrentAppContext(text: string): DefragContext {
  const user: PersonProfile = {
    id: "current-user",
    name: "User",
    natal: {
      birthDate: "1990-01-01",
      birthTime: null,
      birthTimeConfidence: "unknown",
      birthLocation: "unknown"
    }
  }

  const others: PersonProfile[] = []

  return {
    user,
    others,
    relationship: {
      relationshipType: "unknown",
      participants: [user],
      recentEvents: [text]
    },
    timing: {
      timestamp: Date.now(),
      location: "unknown"
    }
  }
}
