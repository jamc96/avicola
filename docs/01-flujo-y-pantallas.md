# Inmeca — Especificación completa de flujo y pantallas

Este documento describe **cada pantalla, modal, formulario y estado** de la app, para los cuatro roles (Trabajador, Supervisor, Dueño, Admin). Es el insumo principal para generar el prototipo visual: no es solo una lista de pantallas, es el flujo completo de principio a fin, incluyendo login y todas las ventanas de registro de información.

Documentos relacionados que se deben usar junto con este:
- `02-modelo-de-datos.md` — entidades, campos y relaciones.
- `03-datos-de-ejemplo.xlsx` — contenido real de las cosechas de 2026 (enero, marzo y mayo — esta última activa) para poblar las pantallas.
- `04-guia-visual.md` — colores, tipografía, componentes.
- `diagrama-flujo-registros.svg` — diagrama del flujo operativo completo.

## 0. Convenciones generales

- **Mobile-first**: todas las pantallas se diseñan primero para un celular (ancho ~375-430px). Nada de tablas de datos crudas — se usan tarjetas, barras de progreso, chips, gráficas y líneas de tiempo (ver `04-guia-visual.md`).
- **Cuatro roles, con visibilidad escalonada muy marcada, definida desde el primer segundo después del login** (cada rol cae directo a la pantalla que corresponde a su responsabilidad principal, no a un menú genérico):
  - **Trabajador — registrar datos es su responsabilidad principal.** Es lo primero que ve y hace al entrar. Además puede ver sus tareas de mantenimiento asignadas y pedir permisos, pero nunca ve comparativos, semáforos, ni información de otros — solo lo que él mismo registró.
  - **Supervisor — dirige la operación física de la granja.** Ve con claridad los registros de todos sus trabajadores, asigna y calendariza tareas de mantenimiento, y gestiona inventario, bodega, transferencias de aves y muestreos de peso. No ve historial de cosechas cerradas, costos, ni aprueba permisos — eso es del Dueño.
  - **Dueño — control y toma de decisiones.** Al entrar tiene de inmediato una vista clara del estado general de la granja (insight, no un menú). Además de eso, puede ejecutar cualquier acción de Trabajador o Supervisor si lo necesita, y es el único con historial completo, costos, calendario y aprobación de permisos.
  - **Admin — técnico, separado del negocio.** No participa del día a día de la granja.
- **Tono profesional de sistema productivo, no de app casera.** Esta aplicación maneja información de cosechas que representan millones de lempiras — el diseño, los nombres de pantalla y el copy deben sentirse serios y confiables (como un sistema de gestión empresarial), nunca cursis o informales. Evitar nombres de pantalla genéricos tipo "Mi Galpón"; usar nombres funcionales y directos ("Registrar producción", "Resumen de la granja", etc.).
- **Auto-captura**: cualquier dato que el sistema pueda saber solo (fecha, hora, usuario que registra, galpón activo, cálculos derivados) **nunca se le pide al usuario**. Los formularios solo piden el dato que una persona tiene que observar (cuántas aves murieron, cuánto pesó la muestra, cuántos sacos entraron).
- **Transferencia de aves entre galpones es opcional**: no es un paso obligatorio del flujo. Existe como una acción disponible cuando se necesita, no como una pantalla que interrumpe el registro normal.
- **Feedback inmediato**: cada acción de guardar muestra una confirmación breve (toast/snackbar) con lo que se guardó y la marca de fecha/hora, y regresa a la pantalla anterior o a un estado "guardado" — nunca deja al usuario sin saber si funcionó.

---

## 1. Flujo de autenticación

### 1.1 Pantalla — Login
**Propósito:** entrada única a la app para los cuatro roles (el rol se determina por la cuenta, no se elige).
**Elementos:**
- Logo/nombre de la granja (configurable, ej. "Inmeca").
- Campo *Usuario o teléfono* (los trabajadores de campo pueden no tener correo — permitir número de teléfono como usuario).
- Campo *Contraseña* (con opción de mostrar/ocultar).
- Botón primario **Entrar**.
- Enlace **Olvidé mi contraseña**.
- Estado de error: mensaje corto bajo el formulario ("Usuario o contraseña incorrectos") sin recargar la pantalla.
**Después de entrar:** la app redirige automáticamente a la pantalla de inicio del rol correspondiente (ver mapas de navegación en las secciones 3-6). El usuario nunca elige su rol — ya viene definido por su cuenta.

