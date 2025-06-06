import { Brand, BrandData, BrandResponse } from "@/interface/brand.interface";
import { promises } from "dns";

export async function getAllBrands(
  offset: number = 0,
  limit: number = 3
): Promise<BrandResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/brands?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  ); // )

  return await response.json();
}

export async function AddBrand(brandData: BrandData) {
  const res = await fetch("http://localhost:4000/api/v1/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brandData),
  });

  return await res.json();
}
export async function getBrandById(id: string): Promise<Brand> {
  const response = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener la marca");
  }

  return await response.json();
}

export async function UpdateBrand(id: string, newBrandData: BrandData) {
  const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBrandData),
  });
  return await res.json();
}

export async function DeleteBrand(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
