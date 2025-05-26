"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getAllBrands } from "../../app/api/brands.api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addCar } from "../../app/api/cars.api";
import { CarData } from "../../interface/car.interface";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export function CarForm() {
  const { register, handleSubmit, setValue } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getAllBrands(0, 100);
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjA5NjQxLCJleHAiOjE3NDgyMTY4NDF9.z6LsVFhS2LhIQGrD6EGu2TPeViX80guiX982AJVgiTY";
    console.log(data);
    await addCar(data, token);
    router.push("/dashboard/cars/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Modelo</Label>
      <Input {...register("model")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Label>Año</Label>
      <Input type="number" {...register("year", { valueAsNumber: true })} />
      <Label>Stock</Label>
      <Input type="number" {...register("stock", { valueAsNumber: true })} />
      <Label>Precio</Label>
      <Input type="number" {...register("price", { valueAsNumber: true })} />

      <Label>Marca</Label>
      <Select onValueChange={(value) => setValue("brand_id", parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona una Marca" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar Auto
      </Button>
    </form>
  );
}
