// import React from "react";
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { BrandData } from "@/interface/brand.interface";
import { AddBrand } from "../brands.api";

export function BrandForm() { 
  const { register, handleSubmit } = useForm<BrandData>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await AddBrand(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")}/>
      <Button>Agregar Marca</Button>
    </form>
    );
}
export default BrandForm;
