import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../components/ui/button";
import { getAllBrands } from "./brands/brands.api";
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
  const [offser, setOffset] = useState(0);
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

        <TableBody>{brandsData.data.map(brand)}</TableBody>
      </Table>
    </>
  );
}

export default HomePage;
