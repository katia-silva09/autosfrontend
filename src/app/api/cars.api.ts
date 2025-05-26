import { Car, CarData, CarsResponse } from "../../interface/car.interface";
import { twMerge } from "tailwind-merge";

export async function getAllCars(
  offset: number = 0,
  limit: number = 3
): Promise<CarsResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/cars?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  ); // )

  return await response.json();
}

export async function addCar(carData: CarData, token: string) {
  const res = await fetch("http://localhost:4000/api/v1/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  return await res.json();
}

export async function getCarsById(id: string): Promise<Car> {
  const response = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener la carro");
  }

  return await response.json();
}

export async function updateCar(
  id: string,
  newcarData: CarData,
  token: string
) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newcarData),
  });

  return await res.json();
}
export async function deleteCar(id: number, token: string) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
