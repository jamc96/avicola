# Inmeca — Modelo de datos

Entidades, campos y relaciones que respaldan las pantallas descritas en `01-flujo-y-pantallas.md`. Los tipos son orientativos (para maquetar campos y formatos), no un esquema de base de datos definitivo.

## Diagrama de relaciones (resumen)

```
Granja 1──N Galpón
Galpón 1──N Cosecha (a través de CosechaGalpon, porque una cosecha puede pasar por varios galpones)
Cosecha 1──N CosechaGalpon
CosechaGalpon 1──N RegistroDiario
CosechaGalpon 1──N MuestreoPeso
CosechaGalpon 1──N EntregaPlanta
Cosecha 0──N TransferenciaAves (opcional)
Granja 1──1 BodegaGeneral
BodegaGeneral 1──N MovimientoInventario
Usuario N──N Galpón (asignación)
CosechaGalpon 1──N Alerta (generadas, no capturadas por el usuario)
Usuario 1──N Tarea (asignada a)
Usuario 1──N SolicitudPermiso (solicitada por)
```

## Granja
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| nombre | texto | Admin, al crear |
| galpones | lista de Galpón | derivado |

## Galpón
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| nombre | texto | Admin, al crear (ej. "Galpón 1") |
| granjaId | referencia | Admin |
| estado | enum: `libre` / `ocupado` | derivado (según si tiene cosecha activa) |

## Cosecha
Representa un lote de aves desde que se reciben hasta que se entrega por completo. Puede ocupar uno o más galpones a lo largo de su vida (ver `CosechaGalpon` y `TransferenciaAves`).
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| nombre | texto (ej. "Cosecha 1 de julio 2026") | derivado de la fecha de apertura |
| avesRecibidasTotal | número | Dueño, al abrir |
| fechaIngreso | fecha | Dueño, al abrir (auto = hoy por defecto) |
| galponRecepcionId | referencia a Galpón | Dueño, al abrir |
| estado | enum: `activa` / `cerrada` | derivado |
| fechaCierre | fecha | derivado (cuando la última entrega deja el galpón en 0 aves vivas) |

## CosechaGalpon
Cada tramo de la cosecha dentro de un galpón específico (normalmente uno solo, dos si hubo transferencia).
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaId | referencia | derivado |
| galponId | referencia | derivado |
| avesIniciales | número | recepción o transferencia entrante |
| avesVivas | número | derivado = avesIniciales − mortalidad acumulada − transferencias salientes |
| semanaActual | número | derivado de la fecha |
| consumoAcumuladoQQ | número | derivado, suma de RegistroDiario |
| mortalidadAcumulada | número | derivado, suma de RegistroDiario |

## RegistroDiario
La captura diaria del Trabajador (mortalidad + consumo), un registro por galpón por día.
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaGalponId | referencia | contexto de sesión (auto) |
| fecha | fecha | **automática** (no se pide) |
| hora | hora | **automática** |
| usuarioId | referencia | **automática** (login) |
| avesMuertas | número | Trabajador — input |
| tipoAlimento | enum: `Súper Inicio` / `Súper Final` | Trabajador — selector |
| sacosConsumidos | número | Trabajador — input |

## MuestreoPeso
Un registro por semana de control (días 14/21/28/35/42), con 3 bloques.
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaGalponId | referencia | contexto (auto) |
| fecha | fecha | **automática** |
| usuarioId | referencia | **automática** |
| semana | número | derivado de la fecha |
| bloques | lista de 3: {avesPesadas, pesoTotalLb} | Supervisor — input |
| pesoPromedioLb | número | derivado = suma(pesoTotal) / suma(avesPesadas) |

## TransferenciaAves (opcional)
Solo existe si el Supervisor/Dueño decide mover aves de un galpón a otro. No es obligatoria.
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaId | referencia | contexto |
| fecha | fecha | **automática** |
| usuarioId | referencia | **automática** |
| galponOrigenId | referencia | Supervisor — ya viene preseleccionado (el galpón activo) |
| galponDestinoId | referencia | Supervisor — selector |
| cantidadAves | número | Supervisor — input |

## BodegaGeneral
| Campo | Tipo | Origen |
|---|---|---|
| granjaId | referencia | derivado |
| saldos | lista de {tipoAlimento, sacos} | derivado, suma de MovimientoInventario |

## MovimientoInventario
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| fecha | fecha | **automática** |
| usuarioId | referencia | **automática** |
| tipoAlimento | enum: `Súper Inicio` / `Súper Final` | Supervisor — selector |
| cantidadSacos | número | Supervisor — input |
| direccion | enum: `entrada` (compra a bodega) / `salida` (bodega → galpón) | según pantalla de origen |
| galponDestinoId | referencia (solo si direccion=salida) | Supervisor — selector |

## EntregaPlanta
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaGalponId | referencia | contexto |
| fecha | fecha | **automática** |
| usuarioId (responsable) | referencia | **automática** |
| avesEntregadas | número | Dueño — input |
| pesoTotalLb | número | Dueño — input |
| pesoPromedioLb | número | derivado = pesoTotalLb / avesEntregadas |
| diasCosecha | número | derivado = fecha entrega − fecha ingreso |

