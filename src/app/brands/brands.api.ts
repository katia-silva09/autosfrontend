import { BrandData, BrandResponse } from "@/interface/brand.interface";
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
