export type EstadoReserva =
  | "pendiente"
  | "confirmada"
  | "cancelada";

export interface Reserva {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  espacioId: string;
  estado: EstadoReserva;
}