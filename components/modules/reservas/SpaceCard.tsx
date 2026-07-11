"use client";

import Link from "next/link";

import type { Espacio } from "@/types";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface SpaceCardProps {
  espacio: Espacio;
}

export default function SpaceCard({ espacio }: SpaceCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-5 text-5xl">
          {espacio.icono}
        </div>

        <h2 className="text-xl font-bold text-white">
          {espacio.nombre}
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {espacio.descripcion}
        </p>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-800/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              Aforo máximo
            </span>

            <span className="font-semibold text-emerald-400">
              {espacio.aforo}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/reservar?id=${espacio.id}`}
        className="mt-8 block"
      >
        <Button>
          Reservar
        </Button>
      </Link>
    </Card>
  );
}