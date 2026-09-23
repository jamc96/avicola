# Inmeca — Guía visual para el prototipo

Esta guía es un punto de partida, no una camisa de fuerza: el objetivo es que el diseño resultante sea **simple, mobile-first, y fácil de escanear de un vistazo** para gente que no es técnica, y al mismo tiempo se vea como un sistema profesional serio. El diseñador/herramienta puede proponer una dirección visual propia siempre que respete estos principios.

La paleta y las decisiones de esta guía están basadas en investigación de tendencias de UI/UX 2026 para dashboards SaaS y apps de agrotecnología/campo (ver fuentes al final), no solo en preferencia estética.

## Principios de diseño (no negociables)

1. **Mobile-first de verdad**: se diseña primero para una pantalla de ~375-430px de ancho, con elementos grandes y tocables (mínimo 44×44px, idealmente 48×48px para quien usa la app con las manos ocupadas o en movimiento).
2. **Cero tablas de datos crudas.** Nada de filas y columnas tipo hoja de cálculo. En su lugar: tarjetas, barras de progreso, chips, líneas de tiempo, mapas de calor y gráficas simples.
3. **Semáforo de estado en todo lo que se pueda evaluar** (galpón, alerta, comparativo real vs. ideal): verde = bien, ámbar = atención, rojo = crítico. Consistente en toda la app — pero **nunca depende solo del color**: cada estado también se comunica con un ícono o una palabra, porque una parte de los usuarios puede tener dificultad para distinguir rojo/verde, y el celular se va a usar muchas veces bajo sol directo, donde el color se aprecia peor que la forma.
4. **Cero ruido**: si un dato no aporta a la decisión que la persona tiene que tomar en esa pantalla, no va en esa pantalla. Nada de mostrar "0" o campos vacíos sin explicación — mejor un estado vacío con una frase.
5. **Formularios cortos.** El usuario nunca ve un campo para algo que la app ya sabe (fecha, hora, quién es, en qué galpón está). Ver `01-flujo-y-pantallas.md`, sección 0.
6. **Jerarquía de acción por rol, visible desde el primer segundo tras el login**: Trabajador entra directo a registrar (su responsabilidad principal); Supervisor entra a la vista operativa de sus galpones y equipo; Dueño entra a un resumen ejecutivo con insight inmediato del estado de la granja. Cada uno cae en la pantalla que corresponde a su trabajo, no en un menú neutro.
7. **Tono profesional de sistema productivo — no de app casera.** Esta aplicación gestiona cosechas que representan montos altos de inversión (millones de lempiras por cosecha); el diseño tiene que transmitir seriedad y confianza, como un sistema de gestión empresarial, aunque sea un POC. Concretamente:
   - Nombres de pantalla funcionales y directos, nunca genéricos o cursis (ej. **"Registrar producción"**, no "Mi Galpón"; **"Resumen de la granja"**, no "Mi Panel").
   - Tipografía y cifras cuidadas, con buen contraste y jerarquía — que las cifras clave (aves vivas, mortalidad, costos) se lean como datos de un sistema financiero serio, no como una app de entretenimiento.
   - Uso de color e iconografía con propósito, no decorativo. Evitar íconos infantiles o ilustraciones "tiernas" de pollos/granjas — mejor iconografía simple, sólida y literal (que se entienda de un vistazo, no que sea "linda").
   - El Admin, al ser técnico, puede sentirse aún más neutro/sobrio que el resto (ver nota de tema oscuro más abajo) — pero ningún rol debe sentirse informal.
8. **Legibilidad de campo.** Trabajador y Supervisor van a usar la app muchas veces bajo sol directo, con las manos sucias o con guantes, y en movimiento. Eso implica: contraste alto (ideal 7:1, mínimo WCAG AA de 4.5:1 para texto normal y 3:1 para texto grande), nunca fondos blancos puros (usar un blanco cálido/tenue), tipografía con peso medio-alto en vez de líneas finas, e íconos de relleno sólido en vez de solo contorno.
9. **Distinción clara entre roles**: Trabajador/Supervisor (captura y operación, tono directo y funcional) vs. Dueño (lectura y decisión, tono ejecutivo) vs. Admin (técnico, visualmente más neutro/distinto para que se sienta "fuera" del producto de negocio).

