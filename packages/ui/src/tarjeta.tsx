import type { ReactNode } from "react";

export interface TarjetaProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}

/** Contenedor basico de las pantallas mobile-first. */
export function Tarjeta({ titulo, subtitulo, children }: TarjetaProps) {
  return (
    <section
      style={{
        background: "var(--color-superficie)",
        border: "1px solid var(--color-borde)",
        borderRadius: "var(--radio)",
        boxShadow: "var(--sombra)",
        padding: "var(--espacio)",
      }}
    >
      <header style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, margin: 0 }}>{titulo}</h2>
        {subtitulo ? (
          <p style={{ color: "var(--color-texto-suave)", fontSize: 13, margin: "4px 0 0" }}>
            {subtitulo}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
