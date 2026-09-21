# Product & Domain Specification

## Dance Sessions & Song Cycling System

---

## 1. Contexto y problema

El sistema busca resolver un problema **no técnico**, sino **humano**:

* La fatiga física no es lineal ni predecible.
* La repetición forzada de canciones genera desgaste y desmotivación.
* Omitir canciones no es un error, es una señal del cuerpo.
* Un sistema rígido (listas cerradas, ciclos forzados) rompe la experiencia.

El objetivo no es **optimizar rendimiento**, sino **acompañar el ritmo corporal** sin perder variedad ni estructura.

---

## 2. Objetivos del sistema

### Objetivos principales

* Garantizar **variedad real** de canciones a lo largo del tiempo.
* Evitar repeticiones forzadas dentro de un mismo ciclo.
* Permitir omisiones sin bloquear el avance del sistema.
* Congelar decisiones durante una sesión para generar confianza.
* Separar claramente **datos históricos** de **interpretación presente**.

### Objetivos explícitamente fuera de alcance

* No se busca maximizar calorías.
* No se busca optimizar performance deportiva.
* No se busca predecir el comportamiento humano con exactitud.
* No se busca que el backend “decida” por el usuario.

---

## 3. Conceptos clave (Glosario)

### Song

Entidad estática que representa una canción.
No contiene estado humano ni información de sesiones.

---

### DanceSession

Representa una sesión explícita de baile iniciada por el usuario.
Define un marco temporal, no decisiones de contenido.

---

### DanceLog

Registro inmutable de un evento ocurrido durante una sesión:

* una canción bailada
* o una canción omitida

Es la **fuente de verdad histórica**.

---

### Cycle

Concepto derivado, **no persistido**.
Representa el conjunto de canciones distintas bailadas recientemente.

Un ciclo se considera cubierto cuando se alcanza el **90% del total de canciones**.

---

### SessionPlaylist

Listado **inmutable** de canciones calculadas al inicio de una sesión.
Vive exclusivamente en el frontend.

---

### Score

Valor dinámico y efímero que expresa qué tan adecuada es una canción **en este momento**.
Nunca se persiste.

---

## 4. Modelo de datos

### 4.1 SongEntity (Backend)

```ts
SongEntity {
  id: string
  name: string
  level: number              // nivel base, no se modifica
  bodyImpact: number
  perceivedLevel: number
  kcalsAverage: number
  version: Version
  createdAt: Date
}
```

**Invariantes:**

* No guarda estado de sesiones.
* No sabe si fue bailada.
* No conoce el ciclo.
* No tiene score.

---

### 4.2 DanceSession (Backend)

```ts
DanceSession {
  id: string
  startedAt: Date
  endedAt?: Date
  targetSongsCount: number
}
```

**Reglas:**

* Una sesión puede estar abierta o cerrada.
* Una sesión no se modifica una vez cerrada.
* No almacena canciones seleccionadas.

---

### 4.3 DanceLog (Backend)

```ts
DanceLog {
  id: string
  songId: string
  sessionId: string
  dancedAt: Date
  wasOmitted: boolean
  kcal: number
}
```

**Reglas:**

* Es inmutable.
* Cada acción relevante genera un log.
* Es la base para calcular ciclos y recencia.

---

### 4.4 SessionPlaylist (Frontend)

```ts
SessionPlaylist {
  sessionId: string
  songIds: string[]   // ordenados
  createdAt: Date
}
```

**Reglas:**

* Se crea una sola vez por sesión.
* No se recalcula.
* Se persiste en localStorage mientras la sesión esté activa.

---

## 5. Reglas de negocio fundamentales

### 5.1 Regla del ciclo (CRÍTICA)

* El ciclo se considera cubierto cuando se han bailado **el 90% de las canciones distintas**.
* El cycle threshold se calcula como:

```ts
cycleThreshold = ceil(totalSongs * 0.9)
```

* El ciclo **no se reinicia explícitamente**.
* El ciclo se disuelve naturalmente al derivar los registros más recientes.

---

### 5.2 Regla de inmutabilidad por sesión

* Una vez creada la `SessionPlaylist`, **no puede cambiar**.
* El orden y el conjunto de canciones se mantienen durante toda la sesión.
* Cambios en fatiga o estado corporal no afectan la playlist actual.

---

### 5.3 Regla de omisión

* Omitir una canción:

  * no la bloquea
  * no rompe el ciclo
  * no impide avanzar
* La omisión solo influye indirectamente en el score futuro.

---