### 1.2 Pantalla — Olvidé mi contraseña
**Elementos:** campo de teléfono/usuario, botón **Enviar instrucciones**, mensaje de confirmación ("Si el usuario existe, te llegarán instrucciones"). Vuelve a Login.

### 1.3 Pantalla — Establecer nueva contraseña
(Se llega desde un enlace/código, fuera del alcance detallado del POC visual — se puede representar como una pantalla simple con dos campos: nueva contraseña y confirmar, botón **Guardar contraseña**.)

### 1.4 Selector de galpón (solo si el usuario tiene más de uno asignado)
Aparece **inmediatamente después del login** solo para Trabajador o Supervisor si tienen más de un galpón asignado. Si solo tienen uno, se salta esta pantalla y se entra directo a su pantalla principal.
**Elementos:** tarjetas grandes, una por galpón asignado, con nombre y cantidad de aves vivas. Tocar una tarjeta entra a la pantalla principal de ese rol con ese galpón activo. Se puede cambiar de galpón después desde dentro de la app (chip selector, ver secciones 3-4).

---

## 2. Mapa de navegación por rol

```
TRABAJADOR                  SUPERVISOR                   DUEÑO                        ADMIN
├─ Registrar producción      ├─ Galpones y registros       ├─ Resumen (home,            ├─ Sistema (home)
│   (home)                   │   (home)                    │   insight inmediato)       └─ Usuarios
├─ Tareas asignadas          ├─ Muestreo de peso           ├─ Galpones
├─ Mis registros             ├─ Inventario y bodega        ├─ Historial (cosechas 2026)
└─ Solicitar permiso         ├─ Trasladar aves (opcional)  ├─ Bodega y costos
                              ├─ Tareas y calendario          ├─ Alertas
                              │   de mi equipo                ├─ Calendario y tareas
                              └─ Permisos de mi equipo         ├─ Permisos (aprobación)
                                 (ver estado)                  └─ Usuarios
```
Navegación inferior fija (bottom tab bar) con los ítems de cada columna. Todos los roles tienen, además, un botón de **Salir / cambiar de cuenta** accesible desde un menú superior (no ocupa un tab).

---

## 3. TRABAJADOR (galponero) — registrar datos es su responsabilidad principal

Principio del rol: **registrar es la acción central del trabajador** — es lo primero que hace al pasar el login, no un paso secundario detrás de una lista de tareas. Fuera de eso, solo puede ver lo que él mismo registró, sus tareas asignadas y el estado de sus propios permisos — nada de comparativos, semáforos, ni información de otros galpones o personas.

### 3.1 Pantalla — Registrar producción (home)
**Propósito:** es la pantalla con la que arranca la sesión del trabajador — su tarea principal, sin nada de por medio.
**Elementos:**
- Encabezado con su nombre y el galpón asignado (fecha y hora del momento, informativas, no editables).
- Campo **Aves muertas hoy**: selector tipo "stepper" (botones +/− grandes) en vez de teclado, para minimizar errores de tecleo.
- Campo **Sacos de alimento consumidos hoy**: selector de tipo de alimento (Súper Inicio / Súper Final) + número de sacos (stepper o teclado numérico).
- Un solo botón **Guardar registro de hoy** (mortalidad y consumo se guardan juntos — no hay botones separados).
- Si ya registró hoy, la pantalla lo muestra de entrada ("Ya registraste hoy: 3 aves muertas, 5 sacos") con la opción de actualizarlo, en vez de un formulario vacío.
**Validaciones:** no se puede guardar dos veces el mismo día sin confirmar que se quiere sobreescribir (mensaje: "Ya registraste hoy. ¿Actualizar el registro?"). Los campos numéricos no aceptan negativos.
**Estado de éxito:** confirmación breve (toast) "Guardado: 3 aves muertas, 5 sacos de Súper Inicio — hoy 9:40 a.m."

