# Portafolio académico (Astro + Keystatic + Cloudflare Workers)

Portafolio académico de una profesora universitaria: publicaciones, proyectos, videos y blog.
Sitio construido con [Astro](https://astro.build), contenido gestionado con
[Keystatic](https://keystatic.com) (CMS headless basado en Git) y desplegado en
[Cloudflare Workers](https://developers.cloudflare.com/workers/).

Las páginas de contenido se prerenderizan de forma estática y el panel del CMS
(`/keystatic`) se renderiza en servidor, por lo que está disponible en producción.

## Estructura de contenido

Las colecciones se definen en `src/content/` y se tipan en `src/content.config.ts`:

| Colección      | Carpeta                    | Contenido                          |
| :------------- | :------------------------- | :--------------------------------- |
| `blog`         | `src/content/blog/`        | Entradas del blog (`.mdoc`)        |
| `publications` | `src/content/publications/`| Artículos, conferencias, capítulos |
| `projects`     | `src/content/projects/`    | Proyectos de investigación/docencia|
| `videos`       | `src/content/videos/`      | Videos (YouTube)                   |

El esquema editable del CMS está en `keystatic.config.ts`.

## Desarrollo

```sh
pnpm install
pnpm dev
```

- Sitio: <http://localhost:4321>
- Panel del CMS: <http://localhost:4321/keystatic>

### Usar el CMS con GitHub

El CMS necesita una GitHub App para autenticarse y guardar el contenido como commits.

1. Crea un archivo `.env` a partir de `.env.example` y define
   `PUBLIC_KEYSTATIC_GITHUB_REPO=tu-usuario/tu-repositorio`.
2. Con `pnpm dev` en marcha, entra a `/keystatic`, pulsa **Login with GitHub** y sigue el
   asistente (crea la GitHub App y la instala en tu repositorio). Keystatic generará las
   variables de autenticación (`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`,
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`) en tu `.env`.
3. Añade a la GitHub App la URL de callback de producción (GitHub → Settings → Developer
   settings → GitHub Apps → tu app → Callback URL):
   `https://<tu-worker>.workers.dev/api/keystatic/github/oauth/callback`.
4. Copia esas mismas variables a Cloudflare (ver siguiente sección).
5. Guarda y publica contenido desde el panel: Keystatic crea commits en el repositorio y
   Cloudflare redepliega automáticamente.

## Despliegue en Cloudflare Workers

El proyecto usa Workers Builds (integración nativa con Git). En Cloudflare, el proyecto se
conecta al repositorio con **build command** `pnpm build` y **deploy command** `npx wrangler deploy`.

Variables de entorno en Cloudflare:

1. **Build variables** (Settings → Build → Build variables and secrets), disponibles en `astro build`:
   - `PUBLIC_KEYSTATIC_GITHUB_REPO`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
2. **Runtime secrets** (Settings → Variables & Secrets), leídas por la API de Keystatic:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` (mínimo 32 caracteres)

Configuración del Worker en `wrangler.jsonc` (nombre, `compatibility_date` y
`compatibility_flags`).

## Personalización

- Datos personales (nombre, universidad, correo, enlaces): `src/consts.ts`.
- URLs (ORCID, Google Scholar, GitHub): `src/consts.ts`.
- `site` (dominio canónico): `astro.config.mjs`.
- Configuración del Worker (nombre, flags): `wrangler.jsonc`.

## Comandos

| Comando             | Acción                                      |
| :------------------ | :------------------------------------------ |
| `pnpm install`      | Instala dependencias                        |
| `pnpm dev`          | Servidor de desarrollo en `localhost:4321`  |
| `pnpm build`        | Prerenderiza las páginas y compila el worker SSR en `./dist/` |
| `pnpm preview`      | Previsualiza el build en local              |