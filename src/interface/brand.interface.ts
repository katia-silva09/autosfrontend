// export interface BrandData {
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string
// }

export interface Brand {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface BrandData {
  name: string;
  description?: string;
}

export interface BrandResponse {
  data: Brand[];
  total: number;
}
