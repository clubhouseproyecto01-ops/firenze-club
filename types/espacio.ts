export type TipoEspacio =
  | "aforo"
  | "aforo-compartido"
  | "individual";

export interface Espacio {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  aforo: number;
  tipo: TipoEspacio;
}