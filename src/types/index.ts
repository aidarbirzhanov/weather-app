export interface City {
  latitude: number
  longitude: number
  country: string
}

export interface Weather {
  city: string | null
  country: string | null
  temperature: number | null
}