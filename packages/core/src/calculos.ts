/**
 * Formulas del catalogo de parametros (docs/plan-mvp-inmeca.md, seccion 12).
 * Todo lo derivado se calcula aqui: el usuario solo captura el dato que nadie mas puede saber.
 */

import type { BloqueMuestreo, NivelAlerta, RegistroDiario } from "./types.js";
import { LIBRAS_POR_SACO, PORCENTAJE_MUESTREO, filaTablaTecnica } from "./tabla-tecnica.js";

const MS_POR_DIA = 24 * 60 * 60 * 1000;

/** Edad de la cosecha en dias: fecha actual - fecha de ingreso. */
export function edadEnDias(fechaIngreso: string | Date, hoy: string | Date = new Date()): number {
  const inicio = new Date(fechaIngreso).getTime();
  const fin = new Date(hoy).getTime();
  return Math.max(0, Math.floor((fin - inicio) / MS_POR_DIA));
}

/** Semana de la cosecha (1-based) derivada de la fecha de ingreso. */
export function semanaDeCosecha(fechaIngreso: string | Date, hoy: string | Date = new Date()): number {
  return Math.floor(edadEnDias(fechaIngreso, hoy) / 7) + 1;
}

/** Aves vivas del galpon = aves iniciales - mortalidad acumulada - transferencias salientes. */
export function avesVivas(
  avesIniciales: number,
  mortalidadAcumulada: number,
  avesTransferidasFuera = 0,
): number {
  return Math.max(0, avesIniciales - mortalidadAcumulada - avesTransferidasFuera);
}

/** % de mortalidad acumulada sobre las aves recibidas. */
export function porcentajeMortalidad(mortalidadAcumulada: number, avesRecibidas: number): number {
  if (avesRecibidas <= 0) return 0;
  return (mortalidadAcumulada / avesRecibidas) * 100;
}

export function sacosAQuintales(sacos: number): number {
  return (sacos * LIBRAS_POR_SACO) / 100;
}

export function quintalesASacos(quintales: number): number {
  return (quintales * 100) / LIBRAS_POR_SACO;
}

/** Consumo real por ave (Lb/ave) = consumo semanal (QQ) x 100 / aves vivas. */
export function consumoPorAveLb(consumoQQ: number, aves: number): number {
  if (aves <= 0) return 0;
  return (consumoQQ * 100) / aves;
}

/** Peso promedio del galpon: suma de pesos de los bloques / suma de aves pesadas. */
export function pesoPromedioLb(bloques: readonly BloqueMuestreo[]): number {
  const aves = bloques.reduce((total, bloque) => total + bloque.avesPesadas, 0);
  if (aves <= 0) return 0;
  const peso = bloques.reduce((total, bloque) => total + bloque.pesoTotalLb, 0);
  return peso / aves;
}

/** Aves a pesar en el muestreo semanal: 10% de las aves vivas del galpon. */
export function avesAMuestrear(avesVivasGalpon: number): number {
  return Math.round(avesVivasGalpon * PORCENTAJE_MUESTREO);
}

/** Conversion alimenticia = consumo acumulado (Lb/ave) / peso promedio (Lb/ave). */
export function conversionAlimenticia(consumoAcumuladoLbPorAve: number, pesoPromedio: number): number {
  if (pesoPromedio <= 0) return 0;
  return consumoAcumuladoLbPorAve / pesoPromedio;
}

/** Ganancia diaria de peso = peso promedio final / dias de la cosecha. */
export function gananciaDiariaDePeso(pesoPromedioFinalLb: number, diasDeCosecha: number): number {
  if (diasDeCosecha <= 0) return 0;
  return pesoPromedioFinalLb / diasDeCosecha;
}

export interface ResumenSemanal {
  mortalidad: number;
  sacosConsumidos: number;
  consumoQQ: number;
}

/** Acumula los registros diarios de un galpon en totales de la semana. */
export function resumirRegistros(registros: readonly RegistroDiario[]): ResumenSemanal {
  const mortalidad = registros.reduce((total, registro) => total + registro.avesMuertas, 0);
  const sacosConsumidos = registros.reduce((total, registro) => total + registro.sacosConsumidos, 0);
  return { mortalidad, sacosConsumidos, consumoQQ: sacosAQuintales(sacosConsumidos) };
}

/** Saldo de inventario = entradas - salidas. */
export function saldoInventario(entradasSacos: number, salidasSacos: number): number {
  return entradasSacos - salidasSacos;
}

export interface ComparativoSemana {
  semana: number;
  consumoRealLbPorAve: number;
  consumoIdealLbPorAve: number;
  pesoRealLb: number;
  pesoIdealLb: number;
  conversionReal: number;
  conversionIdeal: number;
  mortalidadRealPct: number;
  mortalidadIdealPct: number;
  semaforo: NivelAlerta;
}

/** Tolerancia relativa antes de marcar una desviacion (10%). */
const TOLERANCIA = 0.1;

/**
 * Semaforo de estado del galpon: verde dentro de rango, rojo si se desvia.
 * Compara los parametros reales de la semana contra los ideales de la tabla.
 */
export function semaforoDeDesviacion(real: number, ideal: number, tolerancia = TOLERANCIA): NivelAlerta {
  if (ideal <= 0) return "ok";
  const desviacion = Math.abs(real - ideal) / ideal;
  if (desviacion <= tolerancia) return "ok";
  if (desviacion <= tolerancia * 2) return "atencion";
  return "critico";
}

const PESO_NIVEL: Record<NivelAlerta, number> = { ok: 0, atencion: 1, critico: 2 };

export function nivelMasGrave(niveles: readonly NivelAlerta[]): NivelAlerta {
  return niveles.reduce<NivelAlerta>(
    (peor, nivel) => (PESO_NIVEL[nivel] > PESO_NIVEL[peor] ? nivel : peor),
    "ok",
  );
}

export interface EntradaComparativo {
  semana: number;
  consumoAcumuladoLbPorAve: number;
  pesoPromedioLb: number;
  mortalidadAcumulada: number;
  avesRecibidas: number;
}

/** Junta consumo, peso, conversion y mortalidad reales vs. ideales para una semana. */
export function compararContraTabla(entrada: EntradaComparativo): ComparativoSemana | undefined {
  const ideal = filaTablaTecnica(entrada.semana);
  if (!ideal) return undefined;

  const conversionReal = conversionAlimenticia(entrada.consumoAcumuladoLbPorAve, entrada.pesoPromedioLb);
  const mortalidadRealPct = porcentajeMortalidad(entrada.mortalidadAcumulada, entrada.avesRecibidas);

  const semaforo = nivelMasGrave([
    semaforoDeDesviacion(entrada.consumoAcumuladoLbPorAve, ideal.consumoIdealLbPorAve),
    semaforoDeDesviacion(entrada.pesoPromedioLb, ideal.pesoIdealLbPorAve),
    semaforoDeDesviacion(mortalidadRealPct, ideal.mortalidadIdealPct),
  ]);

  return {
    semana: entrada.semana,
    consumoRealLbPorAve: entrada.consumoAcumuladoLbPorAve,
    consumoIdealLbPorAve: ideal.consumoIdealLbPorAve,
    pesoRealLb: entrada.pesoPromedioLb,
    pesoIdealLb: ideal.pesoIdealLbPorAve,
    conversionReal,
    conversionIdeal: ideal.conversionIdeal,
    mortalidadRealPct,
    mortalidadIdealPct: ideal.mortalidadIdealPct,
    semaforo,
  };
}