### 3.2 Pantalla — Tareas asignadas
**Propósito:** ver y marcar el mantenimiento del día (limpieza, revisión de equipo) — secundario al registro, accesible desde un tab aparte.
**Elementos:**
- Lista de tareas de mantenimiento asignadas para hoy y los próximos días (ej. "Limpieza de comederos", "Revisión de cortinas"), cada una con un check para marcarla hecha en un toque — no abre ningún formulario.
**Estado vacío:** "Sin tareas de mantenimiento asignadas por ahora."

### 3.3 Pantalla — Mis registros
**Propósito:** que el trabajador pueda confirmar lo que él mismo ha registrado — no es un reporte, es su propia bitácora.
**Elementos:**
- Lista simple (línea de tiempo), más reciente arriba, de sus registros de mortalidad/consumo de la semana en curso: fecha, aves muertas, sacos consumidos.
- Sin comparativos, sin porcentajes contra la tabla ideal, sin datos de otros galpones — solo lo que él ingresó.
**Estado vacío:** "Todavía no has registrado nada esta semana."

### 3.4 Pantalla — Solicitar permiso
**Propósito:** pedir un día libre o justificar una ausencia, de forma tan simple como el resto de sus acciones.
**Elementos:**
- Campo **Fecha del permiso**.
- Campo **Motivo** (texto corto o selector de motivos comunes: enfermedad, personal, otro).
- Fecha de solicitud y solicitante automáticos.
- Botón **Enviar solicitud**.
- Debajo, lista de sus solicitudes anteriores con su estado (pendiente / aprobado / rechazado — este estado lo define el Dueño, ver 5.9).
**Estado de éxito:** "Solicitud enviada — el dueño la va a revisar."

---

## 4. SUPERVISOR — dirige la operación física de la granja

Principio del rol: el supervisor necesita **ver con claridad los registros de sus trabajadores** y tener control operativo completo del ciclo activo — tareas, calendario, inventario, bodega, transferencias y muestreos de peso, porque es quien dirige la operación físicamente dentro de la granja. No tiene acceso a historial de cosechas cerradas, costos, ni a la aprobación final de permisos — eso es del Dueño.

### 4.1 Pantalla — Galpones y registros (home)
**Propósito:** panorama de todos los galpones que supervisa, con visibilidad clara de quién registró qué, para decidir a cuál atender.
**Elementos:**
- Si la cosecha actual tuvo una transferencia de aves entre galpones, una tarjeta informativa breve lo menciona (fecha y galpones involucrados) — si nunca hubo transferencia, esta tarjeta no aparece (no se muestra información que no aplica).
- Lista de tarjetas de galpón (semáforo + barras real/ideal, igual que en la vista del Trabajador pero para todos los galpones a su cargo).
- Dentro de cada tarjeta, un resumen de **quién registró hoy y quién no**: el trabajador asignado a ese galpón, con un ícono claro de "ya registró" o "todavía no", para que el supervisor detecte de inmediato si falta algún registro del día.
- Tocar una tarjeta lleva al detalle del galpón: sus últimos registros diarios (línea de tiempo, con el trabajador responsable de cada uno) y acceso al muestreo de peso (4.2).
- En cada tarjeta, un acceso secundario **Registrar por un trabajador** — usa el mismo formulario de "Registrar producción" del Trabajador (3.1), para los casos en que el trabajador asignado no pudo hacerlo. El registro queda igual, con la fecha automática y el supervisor como usuario que lo hizo (trazabilidad).

### 4.2 Pantalla — Muestreo de peso semanal
**Propósito:** registrar el pesaje del 10% del galpón, en 3 bloques, como ya lo hacen hoy.
**Elementos:**
- Selector de galpón (chips en la parte superior, por si supervisa varios).
- Texto informativo: "Este galpón tiene X aves vivas → muestra sugerida: Y aves" (calculado automáticamente, no se pide).
- Tres bloques idénticos, cada uno con: campo *aves pesadas en este bloque*, campo *peso total del bloque*, y un cálculo automático en vivo del peso promedio por ave de ese bloque.
- Botón **Guardar muestreo de la semana**.
**Estado de éxito:** confirmación con el peso promedio general resultante.

