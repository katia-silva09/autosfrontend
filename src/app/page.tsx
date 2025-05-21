import Link from "next/link";
import React from "react";
import { buttonVariants } from "../components/ui/button";

function HomePage() {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">Concesionario de carros</h1>
      <Link href="/brands/add" className={buttonVariants()}>
        Crear Marca
      </Link>
    </div>
  );
}

export default HomePage;
