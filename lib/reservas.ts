import { espacios } from "@/lib/espacios";
import type { Reserva } from "@/types";

const STORAGE_KEY = "reservas";

export function obtenerReservas(): Reserva[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data) as Reserva[];
  } catch {
    return [];
  }
}

export function guardarReservas(reservas: Reserva[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(reservas)
  );
}

export function crearReserva(
  reserva: Reserva
):
  | { ok: true }
  | { ok: false; mensaje: string } {

  const espacio = espacios.find(
    (e) => e.id === reserva.espacioId
  );

  if (!espacio) {
    return {
      ok: false,
      mensaje: "El espacio no existe.",
    };
  }

  const reservas = obtenerReservas();

  const existe = reservas.some(
    (r) =>
      r.nombre === reserva.nombre &&
      r.espacioId === reserva.espacioId &&
      r.fecha === reserva.fecha &&
      r.hora === reserva.hora
  );

  if (existe) {
    return {
      ok: false,
      mensaje: "Ya existe una reserva para ese horario.",
    };
  }

  const cupos = obtenerCuposDisponibles(
    reserva.espacioId,
    reserva.fecha
  );

  if (cupos <= 0) {
    return {
      ok: false,
      mensaje: "No hay cupos disponibles.",
    };
  }

  reservas.push(reserva);

  guardarReservas(reservas);

  return {
    ok: true,
  };
}

export function obtenerCuposDisponibles(
  espacioId: string,
  fecha: string
): number {

  const espacio = espacios.find(
    (e) => e.id === espacioId
  );

  if (!espacio) return 0;

  const reservas = obtenerReservas().filter(
    (r) =>
      r.espacioId === espacioId &&
      r.fecha === fecha
  );

  return Math.max(
    espacio.aforo - reservas.length,
    0
  );
}

export function estaDisponible(
  espacioId: string,
  fecha: string
): boolean {
  return (
    obtenerCuposDisponibles(
      espacioId,
      fecha
    ) > 0
  );
}