### 4.3 Pantalla — Inventario de alimento
**Propósito:** ver saldos y registrar movimiento de sacos desde la bodega general hacia un galpón.
**Elementos:**
- Saldo actual en bodega general, por tipo de alimento (tarjetas o barras, no tabla).
- Formulario para **transferir de bodega a un galpón**: tipo de alimento (selector), galpón destino (selector), cantidad de sacos. Fecha automática.
- Línea de tiempo de movimientos recientes (entradas y salidas), como tarjetas apiladas con fecha, tipo y cantidad.

### 4.4 Pantalla — Trasladar aves a otro galpón *(opcional)*
**Importante:** esta pantalla existe como una acción disponible, no como un paso obligatorio del flujo. Se debe diseñar de forma que quede claro que es opcional (por ejemplo, con un texto explicativo arriba: "Solo si vas a mover el lote a otro galpón").
**Elementos:**
- Selector de galpón de origen (chips arriba, normalmente ya viene seleccionado el galpón actual).
- Si la cosecha ya tuvo un traslado, se muestra como referencia (línea de tiempo con fecha, origen, destino y cantidad). Si nunca hubo traslado, un texto simple lo indica ("Esta cosecha no ha tenido traslados").
- Formulario: galpón destino (selector, excluye el de origen), cantidad de aves. Fecha y responsable automáticos.
- Botón **Registrar traslado**.
- Nota aclaratoria: "No se cuenta como mortalidad: solo se resta del origen y se suma al destino."

### 4.5 Pantalla — Tareas y calendario de mi equipo
**Propósito:** el supervisor dirige el mantenimiento físico de la granja, así que puede asignar y calendarizar tareas directamente, no solo verlas.
**Elementos:**
- Vista de calendario (semana) con las tareas de mantenimiento de su equipo por galpón y trabajador.
- Botón **+ Nueva tarea**: descripción corta, galpón, trabajador asignado, fecha — fecha de creación y quién la creó, automáticas.
- Cada tarea muestra si ya fue marcada como hecha por el trabajador.
- Estas tareas son las mismas que puede crear el Dueño (5.8) — ambos comparten el mismo calendario de la granja.

### 4.6 Pantalla — Permisos de mi equipo (ver estado)
**Propósito:** que el supervisor sepa qué solicitudes de permiso están pendientes, sin poder resolverlas él mismo.
**Elementos:**
- Lista de solicitudes de permiso de su equipo con su estado (pendiente / aprobado / rechazado) — de solo lectura, la decisión final es del Dueño (5.9).
**Estado vacío:** "Sin solicitudes de permiso pendientes."

---

## 5. DUEÑO — control y toma de decisiones

Principio del rol: al pasar el login, el Dueño debe tener **un insight inmediato y claro del estado de la granja**, no un menú que tenga que interpretar. Es también el único rol que puede ejecutar cualquiera de las acciones de Trabajador y Supervisor si lo necesita (registrar producción, marcar tareas, gestionar inventario, etc.), pero su enfoque principal es de manejo y control: ver el panorama completo, revisar historiales y tomar decisiones — no la operación diaria en sí.

### 5.1 Pantalla — Resumen de la granja (home)
**Propósito:** que en 5 segundos el dueño sepa si algo necesita su atención — es lo primero y lo único que ve al entrar, antes de cualquier menú.
**Elementos:**
- Cuatro cifras clave: aves vivas hoy, % de mortalidad de la cosecha activa, cosechas cerradas en 2026, número de alertas activas.
- Lista de galpones activos (tarjetas con semáforo), tocar lleva al detalle (5.2).
- Gráfica de tendencia de las cosechas de 2026 (peso promedio y mortalidad % por cosecha cerrada).
- Si hay alertas, se muestran las 2 más urgentes con acceso directo a ver todas (5.5). Si no hay alertas, no se muestra esta sección (evita ruido).
- Acceso rápido (no ocupa toda la pantalla) a las acciones que normalmente hacen Trabajador/Supervisor, por si el Dueño necesita intervenir directamente: registrar producción, crear una tarea, revisar inventario.

