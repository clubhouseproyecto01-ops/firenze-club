"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import type { Espacio, Reserva } from "@/types";

interface ReservaFormProps {
  espacio: Espacio;
  onSubmit: (reserva: Reserva) => void;
  onCancel?: () => void;
}

export default function ReservaForm({
  espacio,
  onSubmit,
  onCancel,
}: ReservaFormProps) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      fecha === "" ||
      hora === ""
    ) {
      alert("Completa todos los campos.");
      return;
    }

    onSubmit({
  id: crypto.randomUUID(),
  nombre: nombre.trim(),
  fecha,
  hora,
  espacioId: espacio.id,
  estado: "pendiente",
});

    setNombre("");
    setFecha("");
    setHora("");
  }

  return (
    <Card>
      <h2 className="mb-2 text-2xl font-bold text-white">
        {espacio.icono} {espacio.nombre}
      </h2>

      <p className="mb-6 text-zinc-400">
        {espacio.descripcion}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Nombre
          </label>

          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Fecha
          </label>

          <input
            type="date"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Hora
          </label>

          <input
            type="time"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit">
            Reservar
          </Button>

          {onCancel && (
            <Button
              type="button"
              className="bg-zinc-700 hover:bg-zinc-600"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}