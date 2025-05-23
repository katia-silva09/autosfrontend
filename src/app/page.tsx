"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../components/ui/button";
import { DeleteBrand, getAllBrands } from "./brands/brands.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Brand } from "../interface/brand.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export const dynamic = "force-dynamic";

interface BrandsResponse {
  data: Brand[];
  total: number;
}

export default function HomePage() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [brandsData, setBrandsData] = useState<BrandsResponse>({
    data: [],
    total: 0,
  });

  const loadBrands = async (newOffset: number) => {
    const result = await getAllBrands(newOffset, limit);
    setBrandsData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadBrands(0);
  }, []);

  const handDeleteBrand = async (id: number) => {
    await DeleteBrand(id);
    loadBrands(offset);
    // alert(`Marca con id ${id} eliminada`);
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Concesionario de carros</h1>
        <Link href="/brands/add" className={buttonVariants()}>
          Crear Marca
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {brandsData.data.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.description || "Sin descripción"}</TableCell>

              <TableCell className="text-right">
                <Button variant="outline" className="mr-2">
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handDeleteBrand(brand.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadBrands(offset - limit)}
        >
          Anterior
        </Button>

        <span className="text-sm text-gray-600">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(brandsData.total / limit)}
        </span>

        <Button
          variant="outline"
          disabled={offset + limit >= brandsData.total}
          onClick={() => loadBrands(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
}
