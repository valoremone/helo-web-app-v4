export type UserRole = 'admin' | 'member'

export interface User {
  id: string
  email: string
  role: UserRole
  firstName?: string
  lastName?: string
  phone?: string
  photoUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  flightType: 'one-way' | 'round-trip'
  departureLocation: string
  arrivalLocation: string
  departureDate: string
  returnDate?: string
  passengerCount: number
  passengers: Passenger[]
  groundTransportation: boolean
  pickupAddress?: string
  dropoffAddress?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export interface Passenger {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  weight: number
  photoIdUrl?: string
}

export interface Aircraft {
  id: string
  model: string
  registration: string
  capacity: number
  range: number
  status: 'available' | 'maintenance' | 'reserved'
  baseLocation: string
}

export interface Location {
  id: string
  name: string
  code: string
  type: 'heliport' | 'fbo' | 'lounge'
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  amenities: string[]
}

export interface Vehicle {
  id: string
  model: string
  registration: string
  type: 'escalade'
  features: string[]
  status: 'available' | 'reserved' | 'maintenance'
}

export interface Membership {
  id: string
  userId: string
  type: 'standard' | 'premium' | 'elite'
  status: 'active' | 'inactive' | 'pending'
  startDate: string
  endDate: string
  benefits: string[]
} 