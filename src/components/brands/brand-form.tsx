// import React from "react";
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { BrandData } from "@/interface/brand.interface";
import { useRouter } from "next/navigation";
import { AddBrand } from "../../app/api/brands.api";

export function BrandForm() {
  const { register, handleSubmit } = useForm<BrandData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await AddBrand(data);
    router.push("/dashboard/brands");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Button>Agregar Marca</Button>
    </form>
  );
}
export default BrandForm;
