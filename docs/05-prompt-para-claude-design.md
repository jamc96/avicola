# Prompt listo para pegar

Copia el texto de abajo y pégalo junto con estos 5 archivos adjuntos:
`01-flujo-y-pantallas.md`, `02-modelo-de-datos.md`, `03-datos-de-ejemplo.xlsx`, `04-guia-visual.md`, `diagrama-flujo-registros.svg`.

---

Quiero que construyas un prototipo visual, navegable y de alta fidelidad para una app móvil de registro de producción avícola llamada Inmeca. Te adjunto 5 archivos que son el insumo completo — úsalos todos antes de diseñar nada:

1. **`01-flujo-y-pantallas.md`** — la especificación completa del flujo: login, las pantallas de los 4 roles (Trabajador, Supervisor, Dueño, Admin), todos los formularios de captura, modales, estados vacíos/error/éxito, y el mapa de navegación de cada rol. Este archivo es la fuente de verdad de qué pantallas existen y qué hace cada una — constrúyelas todas, no solo un resumen.
2. **`02-modelo-de-datos.md`** — las entidades y campos que respaldan cada pantalla (qué se captura, qué se calcula solo, qué es automático).
3. **`03-datos-de-ejemplo.xlsx`** — datos reales de las cosechas de 2026 de la granja: enero y marzo (cerradas) y mayo (activa, en proceso de entrega) — cosechas, galpones, mortalidad diaria, entregas, compras, usuarios. Úsalos como contenido real en las pantallas — nada de lorem ipsum ni "Galpón A / Usuario 1": usa los nombres, cifras y fechas reales de este archivo para que el prototipo se sienta como la app real funcionando.
4. **`04-guia-visual.md`** — paleta de color, tipografía, componentes y tono de contenido a seguir.
5. **`diagrama-flujo-registros.svg`** — diagrama de referencia del flujo operativo completo, para entender cómo se conectan los pasos.

### Lo que necesito que construyas

Un prototipo **completo**, no solo pantallas sueltas: incluye el login, la navegación entre pantallas, todos los formularios de registro de información (mortalidad, consumo, muestreo de peso, transferencias, inventario, entregas, apertura de cosecha, tareas de mantenimiento, solicitudes y aprobación de permisos, alta de usuarios), y los estados de éxito/error/vacío descritos en el documento de flujo. Debe poder navegarse de principio a fin como si fuera la app real, para las cuatro cuentas de rol distintas.

### Restricciones de diseño (no negociables)

- **Mobile-first**: se ve y se usa como una app de celular, no como un sitio web adaptado.
- **Cero tablas de datos crudas.** Todo en tarjetas, barras de progreso, chips, líneas de tiempo, mapas de calor y gráficas — como se describe en la guía visual.
- **Semáforo de estado consistente** (verde/ámbar/rojo) en galpones, alertas y comparativos.
- **Formularios mínimos**: el usuario nunca ve un campo para un dato que la app ya sabe (fecha, hora, usuario, galpón activo). Eso se muestra como información automática, no como campo editable.
- **La transferencia de aves entre galpones es una acción opcional**, no un paso obligatorio del flujo — represéntala como tal (accesible, pero no forzada).
- **Visibilidad escalonada por rol, definida desde el primer segundo tras el login — esto es crítico, no lo mezcles:**
  - **Trabajador**: cae directo en la pantalla de **registrar producción** al entrar — es su responsabilidad principal, no un paso detrás de un menú. Fuera de eso, solo ve sus tareas de mantenimiento, sus propios registros y sus permisos. Nada de comparativos, semáforos ni reportes.
  - **Supervisor**: cae en la vista operativa de sus galpones, con visibilidad clara de los registros de cada trabajador. Dirige la operación física completa: asigna y calendariza tareas, gestiona inventario/bodega/transferencias/pesajes. No ve historial de cosechas cerradas ni aprueba permisos.
  - **Dueño**: cae en un resumen ejecutivo con insight inmediato del estado de la granja — no un menú que tenga que interpretar. Puede ejecutar cualquier acción de Trabajador o Supervisor, pero su rol es de control y decisión: historial, costos, calendario y aprobación de permisos son exclusivos suyos.
  - Revisa la tabla "Reglas de visibilidad por rol" en `02-modelo-de-datos.md` antes de diseñar cada pantalla.
- **Tono profesional de sistema productivo, no de app casera.** Esta aplicación gestiona cosechas de alto valor (millones de lempiras) — el diseño debe transmitir seriedad y confianza, como un sistema de gestión empresarial. Nombres de pantalla funcionales y directos (nunca genéricos o cursis — evita cosas como "Mi Galpón"), iconografía simple y con propósito (no ilustraciones "tiernas" de granja), tipografía y cifras con buena jerarquía. Interfaces simples no significa infantiles.
- **Interfaces simples**: quienes usan Trabajador y Supervisor no son personas técnicas — prioriza claridad y botones grandes sobre densidad de información. El Dueño necesita poder detectar errores o tomar decisiones de un vistazo, sin ruido visual.

### Resultado esperado

Un prototipo clickeable que muestre las cuatro experiencias de rol completas, con datos reales de ejemplo, siguiendo la guía visual adjunta, listo para presentárselo al dueño de la granja como demostración del producto.
