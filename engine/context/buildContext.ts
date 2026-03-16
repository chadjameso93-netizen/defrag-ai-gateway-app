import { DefragContext } from "../types"

export function buildContext(input: any): DefragContext {

  return {
    user: input.user,
    others: input.others || [],
    relationship: {
      relationshipType: input.relationshipType || "unknown",
      participants: [input.user, ...(input.others || [])],
      recentEvents: input.recentEvents || []
    },
    timing: {
      timestamp: Date.now(),
      location: input.location || "unknown"
    }
  }

}
