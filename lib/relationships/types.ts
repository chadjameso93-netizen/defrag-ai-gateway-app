export interface BirthData {
  date: string
  time: string
  location: string
}

export interface Relationship {
  id: string
  owner_id: string
  name: string
  role: string
  birth: BirthData
  created_at: string
}
