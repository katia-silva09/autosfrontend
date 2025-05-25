// import React from "react";
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { BrandData } from "@/interface/brand.interface";
import { AddBrand, UpdateBrand } from "../../brands.api";
import { useParams, useRouter } from "next/navigation";

export function BrandFormEdit({ brand }: any) {
  console.log(brand);
  const { register, handleSubmit } = useForm<BrandData>({
    defaultValues: {
      name: brand?.name,
      description: brand?.description,
    },
  });
  const router = useRouter();
  const params = useParams<{ id: string }>();
  console.log(params);

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      // console.log("update");
      await UpdateBrand(params.id, data);
    } else {
      console.log("create"), await AddBrand(data);
    }

    router.push("/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Button>{params.id ? "Update Brand" : "Create Brand"}</Button>
    </form>
  );
}
export default BrandFormEdit;
