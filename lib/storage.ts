import type { Reserva } from "@/types";

const STORAGE_KEY = "firenze-club-reservas";

/**
 * Obtiene todas las reservas almacenadas.
 */
export function obtenerReservas(): Reserva[] {
  if (typeof window === "undefined") {
    return [];
  }

  const datos = localStorage.getItem(STORAGE_KEY);

  if (!datos) {
    return [];
  }

  try {
    return JSON.parse(datos) as Reserva[];
  } catch (error) {
    console.error("Error leyendo reservas:", error);
    return [];
  }
}

/**
 * Guarda el arreglo completo de reservas.
 */
export function guardarReservas(reservas: Reserva[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
}

/**
 * Agrega una nueva reserva.
 */
export function agregarReserva(reserva: Reserva): void {
  const reservas = obtenerReservas();

  reservas.push(reserva);

  guardarReservas(reservas);
}

/**
 * Elimina una reserva.
 */
export function eliminarReserva(index: number): void {
  const reservas = obtenerReservas();

  reservas.splice(index, 1);

  guardarReservas(reservas);
}

/**
 * Borra todas las reservas.
 * (Útil para desarrollo y futuras herramientas del administrador)
 */
export function limpiarReservas(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}