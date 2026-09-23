import {
  COSECHA,
  COSECHA_GALPONES,
  GALPONES,
  MUESTREOS,
  REGISTROS_DIARIOS,
  avesVivas,
  compararContraTabla,
  consumoPorAveLb,
  edadEnDias,
  pesoPromedioLb,
  porcentajeMortalidad,
  resumirRegistros,
  semanaDeCosecha,
} from "@avicola/core";
import { Dato } from "@avicola/ui/dato";
import { Semaforo } from "@avicola/ui/semaforo";
import { Tarjeta } from "@avicola/ui/tarjeta";

/**
 * Pantalla de entrada del Dueno: resumen del estado de todos los galpones activos
 * (plan seccion 11). Un insight inmediato, no un menu que haya que interpretar.
 */
export default function Page() {
  const hoy = "2026-07-22";
  const semana = semanaDeCosecha(COSECHA.fechaIngreso, hoy);
  const dias = edadEnDias(COSECHA.fechaIngreso, hoy);

  const galpones = COSECHA_GALPONES.map((tramo) => {
    const galpon = GALPONES.find((g) => g.id === tramo.galponId);
    const registros = REGISTROS_DIARIOS.filter((r) => r.cosechaGalponId === tramo.id);
    const { mortalidad, consumoQQ } = resumirRegistros(registros);
    const vivas = avesVivas(tramo.avesIniciales, mortalidad);
    const muestreo = MUESTREOS.find((m) => m.cosechaGalponId === tramo.id);
    const peso = muestreo ? pesoPromedioLb(muestreo.bloques) : 0;

    const comparativo = compararContraTabla({
      semana,
      consumoAcumuladoLbPorAve: consumoPorAveLb(consumoQQ, vivas),
      pesoPromedioLb: peso,
      mortalidadAcumulada: mortalidad,
      avesRecibidas: tramo.avesIniciales,
    });

    return {
      id: tramo.id,
      nombre: galpon?.nombre ?? tramo.galponId,
      vivas,
      mortalidadPct: porcentajeMortalidad(mortalidad, tramo.avesIniciales),
      peso,
      comparativo,
    };
  });

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
      <header>
        <p style={{ color: "var(--color-texto-suave)", fontSize: 13, margin: 0 }}>Granja Inmeca</p>
        <h1 style={{ fontSize: 22, margin: "2px 0 0" }}>{COSECHA.nombre}</h1>
        <p style={{ color: "var(--color-texto-suave)", fontSize: 13, margin: "4px 0 0" }}>
          Semana {semana} · {dias} días · {COSECHA.avesRecibidasTotal.toLocaleString("es-HN")} aves
          recibidas
        </p>
      </header>

      {galpones.map((galpon) => (
        <Tarjeta
          key={galpon.id}
          titulo={galpon.nombre}
          subtitulo={`${galpon.vivas.toLocaleString("es-HN")} aves vivas`}
        >
          <div style={{ marginBottom: 12 }}>
            <Semaforo nivel={galpon.comparativo?.semaforo ?? "ok"} />
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <Dato
              etiqueta="Mortalidad acumulada"
              valor={`${galpon.mortalidadPct.toFixed(2)} %`}
              ideal={
                galpon.comparativo ? `${galpon.comparativo.mortalidadIdealPct.toFixed(2)} %` : undefined
              }
            />
            <Dato
              etiqueta="Peso promedio"
              valor={`${galpon.peso.toFixed(2)} Lb`}
              ideal={galpon.comparativo ? `${galpon.comparativo.pesoIdealLb.toFixed(2)} Lb` : undefined}
            />
            <Dato
              etiqueta="Consumo por ave"
              valor={`${(galpon.comparativo?.consumoRealLbPorAve ?? 0).toFixed(2)} Lb`}
              ideal={
                galpon.comparativo
                  ? `${galpon.comparativo.consumoIdealLbPorAve.toFixed(2)} Lb`
                  : undefined
              }
            />
            <Dato
              etiqueta="Conversión alimenticia"
              valor={(galpon.comparativo?.conversionReal ?? 0).toFixed(2)}
              ideal={galpon.comparativo ? galpon.comparativo.conversionIdeal.toFixed(2) : undefined}
            />
          </div>
        </Tarjeta>
      ))}
    </main>
  );
}
