/**
 * Datos de ejemplo del POC. Sirven para validar el flujo y la interfaz
 * antes de conectar a datos de produccion (plan seccion 15).
 */

import type {
  Cosecha,
  CosechaGalpon,
  Galpon,
  Granja,
  MovimientoInventario,
  MuestreoPeso,
  RegistroDiario,
  SolicitudPermiso,
  Tarea,
  Usuario,
} from "./types.js";

export const GRANJA: Granja = { id: "granja-1", nombre: "Granja Inmeca" };

export const GALPONES: Galpon[] = [
  { id: "galpon-1", nombre: "Galpón 1", granjaId: GRANJA.id, estado: "ocupado" },
  { id: "galpon-2", nombre: "Galpón 2", granjaId: GRANJA.id, estado: "ocupado" },
  { id: "galpon-3", nombre: "Galpón 3", granjaId: GRANJA.id, estado: "libre" },
];

export const USUARIOS: Usuario[] = [
  { id: "u-dueno", nombre: "Don Marco", rol: "dueno", galponesAsignados: [] },
  { id: "u-supervisor", nombre: "Elena Rivas", rol: "supervisor", galponesAsignados: ["galpon-1", "galpon-2"] },
  { id: "u-trabajador-1", nombre: "José Mejía", rol: "trabajador", galponesAsignados: ["galpon-1"] },
  { id: "u-trabajador-2", nombre: "Ana Flores", rol: "trabajador", galponesAsignados: ["galpon-2"] },
  { id: "u-admin", nombre: "Soporte técnico", rol: "admin", galponesAsignados: [] },
];

export const COSECHA: Cosecha = {
  id: "cosecha-2026-07",
  nombre: "Cosecha 1 de julio 2026",
  avesRecibidasTotal: 24000,
  fechaIngreso: "2026-07-01",
  galponRecepcionId: "galpon-1",
  estado: "activa",
};

/** La cosecha se recibio en el galpon 1 y parte se transfirio al galpon 2 en la semana 2. */
export const COSECHA_GALPONES: CosechaGalpon[] = [
  { id: "cg-1", cosechaId: COSECHA.id, galponId: "galpon-1", avesIniciales: 14000 },
  { id: "cg-2", cosechaId: COSECHA.id, galponId: "galpon-2", avesIniciales: 10000 },
];

export const REGISTROS_DIARIOS: RegistroDiario[] = [
  { id: "rd-1", cosechaGalponId: "cg-1", fecha: "2026-07-20", usuarioId: "u-trabajador-1", avesMuertas: 12, tipoAlimento: "Súper Final", sacosConsumidos: 46 },
  { id: "rd-2", cosechaGalponId: "cg-1", fecha: "2026-07-21", usuarioId: "u-trabajador-1", avesMuertas: 9, tipoAlimento: "Súper Final", sacosConsumidos: 48 },
  { id: "rd-3", cosechaGalponId: "cg-1", fecha: "2026-07-22", usuarioId: "u-trabajador-1", avesMuertas: 15, tipoAlimento: "Súper Final", sacosConsumidos: 47 },
  { id: "rd-4", cosechaGalponId: "cg-2", fecha: "2026-07-20", usuarioId: "u-trabajador-2", avesMuertas: 7, tipoAlimento: "Súper Final", sacosConsumidos: 33 },
  { id: "rd-5", cosechaGalponId: "cg-2", fecha: "2026-07-21", usuarioId: "u-trabajador-2", avesMuertas: 11, tipoAlimento: "Súper Final", sacosConsumidos: 34 },
];

export const MUESTREOS: MuestreoPeso[] = [
  {
    id: "mp-1",
    cosechaGalponId: "cg-1",
    fecha: "2026-07-22",
    usuarioId: "u-supervisor",
    semana: 4,
    bloques: [
      { avesPesadas: 460, pesoTotalLb: 1472 },
      { avesPesadas: 470, pesoTotalLb: 1551 },
      { avesPesadas: 450, pesoTotalLb: 1404 },
    ],
  },
];

export const MOVIMIENTOS_INVENTARIO: MovimientoInventario[] = [
  { id: "mi-1", fecha: "2026-07-15", usuarioId: "u-supervisor", tipoAlimento: "Súper Final", cantidadSacos: 900, direccion: "entrada" },
  { id: "mi-2", fecha: "2026-07-18", usuarioId: "u-supervisor", tipoAlimento: "Súper Final", cantidadSacos: 320, direccion: "salida", galponDestinoId: "galpon-1" },
  { id: "mi-3", fecha: "2026-07-18", usuarioId: "u-supervisor", tipoAlimento: "Súper Final", cantidadSacos: 240, direccion: "salida", galponDestinoId: "galpon-2" },
];

export const TAREAS: Tarea[] = [
  { id: "t-1", descripcion: "Limpieza de bebederos", galponId: "galpon-1", asignadoA: "u-trabajador-1", fechaProgramada: "2026-07-23", estado: "pendiente" },
  { id: "t-2", descripcion: "Revisión de cortinas", galponId: "galpon-1", asignadoA: "u-trabajador-1", fechaProgramada: "2026-07-23", estado: "hecha" },
  { id: "t-3", descripcion: "Limpieza galpón 2", galponId: "galpon-2", asignadoA: "u-trabajador-2", fechaProgramada: "2026-07-24", estado: "pendiente" },
];

export const SOLICITUDES_PERMISO: SolicitudPermiso[] = [
  { id: "sp-1", usuarioId: "u-trabajador-2", fecha: "2026-07-27", motivo: "Cita médica", estado: "pendiente" },
];
