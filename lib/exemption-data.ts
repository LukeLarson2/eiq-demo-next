import { Exemption } from '@/lib/types'

export const exemptions: Exemption[] = [
  {
    id: 1,
    type: "Tax Exemption",
    number: "TX-2023-789456",
    issuedBy: "Florida Department of Revenue",
    expirationDate: "2025-04-15",
    status: "active"
  },
  {
    id: 2,
    type: "Reseller Certificate",
    number: "RS-2022-123987",
    issuedBy: "State Board of Equalization",
    expirationDate: "2024-09-30",
    status: "active"
  },
  {
    id: 3,
    type: "Non-Profit Exemption",
    number: "NP-2023-456123",
    issuedBy: "Internal Revenue Service",
    expirationDate: "2023-10-12",
    status: "expired"
  },
  {
    id: 4,
    type: "Educational Exemption",
    number: "ED-2023-987654",
    issuedBy: "Department of Education",
    expirationDate: "2026-01-31",
    status: "pending"
  }
]