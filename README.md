# 🎓 EmpléaUTP

**Plataforma integral de empleabilidad para estudiantes universitarios.**

EmpléaUTP es una solución completa diseñada para cerrar la brecha entre la formación académica y el mundo laboral. Conecta el potencial de los estudiantes universitarios con oportunidades reales de empleo mediante inteligencia artificial, mentoría personalizada y herramientas de preparación profesional.

---

## 🎯 La Propuesta

Millones de estudiantes universitarios se gradúan cada año sin una estrategia clara de insertarse en el mercado laboral. EmpléaUTP resuelve esto proporcionando:

- **Análisis inteligente del perfil académico** → Mapea tus cursos, habilidades y experiencia  
- **Generación de CVs personalizados** → Adaptados automáticamente a cada oferta de empleo  
- **Búsqueda y matching de empleos** → Encuentra prácticas y primeros empleos relevantes  
- **Preparación intensiva** → Simulaciones de entrevistas con IA, mentoría de pares, planes de 30 días  
- **Seguimiento del progreso** → Monitorea tu avance desde aplicación hasta firma del contrato

El resultado: **estudiantes mejor preparados, empleadores confiados, menos desempleo en junior talent.**

---

## 🏗️ Arquitectura del Proyecto

EmpléaUTP está dividido en dos capas que funcionan en armonía:

### **Frontend** (`/frontend`)

**Stack:** Next.js 16 + TypeScript + Tailwind CSS + React 19

El frontend es una aplicación web interactiva y responsive que funciona como el punto de contacto del estudiante. Su arquitectura modular garantiza mantenibilidad y escalabilidad:

```
frontend/
├── app/                    # Rutas Next.js (App Router)
│   ├── dashboard
│   ├── cv-builder
│   ├── job-match
│   ├── mentoria
│   ├── plan-30d
│   ├── cursos
│   ├── seguimiento
│   └── simulator
│
└── src/
    ├── components/layout/  # Componentes reutilizables (Sidebar, Headers, etc)
    └── features/           # Módulos por funcionalidad (cada uno con sus tipos, datos y componentes)
```

**Características clave:**

- **Server Components por defecto** → Mejor performance y seguridad
- **Componentes Client solo donde es necesario** → Para manejo de estado e interactividad
- **Desacoplamiento datos-UI** → Los datos vienen de `mock-data.ts` o del backend (preparado para conectar)
- **Diseño consistente** → `PageShell` y `PageHeader` aseguran UX uniforme en todas las vistas
- **Tokens de color personalizados** → Navy y soft backgrounds para identidad visual coherente

### **Backend** (`/backend`)

**Stack:** FastAPI + Python 3.11+ + Groq API (LLM)

El backend es un servicio REST que alimenta la inteligencia de la plataforma. Actualmente implementa:

```
backend/
├── app/
│   ├── api/v1/
│   │   └── cv_builder.py      # Endpoints de CV e IA
│   │
│   ├── services/              # Lógica de negocio (integración con LLM)
│   │
│   ├���─ schemas/               # Modelos de datos (Pydantic)
│   │   ├── cv.py              # StudentProfile, CVGenerateRequest/Response
│   │   └── cv_job_analyze.py  # JobAnalysisRequest/Response
│   │
│   ├── prompts/               # System prompts para IA
│   │   ├── cv_prompts.py
│   │   └── cv_analyze_prompt.py
│   │
│   └── core/                  # Configuración e integraciones
│       ├── config.py          # Variables de entorno
│       └── ai_client.py       # Cliente Groq (LLM)
```

**Endpoints implementados:**

- `POST /api/v1/cv/generate` → Genera CV adaptado a una oferta de empleo
- `POST /api/v1/cv/analyze-job` → Analiza una oferta y compara con el perfil del estudiante

**Inteligencia AI:**

- Utiliza **Groq API** con modelo `llama-3.3-70b-versatile`
- Prompts estructurados para garantizar respuestas JSON válidas
- Análisis de coincidencias de skills entre estudiante y requisitos del empleo

