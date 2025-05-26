"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { getAllBrands } from "../../app/api/brands.api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addCar, updateCar } from "../../app/api/cars.api";
import { CarData } from "../../interface/car.interface";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export function CarFormEdit({ cars }: any) {
  console.log(cars);
  const { register, handleSubmit, setValue, reset, watch } = useForm<CarData>({
    defaultValues: {
      model: cars?.model,
      description: cars?.description,
      year: cars?.year,
      stock: cars?.stock,
      price: cars?.price,
      brand_id: cars?.brand_id,
    },
  });
  const router = useRouter();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const params = useParams<{ id: string }>();
  const brandId = watch("brand_id");

  // Cargar marcas
  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getAllBrands(0, 100);
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjIxODk3LCJleHAiOjE3NDgyMjkwOTd9.p0rBW0HlJ3zSksES_ObkTWLWYTgc0Ow3hiBgTD97QMw";

    if (params?.id) {
      await updateCar(params.id, data, token);
    } else {
      await addCar(data, token);
    }

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
      <Select
        value={brandId?.toString()}
        onValueChange={(value) => setValue("brand_id", parseInt(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>
            {brands.find((b) => b.id === brandId)?.name ||
              "Selecciona una Marca"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit">
        {params.id ? "Actualizar Vehículo" : "Crear Vehículo"}
      </Button>
    </form>
  );
}

export default CarFormEdit;
