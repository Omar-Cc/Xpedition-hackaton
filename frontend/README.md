# EmpléaUTP

Plataforma de empleabilidad para estudiantes universitarios. Conecta el récord académico del alumno con ofertas laborales reales, genera CVs con IA, simula entrevistas y traza un plan personalizado de 30 días para conseguir prácticas.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 (strict) |
| Estilos | Tailwind CSS v4 (CSS-first) |
| Componentes UI | daisyUI v5 |
| Iconos | lucide-react |
| Runtime | React 19 / Node 20+ |

---

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior

---

## Instalación y arranque

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd Xpedition-hackaton

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:3000`.

Otros comandos:

```bash
npm run build   # compilación de producción
npm run start   # servidor de producción (requiere build previo)
npm run lint    # linter ESLint
```

---

## Estructura del proyecto

```
Xpedition-hackaton/
├── app/                          # Rutas Next.js (App Router)
│   ├── layout.tsx                # Layout raíz (fuentes, data-theme)
│   ├── globals.css               # Tailwind + daisyUI + tokens de color
│   ├── page.tsx                  # Página de inicio
│   ├── dashboard/page.tsx
│   ├── cv-builder/page.tsx
│   ├── job-match/page.tsx
│   ├── mentoria/page.tsx
│   ├── plan-30d/page.tsx
│   ├── cursos/page.tsx
│   ├── seguimiento/page.tsx
│   └── simulator/page.tsx
│
└── src/
    ├── lib/
    │   └── utils.ts              # Helper cn() para clases condicionales
    │
    ├── components/
    │   └── layout/
    │       ├── Sidebar.tsx       # Navegación lateral (Client Component)
    │       ├── TopBanner.tsx     # Banner del dashboard con radial-progress
    │       ├── PageShell.tsx     # Wrapper Sidebar + contenido (reutilizable)
    │       └── PageHeader.tsx    # Cabecera navy con slots title/subtitle/left/right
    │
    └── features/                 # Módulos por funcionalidad
        ├── dashboard/
        ├── cv-builder/
        ├── job-match/
        ├── mentoria/
        ├── plan30d/
        ├── cursos/
        ├── seguimiento/
        └── simulator/
```

Cada módulo en `features/` tiene la misma estructura interna:

```
features/<modulo>/
├── types/index.ts       # Interfaces TypeScript del módulo
├── data/mock-data.ts    # Datos mock (simulan respuestas de FastAPI/Supabase)
└── components/          # Componentes UI exclusivos de esa vista
```

---

## Vistas disponibles

| Ruta | Vista | Descripción |
|---|---|---|
| `/dashboard` | Dashboard | Estadísticas, acciones rápidas, empleos recomendados, progreso semanal |
| `/cv-builder` | Constructor de CV | Input de oferta, keywords detectadas por IA, comparación de habilidades |
| `/job-match` | Job Match | Tarjetas tipo swipe para explorar prácticas, filtros, lista completa |
| `/mentoria` | Mentoría entre pares | Perfil de mentor, conectar / agendar sesión, mentores adicionales |
| `/plan-30d` | Mi Plan 30 Días | Calendario semanal, tarea del día con checkboxes, brechas de habilidad |
| `/cursos` | Mis Cursos | Tabla cursos vs. requisitos del empleo, fortalezas para agregar al CV |
| `/seguimiento` | Seguimiento | Stepper de postulación, preparación de entrevista, conflictos de horario |
| `/simulator` | Simulador IA | Pregunta del entrevistador IA, micrófono, historial con score por respuesta |

---

## Arquitectura y decisiones de diseño

### Server vs Client Components

Por defecto todos los componentes son **Server Components**. Solo se marca `'use client'` cuando el componente necesita estado o eventos del navegador:

| Componente | Motivo |
|---|---|
| `Sidebar.tsx` | `usePathname()` para resaltar el ítem activo |
| `CVStepperTabs.tsx` | Estado del paso activo con `useState` |
| `SwipeActions.tsx` | Handlers de click (saltar / guardar / aplicar) |
| `TodayTask.tsx` | Checkboxes con estado local |
| `MicrophoneCard.tsx` | Toggle de grabación |

### Tokens de color personalizados

Definidos en `app/globals.css` dentro del bloque `@theme` de Tailwind v4:

```css
@theme {
  --color-navy: #1a2540;    /* Sidebar y cabeceras de página */
  --color-bg-soft: #f0f4f8; /* Fondo del área de contenido */
}
```

Se usan como cualquier utilidad de Tailwind: `bg-navy`, `bg-bg-soft`, `text-navy`, etc.

### Tema daisyUI

Se fuerza el tema `light` para que los colores sean consistentes sin importar el modo del sistema operativo del usuario:

```css
/* app/globals.css */
@plugin "daisyui" {
  themes: light --default;
}
```

---

## Cómo agregar una nueva vista

1. Crear `app/<ruta>/page.tsx`
2. Crear `src/features/<modulo>/` con las carpetas `types/`, `data/` y `components/`
3. Usar `PageShell` y `PageHeader` para mantener el layout consistente:

```tsx
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'

export default function NuevaVista() {
  return (
    <PageShell>
      <PageHeader title="Título" subtitle="Subtítulo" />
      <main className="flex-1 overflow-y-auto p-6">
        {/* contenido */}
      </main>
    </PageShell>
  )
}
```

`PageHeader` acepta slots opcionales `left` y `right` para elementos extra en la cabecera (progress circles, chips de empresa, barras de progreso, etc.).

---

## Cómo conectar el backend real

Los archivos `mock-data.ts` exportan objetos tipados que imitan la forma de una respuesta de API. Cuando el backend esté listo:

1. Convertir el `page.tsx` correspondiente en un `async` Server Component.
2. Reemplazar el import de `mock-data` por un `fetch` o cliente Supabase.
3. Pasar los datos como props — los componentes hijo no cambian.

```tsx
// Antes (mock)
import { jobMatches } from '@/src/features/dashboard/data/mock-data'

// Después (API real)
const jobMatches = await fetchJobMatches(userId)
```

---

## Convenciones del código

- **TypeScript strict** — sin `any` en todo el proyecto.
- **Máximo ~80 líneas por componente** — si crece, se extrae un componente hijo.
- **Datos y UI desacoplados** — los componentes no definen datos hardcodeados; todo viene de `mock-data.ts` o props.
- **Sin comentarios obvios** — el código se autodocumenta con nombres descriptivos; se comenta solo cuando el "por qué" no es evidente.
- **Imports con alias `@/`** — `@/src/...` resuelve a `./src/...` según `tsconfig.json`.
