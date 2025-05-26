import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CarTable from "@/components/cars/car-table";

function CarsTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Autos</CardTitle>
        </CardHeader>
        <CardContent>
          <CarTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsTablePage;
