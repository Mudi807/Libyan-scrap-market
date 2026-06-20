// src/types/index.ts
//
// Shared TypeScript types mirroring the backend Prisma schema.

export type Role = 'BUYER' | 'SELLER' | 'ADMIN';

export type MaterialType = 'METAL' | 'PLASTIC' | 'ELECTRONICS' | 'PAPER' | 'OTHER';

export type PricingType = 'FIXED' | 'BID';

export type ListingStatus = 'ACTIVE' | 'PENDING' | 'SOLD' | 'REMOVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  address?: string | null;
  createdAt?: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description?: string | null;
  materialType: MaterialType;
  subtype?: string | null;
  estimatedWeightKg: number;
  pricePerKg?: number | null;
  pricingType: PricingType;
  photos?: string[] | null;
  status: ListingStatus;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  createdAt: string;
  seller?: {
    id: string;
    name: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
}
