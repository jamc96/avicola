/**
 * Tipos del dominio, derivados de docs/02-modelo-de-datos.md.
 * Los tipos son orientativos para el POC, no un esquema de base de datos definitivo.
 */

export type Rol = "trabajador" | "supervisor" | "dueno" | "admin";

export type TipoAlimento = "Súper Inicio" | "Súper Final";

export type EstadoGalpon = "libre" | "ocupado";

export type EstadoCosecha = "activa" | "cerrada";

export interface Usuario {
  id: string;
  nombre: string;
  rol: Rol;
  /** Galpones asignados (aplica a trabajador y supervisor). */
  galponesAsignados: string[];
}

export interface Granja {
  id: string;
  nombre: string;
}

export interface Galpon {
  id: string;
  nombre: string;
  granjaId: string;
  estado: EstadoGalpon;
}

export interface Cosecha {
  id: string;
  nombre: string;
  avesRecibidasTotal: number;
  fechaIngreso: string;
  galponRecepcionId: string;
  estado: EstadoCosecha;
  fechaCierre?: string;
}

/** Tramo de una cosecha dentro de un galpon especifico. */
export interface CosechaGalpon {
  id: string;
  cosechaId: string;
  galponId: string;
  avesIniciales: number;
}

/** Captura diaria del trabajador: mortalidad y consumo. */
export interface RegistroDiario {
  id: string;
  cosechaGalponId: string;
  /** Fecha y usuario se guardan automaticamente (principio de captura minima). */
  fecha: string;
  usuarioId: string;
  avesMuertas: number;
  tipoAlimento: TipoAlimento;
  sacosConsumidos: number;
}

export interface BloqueMuestreo {
  avesPesadas: number;
  pesoTotalLb: number;
}

/** Muestreo de peso de las semanas de control (dias 14/21/28/35/42). */
export interface MuestreoPeso {
  id: string;
  cosechaGalponId: string;
  fecha: string;
  usuarioId: string;
  semana: number;
  bloques: [BloqueMuestreo, BloqueMuestreo, BloqueMuestreo];
}

/** Movimiento de aves entre galpones (opcional). */
export interface TransferenciaAves {
  id: string;
  cosechaId: string;
  fecha: string;
  usuarioId: string;
  galponOrigenId: string;
  galponDestinoId: string;
  cantidadAves: number;
}

export type DireccionMovimiento = "entrada" | "salida";

export interface MovimientoInventario {
  id: string;
  fecha: string;
  usuarioId: string;
  tipoAlimento: TipoAlimento;
  cantidadSacos: number;
  direccion: DireccionMovimiento;
  /** Solo si direccion = "salida" (bodega -> galpon). */
  galponDestinoId?: string;
}

export interface EntregaPlanta {
  id: string;
  cosechaGalponId: string;
  fecha: string;
  usuarioId: string;
  avesEntregadas: number;
  pesoTotalLb: number;
  precioPorLb?: number;
}

export type EstadoTarea = "pendiente" | "hecha";

export interface Tarea {
  id: string;
  descripcion: string;
  galponId: string;
  asignadoA: string;
  fechaProgramada: string;
  estado: EstadoTarea;
}

export type EstadoPermiso = "pendiente" | "aprobado" | "rechazado";

export interface SolicitudPermiso {
  id: string;
  usuarioId: string;
  fecha: string;
  motivo: string;
  estado: EstadoPermiso;
}

export type NivelAlerta = "ok" | "atencion" | "critico";

export interface Alerta {
  id: string;
  cosechaGalponId: string;
  nivel: NivelAlerta;
  mensaje: string;
  fecha: string;
}
