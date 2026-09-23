import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Inmeca — Registro de producción",
  description: "Registro y control de cosechas de engorde avícola",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="contenedor">{children}</div>
      </body>
    </html>
  );
}