### 5.4 Regla de separación de responsabilidades

* Backend:

  * registra hechos
  * expone datos
* Frontend:

  * interpreta contexto
  * calcula scores
  * construye playlists

---

## 6. Algoritmos

### 6.1 Cálculo de canciones recientes (Cycle)

```ts
function getRecentlyDancedSongIds(logs, totalSongs) {
  const threshold = Math.ceil(totalSongs * 0.9)
  const set = new Set()

  for (const log of logs) {
    if (log.wasOmitted) continue
    set.add(log.songId)
    if (set.size >= threshold) break
  }

  return set
}
```

---

### 6.2 Scoring dinámico (Frontend)

**Principios:**

* El score nunca prohíbe.
* El score solo ordena.
* El score es contextual.

```ts
function calculateScore(song, recentLogs, bodyState, sessionContext) {
  let score = 0

  if (!wasRecentlyDanced(song, recentLogs)) score += 2
  else score -= 2

  if (song.level === 'alto' && bodyState.globalFatigue === 'high') score -= 3

  if (song.bodyImpact === 'alto' && bodyState.kneeSensitivity === 'high') score -= 4

  const omissions = countRecentOmissions(song, recentLogs)
  score -= omissions

  return clamp(score, -10, 10)
}
```

---

### 6.3 Construcción de SessionPlaylist

```ts
function buildSessionPlaylist(sessionId, songs, logs, targetCount, bodyState) {
  const recentIds = getRecentlyDancedSongIds(logs, songs.length)

  const available = songs.filter(s => !recentIds.has(s.id))

  const scored = available.map(song => ({
    song,
    score: calculateScore(song, logs, bodyState)
  }))

  const ordered = scored.sort((a, b) => b.score - a.score)

  const selected = selectBalancedByLevel(ordered, targetCount)

  return {
    sessionId,
    songIds: selected.map(s => s.song.id),
    createdAt: new Date()
  }
}
```

---

## 7. Persistencia y estado

### Backend

* Songs
* DanceSessions
* DanceLogs

### Frontend (localStorage)

```ts
{
  activeSessionId,
  sessionPlaylist
}
```

### No se persiste

* score
* ciclo
* estado de canciones
* reglas

---

## 8. API Endpoints

### Songs (CRUD)

* `GET /songs`

---

### DanceSessions (CRUD)

* `POST /dance-sessions`
* `PATCH /dance-sessions/:id`

---

### DanceLogs (CRUD)

* `POST /dance-logs`
* `GET /dance-logs?order=desc&limit=N`

---

### Endpoints explícitamente prohibidos

* `/reset-cycle`
* `/recalculate-playlist`
* `/song-state`

---

## 9. Flujos principales

### Abrir sesión

1. Crear `DanceSession`
2. Construir `SessionPlaylist`
3. Persistir playlist en frontend

---

### Sesión activa

* Mostrar playlist congelada
* Registrar logs por acción

---

### Cerrar sesión

* Cerrar `DanceSession`
* Limpiar playlist persistida

---

### Nueva sesión

* Recalcular ciclo implícitamente
* Generar nueva playlist

---

## 10. Invariantes del sistema (NO negociables)

* Una playlist no cambia durante una sesión.
* El backend no calcula score.
* Las canciones no conocen el ciclo.
* El ciclo no se reinicia manualmente.
* Omitir nunca bloquea.

---

## 11. Casos límite

* Pocas canciones → el threshold se adapta automáticamente.
* Muchas omisiones → el sistema sigue avanzando.
* Refresh de la SPA → la sesión continúa intacta.
* Sesiones muy cortas → no rompen el ciclo.

---

## 12. Principio rector (final)

> **El sistema no exige progreso.
> Solo crea las condiciones para que ocurra.**

---

Si quieres, el siguiente paso puede ser:

* convertir esto en **README de repo**
* separar en **PRD + Tech Spec**
* o escribir tests conceptuales basados en invariantes

Tú decides.


## Detalles adicionales
- las pantallas de canciones y sesiones deben seguir existiendo como estaban
- la pantalla de canciones no deberia ver afectada su funcionalidad actual
- las sesiones ahora funcionan asi:
  - creamos una sesion sin numero
  - solicitamos la cantidad de canciones a bailar
  - al iniciar la sesion, se crea una playlist congelada en el frontend
  - la playlist se basa en las reglas y algoritmos definidos en este doc
  - durante la sesion, se registran logs de canciones bailadas y omitidas
  - al cerrar la sesion, se limpia la playlist del frontend