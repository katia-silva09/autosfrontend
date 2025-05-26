import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { get } from "http";
import { getCarsById } from "../../../../api/cars.api";
import CarFormEdit from "../../../../../components/cars/cars-formedit";

interface Props {
  params: {
    id: string;
  };
}

async function CarsAddPage({ params }: Props) {
  // console.log(params);
  const cars = await getCarsById(params.id);
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <CarFormEdit cars={cars} />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsAddPage;
