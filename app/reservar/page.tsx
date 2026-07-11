"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import ReservaForm from "@/components/modules/reservas/ReservaForm";

import { espacios } from "@/lib/espacios";
import { crearReserva } from "@/lib/reservas";

import type { Reserva } from "@/types";

export default function ReservarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const espacioId = searchParams.get("id");

  const espacio = useMemo(
    () => espacios.find((e) => e.id === espacioId),
    [espacioId]
  );

  const [mensaje, setMensaje] = useState("");

  if (!espacio) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white">
            Espacio no encontrado
          </h1>

          <p className="mt-4 text-zinc-400">
            El espacio solicitado no existe.
          </p>

          <Button
            className="mt-6"
            onClick={() => router.push("/reservas")}
          >
            Volver
          </Button>
        </Card>
      </main>
    );
  }

  function handleReserva(reserva: Reserva) {
    const resultado = crearReserva(reserva);

    if (!resultado.ok) {
      setMensaje(resultado.mensaje);
      return;
    }

    setMensaje("✅ Reserva realizada correctamente.");

    setTimeout(() => {
      router.push("/reservas");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-zinc-950 py-10 px-6">
      <div className="mx-auto max-w-2xl space-y-6">

        <Card>
          <div className="text-center">

            <div className="text-6xl mb-4">
              {espacio.icono}
            </div>

            <h1 className="text-3xl font-bold text-white">
              {espacio.nombre}
            </h1>

            <p className="mt-3 text-zinc-400">
              {espacio.descripcion}
            </p>

            <div className="mt-6 rounded-xl bg-zinc-800 p-4">
              <span className="text-zinc-400">
                Aforo máximo:
              </span>

              <span className="ml-2 font-bold text-emerald-400">
                {espacio.aforo}
              </span>
            </div>

          </div>
        </Card>

        <ReservaForm
          espacio={espacio}
          onSubmit={handleReserva}
          onCancel={() => router.push("/reservas")}
        />

        {mensaje && (
          <Card>
            <p className="text-center text-emerald-400">
              {mensaje}
            </p>
          </Card>
        )}

      </div>
    </main>
  );
}