### 5.2 Pantalla — Detalle de galpón
**Propósito:** que el dueño pueda auditar un galpón específico y entender por qué está en un estado u otro.
**Elementos:**
- Selector de galpón (chips).
- Tarjeta de estado con semáforo y barras real vs. ideal (consumo, peso), con el % exacto.
- Gráfica de consumo real vs. ideal por semana (línea).
- Mapa de calor de mortalidad diaria (cuadrícula semanas × días, con intensidad de color según cantidad de muertes) — reemplaza la tabla de mortalidad diaria del Excel original.

### 5.3 Pantalla — Historial de cosechas (2026)
**Propósito:** ver el desempeño histórico y comparar cosechas.
**Elementos:**
- Gráfica combinada de tendencia (conversión alimenticia y mortalidad % por cosecha).
- Línea de tiempo de cosechas cerradas: cada una como tarjeta con fecha de inicio/cierre, aves iniciales, mortalidad %, peso promedio, conversión, y kg entregados a planta.
- Línea de tiempo de entregas a planta de la cosecha más reciente (fecha, responsable, peso entregado, peso promedio, días).

### 5.4 Pantalla — Bodega y costos
**Propósito:** ver el inventario general y cuánto se ha gastado en alimento.
**Elementos:**
- Gráfica de dona con el saldo actual de bodega por tipo de alimento.
- Barras con los sacos enviados a cada galpón en la cosecha activa.
- Gráfica de barras con el costo de alimento por cosecha cerrada (2026).

### 5.5 Pantalla — Alertas
**Propósito:** lista completa de desviaciones que requieren decisión.
**Elementos:**
- Tarjetas de alerta (rojo = crítico, ámbar = atención), cada una con: título corto, detalle de qué se desvió y cuánto, y de qué galpón se trata.
- Estado vacío: "Sin desviaciones importantes hoy" con un ícono positivo, cuando no hay alertas.

### 5.6 Pantalla — Apertura de cosecha nueva
**Propósito:** único punto donde el Dueño inicia una cosecha; todo lo demás se deriva de aquí.
**Se llega desde:** un botón **+ Nueva cosecha**, visible solo cuando el galpón de recepción elegido no tiene una cosecha activa (para evitar abrir dos cosechas encima).
**Elementos:**
- Campo **Cantidad de aves recibidas**.
- Campo **Galpón de recepción** (selector, solo galpones libres).
- Fecha de ingreso: por defecto hoy (auto), editable solo si se necesita corregir.
- Botón **Abrir cosecha**.
**Estado de éxito:** vuelve al Resumen (5.1) con el nuevo galpón ya visible como activo.

### 5.7 Pantalla — Registrar entrega a planta
**Propósito:** cerrar (total o parcialmente) una cosecha cuando las aves se entregan.
**Se llega desde:** el detalle de galpón (5.2), botón **Registrar entrega**.
**Elementos:**
- Galpón de origen (ya viene fijo, es desde donde se entró).
- Campo **Aves entregadas**.
- Campo **Peso total entregado**.
- Fecha y responsable automáticos.
- Botón **Guardar entrega**. Puede repetirse varias veces si la entrega es parcial (igual que hoy en Excel, que maneja hasta 8 entregas por cosecha).
- Si con esta entrega el galpón queda en cero aves vivas, un mensaje confirma: "Esta cosecha se cierra — el galpón queda libre para una cosecha nueva."

### 5.8 Pantalla — Calendario de tareas y turnos
**Propósito:** que el Dueño planee el mantenimiento de los galpones y quién está en cada uno cada día — retoma la idea de horario rotativo de los trabajadores.
**Elementos:**
- Vista de calendario (semana o mes) con las tareas de mantenimiento programadas por galpón y por trabajador.
- Botón **+ Nueva tarea**: descripción corta, galpón, trabajador asignado, fecha. Fecha de creación y quién la creó, automáticas.
- Cada tarea muestra si ya fue marcada como hecha por el trabajador.

