export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  stock: number
  featured?: boolean
}

export interface CustomerInfo {
  name: string
  emailAddress: string
  addressLine1: string
  phoneNumber: string
  city: string
  country: string
  postalCode: string
  region: string
}

export interface Exemption {
  id: number
  type: string
  number: string
  issuedBy: string
  expirationDate: string
  status: 'active' | 'pending' | 'expired'
}