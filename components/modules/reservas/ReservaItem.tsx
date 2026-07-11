"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { espacios } from "@/lib/espacios";
import type { Reserva } from "@/types";

interface ReservaItemProps {
  reserva: Reserva;
  onCancel?: (id: string) => void;
}

export default function ReservaItem({
  reserva,
  onCancel,
}: ReservaItemProps) {
  const espacio = espacios.find(
    (e) => e.id === reserva.espacioId
  );

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            {espacio?.icono} {espacio?.nombre ?? "Espacio"}
          </h3>

          <p className="mt-2 text-zinc-400">
            👤 {reserva.nombre}
          </p>

          <p className="text-zinc-400">
            📅 {reserva.fecha}
          </p>

          <p className="text-zinc-400">
            🕒 {reserva.hora}
          </p>

          <p className="mt-2">
            Estado:{" "}
            <span
              className={`font-semibold ${
                reserva.estado === "confirmada"
                  ? "text-emerald-400"
                  : reserva.estado === "cancelada"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {reserva.estado}
            </span>
          </p>
        </div>

        {onCancel && reserva.estado !== "cancelada" && (
          <div className="w-full md:w-40">
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-500"
              onClick={() => onCancel(reserva.id)}
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}