## Paleta de color

Se descarta el azul corporativo genérico (`#2563EB`/`#3B82F6`) — es el color que usa la enorme mayoría de apps SaaS/dashboard hoy en día, y no aporta identidad ni se distingue en el rubro agropecuario. En su lugar, se usa un **verde-teal profundo** como color primario: comunica crecimiento y confianza (asociación natural con agricultura y con "salud financiera", el mismo principio que usan las apps fintech), y es lo bastante distinto del verde de "estado bien" del semáforo para que no se confundan. Los neutros se basan en la familia **slate/zinc** (grises con matiz frío), el estándar 2026 para herramientas de datos y producción, en vez de un gris plano.

| Uso | Color | Hex |
|---|---|---|
| Primario (marca, navegación, botones principales) | Verde-teal profundo | `#0F766E` |
| Primario oscuro (encabezados, texto sobre fondo claro) | Teal casi negro | `#134E4A` |
| Fondo de acento primario | Teal muy claro | `#CCFBF1` |
| Éxito / estado "bien" (verde, distinto del primario) | Verde | `#16A34A` |
| Fondo de acento verde | Verde muy claro | `#E7F7ED` |
| Atención (ámbar) | Ámbar | `#D97706` |
| Fondo de acento ámbar | Ámbar muy claro | `#FEF3C7` |
| Crítico (rojo) | Rojo | `#DC2626` |
| Fondo de acento rojo | Rojo muy claro | `#FEE2E2` |
| Acento secundario (traslados/movimientos especiales, opcional) | Morado | `#7C3AED` |
| Texto principal | Casi negro (slate) | `#18181B` |
| Texto secundario | Gris slate | `#52525B` |
| Texto terciario / placeholder | Gris slate claro | `#A1A1AA` |
| Líneas y bordes | Gris muy claro | `#E4E4E7` |
| Fondo general de la app | Blanco cálido/tenue, nunca `#FFFFFF` puro | `#FAFAF9` |

El semáforo (verde/ámbar/rojo) se usa de forma consistente para: borde de tarjetas de galpón, barras de progreso real-vs-ideal, tarjetas de alerta, y puntos de estado (dots) — siempre acompañado de texto o ícono, nunca solo color (ver principio 3 y 8).

### Nota sobre el rol Admin (tema oscuro opcional)

Para reforzar que el Admin es una pantalla técnica separada del producto de negocio, se puede usar un **tema oscuro** (fondo `#09090B`, tarjetas `#18181B`, texto `#FAFAFA`) solo para ese rol — es el patrón que usan hoy la mayoría de herramientas técnicas/de desarrollador, y ayuda a que el usuario sepa de inmediato que salió del "modo granja" y entró al "modo sistema". Es opcional: si se prefiere mantener un solo tema en todo el prototipo, no pasa nada, pero si se implementa, es la única pantalla donde tendría sentido.

## Tipografía

- Fuente del sistema (San Francisco / Roboto / Segoe UI según plataforma) o una geométrica sans-serif similar (ej. Inter) — evitar tipografías delgadas o decorativas: para legibilidad de campo, un peso medio (regular/medium) como mínimo, nunca "light".
- Escala sugerida: título de pantalla 17-20px / semibold, subtítulos de sección 12-13px mayúsculas espaciadas / bold, cuerpo 13-15px / regular-medium, cifras destacadas (KPIs) 22-28px / extrabold, texto auxiliar 11-12px / regular.
- Los números importantes (aves vivas, %, kg, costos) siempre más grandes y con más peso que su etiqueta — deben leerse como cifras de un sistema financiero, con precisión.

