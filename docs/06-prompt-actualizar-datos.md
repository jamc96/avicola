# Prompt de actualización — solo datos

Copia el texto de abajo y pégalo junto con **un solo archivo adjunto**:
`03-datos-de-ejemplo.xlsx` (versión actualizada, con las cosechas reales de 2026).

No hace falta reenviar `01-flujo-y-pantallas.md`, `02-modelo-de-datos.md`, `04-guia-visual.md` ni el diagrama — el flujo, las pantallas, el modelo de datos y la guía visual no cambiaron de forma estructural, solo el contenido de datos.

---

Ya construiste el prototipo de Inmeca con la especificación de flujo, modelo de datos y guía visual que te compartí antes. Encontré un error en los datos de ejemplo que te di: no correspondían exactamente a las cosechas reales de este año. Te adjunto la versión corregida de `03-datos-de-ejemplo.xlsx`.

**Lo único que necesito es que actualices el contenido de datos que se muestra en el prototipo para que coincida exactamente con este archivo — no cambies pantallas, flujo, componentes ni colores.**

El archivo adjunto tiene las 3 cosechas reales de 2026, tal como están en el sistema de registro de la granja:

- **Cosecha enero 2026** (cerrada, 9 de enero a 17 de febrero) — con el nombre del trabajador responsable en cada una de las 11 entregas reales.
- **Cosecha marzo 2026** (cerrada, 18 de marzo a 23 de abril).
- **Cosecha mayo 2026** (**activa** — sigue en proceso de entrega al momento de estos datos: solo 5 de las entregas están registradas y quedan 9,084 aves todavía en la granja, pendientes de entregar). Esta debe mostrarse como la cosecha activa actual en el Resumen del Dueño y en las pantallas del Trabajador/Supervisor — no como cerrada.

Por favor:

1. Reemplaza en todas las pantallas cualquier dato de ejemplo anterior (nombres de galpón, cifras de mortalidad/consumo/peso, entregas, compras, usuarios) por los datos reales de este archivo — hoja por hoja: `Cosechas`, `Galpones por cosecha`, `Registro semanal`, `Mortalidad diaria`, `Transferencias de aves`, `Entregas a planta`, `Compras e inventario`, `Usuarios`, `Tabla ideal`, `Tareas`, `Permisos`.
2. Usa los nombres reales de los trabajadores como usuarios de ejemplo en las cuatro cuentas de rol (Wilmer Pineda, Donaldo Hernández, Javier Gonzales, Marlon Domínguez, Nelson Tabora, Jose Quintanilla — ver la hoja `Usuarios`).
3. La cosecha de mayo debe reflejarse como la cosecha **activa** en curso (la que ve el Trabajador y el Supervisor al entrar, y la que resume el Dueño en su pantalla principal); enero y marzo deben aparecer en el historial como cosechas cerradas.
4. Donde el Excel no tiene un dato (por ejemplo, el responsable de una entrega en marzo o mayo, o el peso de las dos últimas entregas de mayo que aún no se ha registrado), muéstralo con un estado vacío apropiado ("Sin responsable registrado", "Peso pendiente de registrar") en vez de inventar un valor.
5. No es necesario tocar el flujo de navegación, los formularios, los componentes visuales ni la paleta de color — eso ya está construido y sigue vigente.

### Confirmación rápida (para que no se pierda nada)

Los archivos de flujo y modelo de datos (`01-flujo-y-pantallas.md`, `02-modelo-de-datos.md`) solo tuvieron cambios de redacción menores desde la última vez (referencias a "últimos 6 meses" pasaron a decir "cosechas 2026") — ningún campo, pantalla, rol o regla de visibilidad cambió. Así que no hay nada estructural pendiente de aplicar; esto es puramente una corrección de contenido.
