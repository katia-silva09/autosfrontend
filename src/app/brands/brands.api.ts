import { BrandData } from "@/interface/brand.interface";

export async function AddBrand(brandData: BrandData) {
  const res = await fetch("http://localhost:4000/api/v1/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brandData),
  });

  const data = await res.json();
  console.log(data);
}