## TablaIdeal
Valores fijos de referencia técnica, precargados (no editables en esta primera versión).
| Campo | Tipo |
|---|---|
| semana | número (1-7) |
| consumoIdealPct | número |
| pesoIdealLb | número |
| conversionIdeal | número |
| mortalidadIdealPct | número |

## Usuario
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| nombre | texto | Admin/Dueño, al crear |
| usuario (teléfono o correo) | texto | Admin/Dueño, al crear |
| rol | enum: `trabajador` / `supervisor` / `dueno` / `admin` | Admin/Dueño, al crear |
| galponesAsignados | lista de referencias | Admin/Dueño, al crear (vacío para dueño/admin) |

## Alerta
Nunca se captura manualmente — siempre calculada.
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| cosechaGalponId | referencia | derivado |
| severidad | enum: `atencion` (ámbar) / `critica` (roja) | derivado de umbrales |
| titulo | texto | derivado |
| detalle | texto | derivado |
| fechaGenerada | fecha | **automática** |

### Umbrales usados para calcular severidad (ejemplo usado en el POC)
- **Crítica:** mortalidad acumulada > 4%, o peso real < 90% del ideal, o consumo real < 85% del ideal.
- **Atención:** mortalidad acumulada > 2.2%, o peso real < 96% del ideal, o consumo real < 93% del ideal.
- **Inventario bajo (atención):** saldo de bodega proyectado no cubre el consumo estimado de la próxima semana.

Estos umbrales son ajustables — se dejan aquí como punto de partida basado en los datos reales de Inmeca.

## Tarea
Tarea de mantenimiento (limpieza, revisión de equipo, etc.), independiente del registro de producción.
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| descripcion | texto corto | Dueño o Supervisor, al crear (ej. "Limpieza de comederos") |
| galponId | referencia | Dueño o Supervisor, al crear |
| usuarioAsignadoId | referencia | Dueño o Supervisor, al crear |
| fecha | fecha | Dueño o Supervisor, al crear |
| estado | enum: `pendiente` / `hecha` | Trabajador — marca con un toque |
| fechaCompletada | fecha/hora | **automática**, al marcarla hecha |
| creadoPor | referencia | **automática** (Dueño o Supervisor, comparten el mismo calendario) |

## SolicitudPermiso
| Campo | Tipo | Origen |
|---|---|---|
| id | texto | sistema |
| usuarioId (solicitante) | referencia | **automática** (login) |
| fechaSolicitada | fecha | Trabajador — input (el día que pide libre) |
| motivo | texto corto / enum (`enfermedad`, `personal`, `otro`) | Trabajador — input |
| fechaDeEnvio | fecha/hora | **automática** |
| estado | enum: `pendiente` / `aprobado` / `rechazado` | Dueño — decide (un toque) |
| resueltoPor | referencia | **automática**, al aprobar/rechazar |
| fechaResolucion | fecha/hora | **automática** |

## Reglas de visibilidad por rol

Esta tabla es la referencia rápida de qué puede ver y hacer cada rol — es el punto más importante a respetar en el diseño, para no filtrar información de más en las pantallas de Trabajador y Supervisor.

| Entidad / información | Trabajador | Supervisor | Dueño | Admin |
|---|---|---|---|---|
| RegistroDiario — crear | Solo el suyo (es su acción principal al entrar) | Sí, por cualquier trabajador de su equipo | Sí | No |
| RegistroDiario — ver | Solo lo que él mismo registró | Todo el ciclo activo, identificado por trabajador | Todo, incluido historial | No |
| MuestreoPeso, TransferenciaAves, MovimientoInventario, Bodega | No | Sí (crear y ver — dirige la operación física) | Sí | No |
| Comparativo real vs. ideal / semáforos | No | Sí (ciclo activo) | Sí | No |
| Historial de cosechas cerradas (2026) | No | No | Sí | No |
| Costos, bodega general (reportes) | No | Ve saldos para operar, no reportes de costo | Sí | No |
| Alertas | No | No | Sí | No |
| Tarea — crear/calendarizar | No | Sí | Sí | No |
| Tarea — marcar hecha | Sí, la suya | Ve las de su equipo | Ve todas | No |
| SolicitudPermiso — crear | Sí | No | Sí (puede crear en nombre de alguien, si aplica) | No |
| SolicitudPermiso — ver | Solo las suyas | Las de su equipo (solo lectura) | Todas | No |
| SolicitudPermiso — aprobar/rechazar | No | No | Sí | No |
| Configuración de granjas/galpones/usuarios de plataforma | No | No | Gestiona usuarios operativos | Sí (todo) |

Nota: el Dueño no está limitado por esta tabla — puede ejecutar cualquier acción de Trabajador o Supervisor además de las suyas propias. La tabla marca el **mínimo** que cada rol necesita ver, no un techo para el Dueño.