## Componentes clave

- **Tarjeta de galpón**: borde izquierdo de color (semáforo) + ícono/etiqueta de texto del mismo estado, nombre del galpón, cifra de aves vivas, y 1-2 barras de progreso (consumo/peso real vs. ideal, con el % a la derecha).
- **Tarjeta de estadística (KPI)**: número grande arriba, etiqueta pequeña abajo, en una grilla de 2 columnas.
- **Chip selector**: fila horizontal de píldoras para elegir galpón; la activa en el color primario sólido, el resto en blanco cálido con borde gris.
- **Barra de progreso real vs. ideal**: etiqueta corta a la izquierda, barra al centro (color según el %), porcentaje a la derecha. 100% = igual a la tabla ideal; por debajo de cierto umbral cambia a ámbar/rojo.
- **Mapa de calor de mortalidad**: cuadrícula de 7 columnas (L-D) × N filas (semanas), celdas redondeadas, color de fondo según intensidad (más muertes = rojo más intenso, cero = gris muy claro), con el número siempre visible dentro de la celda (no solo el color).
- **Línea de tiempo (timeline)**: punto de color + tarjeta con fecha, título y detalle — usado para entregas, transferencias y movimientos de inventario.
- **Tarjeta de alerta**: fondo de color suave (rojo o ámbar), ícono, título corto, detalle en una línea.
- **Stepper numérico**: botones grandes +/− a los lados de un número central, para capturas rápidas como mortalidad diaria (evita errores de tecleo en campo, con guantes o con las manos sucias).
- **Barra de navegación inferior**: 2 a 5 ítems según el rol, ícono de relleno sólido + etiqueta corta, ítem activo en el color primario.
- **Confirmación flotante (toast)**: aparece abajo, texto corto con lo que se guardó y la hora, desaparece sola.

## Tono de contenido (microcopy)

- Directo y en español neutro/centroamericano, sin tecnicismos innecesarios.
- Confirmaciones siempre con el dato concreto: "Guardado: 3 aves muertas, 5 sacos de Súper Inicio — hoy 9:40 a.m." en vez de solo "Guardado".
- Estados vacíos con explicación, nunca una pantalla en blanco: "Esta cosecha no ha tenido traslados", "Sin desviaciones importantes hoy".
- Nada de jerga técnica de sistemas (IDs, "null", "error 500") visible al usuario final.

## Layout general

- Contenedor tipo "marco de celular" centrado en pantallas grandes (max-width ~420-430px), con la barra de navegación fija abajo.
- Encabezado superior fijo con: título de la pantalla, subtítulo de contexto (usuario, fecha, o galpón activo), y una etiqueta de rol en la esquina.
- Contenido con scroll vertical, tarjetas apiladas con espaciado generoso (12-16px entre tarjetas).
- Botones primarios de ancho completo, esquinas redondeadas (12-16px), altura cómoda para el dedo (48-52px), ubicados preferentemente en el tercio inferior de la pantalla para uso con una sola mano.

## Fuentes de la investigación

Esta guía se apoya en las siguientes referencias sobre tendencias de color y patrones de diseño 2026:

- [The Modern Color Palette: UI/UX Color Trends That Define 2026 — Recursion Agency](https://www.recursion.agency/blog/ui-color-trends-2026) — abandono del azul corporativo genérico, neutros zinc/slate, estándares de contraste WCAG y accesibilidad para daltonismo.
- [A UI/UX Guide to Agriculture App Design — Gapsy Studio](https://gapsystudio.com/blog/agriculture-app-design/) — legibilidad bajo sol directo, paletas desaturadas y de bajo brillo, iconografía literal y de relleno sólido, ergonomía de una sola mano, diseño offline-first para conectividad rural.
- [UI Color Trends to Watch in 2026 — Updivision](https://updivision.com/blog/post/ui-color-trends-to-watch-in-2026) — uso funcional (no decorativo) del color y neutros elevados.