### 5.9 Pantalla — Permisos (aprobación)
**Propósito:** único lugar donde se aprueban o rechazan las solicitudes de permiso.
**Elementos:**
- Lista de solicitudes pendientes: trabajador, fecha solicitada, motivo, fecha de la solicitud (automática).
- Dos acciones por solicitud: **Aprobar** / **Rechazar** (un toque, sin formulario adicional).
- Historial de solicitudes ya resueltas, como referencia.
**Estado vacío:** "No hay solicitudes de permiso pendientes."

---

## 6. ADMIN (técnico/plataforma)

**Nota:** este rol es de uso interno, no lo usa el cliente. Debe sentirse visualmente distinto (más neutro/técnico) del resto de la app, para que quede claro que no es parte del flujo de negocio.

### 6.1 Pantalla — Sistema (home)
**Elementos:**
- Lista de granjas registradas (tarjeta con nombre, cantidad de galpones, estado).
- Botón **Agregar granja**.
- Lista de galpones de la granja seleccionada, con acceso a editar cada uno.
- Botón **Agregar galpón**.
- Tarjeta informativa de la tabla técnica de valores ideales: "Precargada, no editable en esta versión" con un botón deshabilitado **Editar tabla (próximamente)**.

### 6.2 Pantalla — Usuarios
**Elementos:**
- Lista de todos los usuarios de la plataforma (incluye al Dueño), cada uno con nombre, rol (etiqueta de color) y galpón(es) asignado(s).
- Botón **Agregar usuario** → formulario simple (nombre, teléfono/usuario, rol, galpón asignado si aplica).

---

## 7. Componentes y estados compartidos

- **Confirmación de guardado (toast/snackbar):** aparece abajo, 2-3 segundos, con el resumen de lo guardado y la marca de tiempo automática. No requiere que el usuario la cierre.
- **Estado vacío:** siempre con un mensaje claro de por qué está vacío (cosecha nueva, sin alertas, sin traslados) — nunca una pantalla en blanco sin explicación.
- **Estado de error al guardar (para cuando la app esté conectada a datos reales, más allá de este prototipo):** mensaje corto con botón **Reintentar**, sin perder lo que la persona ya escribió.
- **Confirmaciones destructivas o de sobreescritura** (ej. "ya registraste hoy"): modal simple de dos botones, **Cancelar** / **Sí, actualizar**.
- **Selector de galpón (chips):** patrón reutilizado en Trabajador (si tiene más de uno), Supervisor y Dueño — fila horizontal de chips, el activo resaltado.

---

## 8. Resumen de todas las ventanas de registro de información

Para referencia rápida, estas son **todas** las pantallas/formularios donde se ingresan datos (nada de solo-lectura):

1. Login (usuario/teléfono + contraseña).
2. Olvidé mi contraseña.
3. Establecer nueva contraseña.
4. Registrar hoy (Trabajador, y Supervisor en su lugar si hace falta) — mortalidad + consumo.
5. Marcar tarea como hecha (Trabajador) — un toque, sin formulario.
6. Solicitar permiso (Trabajador) — fecha y motivo.
7. Muestreo de peso semanal (Supervisor) — 3 bloques.
8. Transferencia bodega → galpón (Supervisor) — inventario.
9. Trasladar aves a otro galpón (Supervisor, opcional).
10. Apertura de cosecha nueva (Dueño) — cantidad de aves, fecha, galpón de recepción.
11. Registro de entrega a planta (Dueño) — aves entregadas, peso total.
12. Nueva tarea de mantenimiento (Dueño o Supervisor) — descripción, galpón, trabajador, fecha.
13. Aprobar/rechazar permiso (Dueño) — un toque, sin formulario.
14. Alta de granja (Admin).
15. Alta de galpón (Admin).
16. Alta de usuario (Admin/Dueño) — nombre, usuario, rol, galpón asignado.

Todas comparten el mismo principio: **el usuario solo escribe lo que nadie más puede saber; todo lo demás (fecha, hora, cálculos, quién lo hizo) se captura solo.**
