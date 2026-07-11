"use client";

import { espacios } from "@/lib/espacios";
import SpaceCard from "@/components/modules/reservas/SpaceCard";

export default function ReservasPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Encabezado */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Reservas
          </h1>

          <p className="mt-3 max-w-3xl text-zinc-400">
            Reserva fácilmente las zonas comunes del conjunto residencial.
            Selecciona el espacio que deseas utilizar para consultar
            disponibilidad y realizar tu reserva.
          </p>
        </header>

        {/* Grid */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {espacios.map((espacio) => (
            <SpaceCard
              key={espacio.id}
              espacio={espacio}
            />
          ))}
        </section>
      </div>
    </main>
  );
}