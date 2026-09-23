/**
 * Valores ideales de la tabla tecnica, precargados para el POC
 * (docs/plan-mvp-inmeca.md, seccion 6: no hay formulario para editarlos en esta etapa).
 */

export interface FilaTablaTecnica {
  semana: number;
  /** Dia de control de la semana. */
  dia: number;
  /** Consumo ideal acumulado por ave, en libras. */
  consumoIdealLbPorAve: number;
  /** Peso ideal por ave, en libras. */
  pesoIdealLbPorAve: number;
  /** Conversion alimenticia ideal (Lb consumidas / Lb de peso). */
  conversionIdeal: number;
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
 * PENDIENTE: estos valores son marcadores de posicion con la forma correcta.
 * Hay que reemplazarlos por la tabla tecnica real que usa Inmeca
 * (docs/03-datos-de-ejemplo.xlsx) antes de mostrar el POC al dueno.
 */
export const TABLA_TECNICA: readonly FilaTablaTecnica[] = [
  { semana: 1, dia: 7, consumoIdealLbPorAve: 0.36, pesoIdealLbPorAve: 0.42, conversionIdeal: 0.86, mortalidadIdealPct: 0.5 },
  { semana: 2, dia: 14, consumoIdealLbPorAve: 1.2, pesoIdealLbPorAve: 1.05, conversionIdeal: 1.14, mortalidadIdealPct: 0.9 },
  { semana: 3, dia: 21, consumoIdealLbPorAve: 2.6, pesoIdealLbPorAve: 2.0, conversionIdeal: 1.3, mortalidadIdealPct: 1.3 },
  { semana: 4, dia: 28, consumoIdealLbPorAve: 4.6, pesoIdealLbPorAve: 3.2, conversionIdeal: 1.44, mortalidadIdealPct: 1.8 },
  { semana: 5, dia: 35, consumoIdealLbPorAve: 7.1, pesoIdealLbPorAve: 4.5, conversionIdeal: 1.58, mortalidadIdealPct: 2.3 },
  { semana: 6, dia: 42, consumoIdealLbPorAve: 9.9, pesoIdealLbPorAve: 5.8, conversionIdeal: 1.71, mortalidadIdealPct: 2.8 },
  { semana: 7, dia: 49, consumoIdealLbPorAve: 13.0, pesoIdealLbPorAve: 7.1, conversionIdeal: 1.83, mortalidadIdealPct: 3.2 },
];

export function filaTablaTecnica(semana: number): FilaTablaTecnica | undefined {
  return TABLA_TECNICA.find((fila) => fila.semana === semana);
}

export function esSemanaDeMuestreo(semana: number): boolean {
  return (SEMANAS_DE_MUESTREO as readonly number[]).includes(semana);
}
