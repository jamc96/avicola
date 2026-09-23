/**
 * Valores ideales de la tabla tecnica, precargados para el POC
 * (docs/plan-mvp-inmeca.md, seccion 6: no hay formulario para editarlos en esta etapa).
 */

export interface FilaTablaTecnica {
  semana: number;
  /** Dia de control de la semana. */
  dia: number;
  /** Peso ideal por ave, en libras. */
  pesoIdealLbPorAve: number;
  /** Conversion alimenticia ideal (Lb consumidas / Lb de peso). */
  conversionIdeal: number;
  /**
   * Consumo ideal acumulado por ave, en libras. Se deriva de los otros dos valores,
   * porque conversion = consumo acumulado (Lb/ave) / peso (Lb/ave).
   */
  consumoIdealLbPorAve: number;
  /** Mortalidad ideal acumulada, en porcentaje sobre aves recibidas. */
  mortalidadIdealPct: number;
}

/** Semanas en las que se hace muestreo de peso (dias 14, 21, 28, 35 y 42). */
export const SEMANAS_DE_MUESTREO = [2, 3, 4, 5, 6] as const;

/** Peso estandar de un saco de alimento, en libras (1 QQ = 100 Lb). */
export const LIBRAS_POR_SACO = 100;

/** Porcentaje de aves vivas que se pesa en el muestreo semanal. */
export const PORCENTAJE_MUESTREO = 0.1;

/** Numero de bloques en los que se organiza el muestreo. */
export const BLOQUES_DE_MUESTREO = 3;

/**
 * Peso y conversion ideales por semana, tomados de los datos del prototipo
 * (designs/Inmeca.dc.html).
 *
 * PENDIENTE: la mortalidad ideal acumulada todavia es un marcador de posicion —
 * la tabla tecnica de Inmeca no la documenta en los datos que tenemos.
 */
const IDEALES_POR_SEMANA = [
  { semana: 1, dia: 7, pesoIdealLbPorAve: 0.4, conversionIdeal: 0.95, mortalidadIdealPct: 0.5 },
  { semana: 2, dia: 14, pesoIdealLbPorAve: 1.0, conversionIdeal: 1.3, mortalidadIdealPct: 0.9 },
  { semana: 3, dia: 21, pesoIdealLbPorAve: 2.1, conversionIdeal: 1.33, mortalidadIdealPct: 1.3 },
  { semana: 4, dia: 28, pesoIdealLbPorAve: 3.4, conversionIdeal: 1.44, mortalidadIdealPct: 1.8 },
  { semana: 5, dia: 35, pesoIdealLbPorAve: 4.8, conversionIdeal: 1.6, mortalidadIdealPct: 2.3 },
  { semana: 6, dia: 42, pesoIdealLbPorAve: 6.3, conversionIdeal: 1.79, mortalidadIdealPct: 2.8 },
  { semana: 7, dia: 49, pesoIdealLbPorAve: 7.8, conversionIdeal: 1.88, mortalidadIdealPct: 3.2 },
] as const;

export const TABLA_TECNICA: readonly FilaTablaTecnica[] = IDEALES_POR_SEMANA.map((fila) => ({
  ...fila,
  consumoIdealLbPorAve: Number((fila.pesoIdealLbPorAve * fila.conversionIdeal).toFixed(3)),
}));

export function filaTablaTecnica(semana: number): FilaTablaTecnica | undefined {
  return TABLA_TECNICA.find((fila) => fila.semana === semana);
}

export function esSemanaDeMuestreo(semana: number): boolean {
  return (SEMANAS_DE_MUESTREO as readonly number[]).includes(semana);
}

/**
 * Consumo ideal de la semana en quintales: % ideal de consumo x aves vivas / 100
 * (plan seccion 12.2). Se expresa con el consumo ideal por ave de la tabla.
 */
export function consumoIdealSemanalQQ(semana: number, avesVivasGalpon: number): number {
  const anterior = filaTablaTecnica(semana - 1);
  const actual = filaTablaTecnica(semana);
  if (!actual) return 0;
  const consumoDeLaSemana = actual.consumoIdealLbPorAve - (anterior?.consumoIdealLbPorAve ?? 0);
  return (consumoDeLaSemana * avesVivasGalpon) / 100;
}
