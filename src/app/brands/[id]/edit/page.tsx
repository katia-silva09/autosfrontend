import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { get } from "http";
import { BrandFormEdit } from "./brand-formedit";
import { getBrandById } from "../../brands.api";

interface Props {
  params: {
    id: string;
  };
}

async function BrandsAddPage({ params }: Props) {
  // console.log(params);
  const brand = await getBrandById(params.id);
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandFormEdit brand={brand} />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsAddPage;
