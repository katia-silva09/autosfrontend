"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Brand } from "../../interface/brand.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DeleteBrand, getAllBrands } from "../../app/api/brands.api";
import { BiPencil, BiTrash } from "react-icons/bi";
import { PiPlusCircleBold } from "react-icons/pi";

export const dynamic = "force-dynamic";

interface BrandsResponse {
  data: Brand[];
  total: number;
}

export function BrandTable() {
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
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/brands/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Marca
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandsData.data.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.description || "Sin descripción"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/brands/${brand.id}/edit`}>
                      <Button
                        //   variant="outline"
                        size="sm"
                        className="bg-blue-600 text-white :hover:bg-blue-700"
                      >
                        <BiPencil className="h-4 w-4" /> Editar
                      </Button>
                    </Link>
                    <Button
                      //   variant="destructive"
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handDeleteBrand(brand.id)}
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadBrands(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(brandsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= brandsData.total}
          onClick={() => loadBrands(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default BrandTable;