---

## 📦 Cómo funciona juntos

```
┌─────────────┐
│   Student  │
│  (Frontend) │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────┐
│   API Gateway (CORS)    │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────┐
│   FastAPI Service    │
├──────────────────────┤
│ • Valida requests    │
│ • Procesá datos      │
│ • Llama IA (Groq)    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Groq LLM API        │
│  (llama-3.3-70b)     │
└──────────────────────┘
       │
       ▼ JSON Response
┌──────────────────────┐
│  Backend → Frontend  │
│ (Datos tipados)      │
└─────────────────────┘
```

---

## 🗺️ Vistas y Funcionalidades

| Vista | Descripción | Estado |
|-------|-------------|--------|
| **Dashboard** | Hub central: empleos recomendados, racha de tareas, estadísticas | ✅ UI lista |
| **CV Builder** | Constructor inteligente: detecta skills, genera CVs adaptados | ✅ Con IA backend |
| **Job Match** | Explora prácticas con swipe cards, filtros y análisis de compatibilidad | ✅ UI lista |
| **Mentoría** | Conecta con mentores pares que trabajan en tu carrera | ✅ UI lista |
| **Plan 30 Días** | Calendario interactivo con tareas de preparación personalizadas | ✅ UI lista |
| **Mis Cursos** | Mapea tus calificaciones vs requisitos de empleos | ✅ UI lista |
| **Seguimiento** | Rastreo del proceso: postulación → entrevista → oferta | ✅ UI lista |
| **Simulador IA** | Entrevistas simuladas con micrófono e histórico de respuestas | ✅ UI lista |

---

## 🚀 Decisiones de Arquitectura

### **Por qué Next.js 16 + Server Components**
- SSR automático para mejor SEO y performance
- Reducción de JavaScript en cliente
- Seguridad: no exposición de secrets

### **Por qué FastAPI**
- Async por defecto → Ideal para llamadas a APIs externas (Groq)
- Documentación automática Swagger
- Validación de esquemas con Pydantic
- Community sólida en Python

### **Por qué Groq LLM**
- Rápido y confiable para prompts estructurados
- Costo-beneficio vs Claude o GPT-4
- Modelo Llama 3.3 70B tiene buena precisión

### **Modularidad Frontend (features/)**
- Escalabilidad: agregar nuevas vistas es predecible
- Testabilidad: cada módulo es independiente
- Reutilización: `PageShell` + `PageHeader` evitan duplicación

---

## 🔌 Próximos Pasos

### **Conectar Backend Real**
```tsx
// Hoy (mock)
import { jobMatches } from '@/src/features/dashboard/data/mock-data'

// Mañana (API real)
const jobMatches = await fetch('/api/v1/jobs', { userId })
```

### **Completar Endpoints AI**
- `POST /api/v1/interview/simulate` → Simulaciones en tiempo real
- `POST /api/v1/skills/recommend-courses` → Recomendaciones de cursos
- `GET /api/v1/mentors/match` → Matching inteligente de mentores

### **Base de Datos**
- Supabase PostgreSQL para perfiles, historiales, conexiones mentor-estudiante
- Redis para caché de análisis y sesiones

### **Autenticación**
- NextAuth v5 para Google SSO
- JWT en backend para autorización de endpoints

---

## 🎓 Autor(es)

Equipo Innovative Minds — Hackathon Xpedition 2026 — Universidad Tecnológica del Perú  
Repositorio: [Omar-Cc/Xpedition-hackaton](https://github.com/Omar-Cc/Xpedition-hackaton)

---

## 📞 Soporte

Para dudas sobre:
- **Frontend**: Ver `/frontend/README.md`
- **Backend**: Ver `/backend/README.md`
- **Arquitectura general**: Abrir issue en este repositorio

---

**EmpléaUTP: Preparando el talento del mañana, hoy.** 🚀
