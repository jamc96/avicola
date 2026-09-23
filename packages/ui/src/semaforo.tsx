export type NivelSemaforo = "ok" | "atencion" | "critico";

const ETIQUETAS: Record<NivelSemaforo, string> = {
  ok: "En rango",
  atencion: "Atención",
  critico: "Fuera de rango",
};

const COLORES: Record<NivelSemaforo, string> = {
  ok: "var(--color-ok)",
  atencion: "var(--color-atencion)",
  critico: "var(--color-critico)",
};

export interface SemaforoProps {
  nivel: NivelSemaforo;
}

/** Indicador de estado del galpon contra los valores ideales de la tabla. */
export function Semaforo({ nivel }: SemaforoProps) {
  return (
    <span
      style={{
        alignItems: "center",
        color: COLORES[nivel],
        display: "inline-flex",
        fontSize: 13,
        fontWeight: 600,
        gap: 6,
      }}
    >
      <span
        aria-hidden
        style={{
          background: COLORES[nivel],
          borderRadius: "50%",
          display: "inline-block",
          height: 8,
          width: 8,
        }}
      />
      {ETIQUETAS[nivel]}
    </span>
  );
}
