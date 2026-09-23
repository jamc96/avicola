export interface DatoProps {
  etiqueta: string;
  valor: string;
  ideal?: string;
}

/** Muestra un parametro real y, cuando aplica, su valor ideal de la tabla. */
export function Dato({ etiqueta, valor, ideal }: DatoProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ color: "var(--color-texto-suave)", fontSize: 12 }}>{etiqueta}</span>
      <span style={{ fontSize: 20, fontWeight: 600 }}>{valor}</span>
      {ideal ? (
        <span style={{ color: "var(--color-texto-suave)", fontSize: 12 }}>Ideal: {ideal}</span>
      ) : null}
    </div>
  );
}
