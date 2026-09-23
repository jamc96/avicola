import assert from "node:assert/strict";
import { test } from "node:test";

import {
  avesAMuestrear,
  avesVivas,
  compararContraTabla,
  consumoPorAveLb,
  conversionAlimenticia,
  edadEnDias,
  pesoPromedioLb,
  porcentajeMortalidad,
  resumirRegistros,
  sacosAQuintales,
  semanaDeCosecha,
  semaforoDeDesviacion,
} from "./calculos.js";
import type { RegistroDiario } from "./types.js";

test("aves vivas descuenta mortalidad y transferencias salientes", () => {
  assert.equal(avesVivas(14000, 350, 1000), 12650);
  assert.equal(avesVivas(100, 500), 0);
});

test("porcentaje de mortalidad sobre aves recibidas", () => {
  assert.equal(porcentajeMortalidad(240, 24000), 1);
  assert.equal(porcentajeMortalidad(10, 0), 0);
});

test("edad y semana se derivan de la fecha de ingreso", () => {
  assert.equal(edadEnDias("2026-07-01", "2026-07-22"), 21);
  assert.equal(semanaDeCosecha("2026-07-01", "2026-07-22"), 4);
});

test("conversion de sacos a quintales y consumo por ave", () => {
  assert.equal(sacosAQuintales(46), 46);
  assert.equal(consumoPorAveLb(140, 14000), 1);
  assert.equal(consumoPorAveLb(140, 0), 0);
});

test("peso promedio pondera por aves pesadas de cada bloque", () => {
  const promedio = pesoPromedioLb([
    { avesPesadas: 100, pesoTotalLb: 320 },
    { avesPesadas: 100, pesoTotalLb: 340 },
    { avesPesadas: 200, pesoTotalLb: 640 },
  ]);
  assert.equal(promedio, 3.25);
});

test("el muestreo cubre el 10% de las aves vivas", () => {
  assert.equal(avesAMuestrear(13650), 1365);
});

test("conversion alimenticia es consumo acumulado sobre peso", () => {
  assert.equal(conversionAlimenticia(4.6, 3.2).toFixed(3), "1.437");
  assert.equal(conversionAlimenticia(4.6, 0), 0);
});

test("resumir registros acumula mortalidad y consumo", () => {
  const registros: RegistroDiario[] = [
    { id: "a", cosechaGalponId: "cg-1", fecha: "2026-07-20", usuarioId: "u", avesMuertas: 12, tipoAlimento: "Súper Final", sacosConsumidos: 46 },
    { id: "b", cosechaGalponId: "cg-1", fecha: "2026-07-21", usuarioId: "u", avesMuertas: 9, tipoAlimento: "Súper Final", sacosConsumidos: 48 },
  ];
  assert.deepEqual(resumirRegistros(registros), { mortalidad: 21, sacosConsumidos: 94, consumoQQ: 94 });
});

test("el semaforo marca desviaciones sobre la tolerancia", () => {
  assert.equal(semaforoDeDesviacion(100, 100), "ok");
  assert.equal(semaforoDeDesviacion(115, 100), "atencion");
  assert.equal(semaforoDeDesviacion(150, 100), "critico");
});

test("el comparativo devuelve reales e ideales de la semana", () => {
  const comparativo = compararContraTabla({
    semana: 4,
    consumoAcumuladoLbPorAve: 4.6,
    pesoPromedioLb: 3.2,
    mortalidadAcumulada: 430,
    avesRecibidas: 24000,
  });
  assert.ok(comparativo);
  assert.equal(comparativo.pesoIdealLb, 3.2);
  assert.equal(comparativo.semaforo, "ok");
});

test("una semana fuera de la tabla no tiene comparativo", () => {
  assert.equal(
    compararContraTabla({
      semana: 12,
      consumoAcumuladoLbPorAve: 1,
      pesoPromedioLb: 1,
      mortalidadAcumulada: 1,
      avesRecibidas: 1,
    }),
    undefined,
  );
});
