# Portafolio académico (Astro + Keystatic + Cloudflare Pages)

Portafolio académico de una profesora universitaria: publicaciones, proyectos, videos y blog.
Sitio estático construido con [Astro](https://astro.build), contenido gestionado con
[Keystatic](https://keystatic.com) (CMS headless basado en Git) y desplegado en
[Cloudflare Pages](https://pages.cloudflare.com) a través de GitHub.

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

1. Sube el proyecto a un repositorio de GitHub.
2. Crea un archivo `.env` a partir de `.env.example` y define
   `PUBLIC_KEYSTATIC_GITHUB_REPO=tu-usuario/tu-repositorio`.
3. Con `pnpm dev` en marcha, entra a `/keystatic`, pulsa **Login with GitHub** y sigue el
   asistente (crea la GitHub App y la instala en tu repositorio). Keystatic generará las
   variables de autenticación en tu `.env`.
4. Guarda y publica contenido desde el panel: Keystatic crea commits en el repositorio.
5. Al hacer push a `main`, el workflow de GitHub Actions despliega el sitio en Cloudflare Pages.

> El panel solo se activa en desarrollo. El build de producción (`pnpm build`) genera un
> sitio 100% estático sin el CMS.

## Despliegue en Cloudflare Pages

### Opción A: GitHub Actions (incluida)

El repositorio incluye `.github/workflows/deploy.yml` que compila y despliega en cada push a `main`.

1. Crea un proyecto Pages en Cloudflare (por ejemplo `modelo-portfolio`), sin conectar aún a Git.
2. Añade dos **Secretos** en el repositorio (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN` — token de la API de Cloudflare (dashboard → My Profile → API Tokens).
   - `CLOUDFLARE_ACCOUNT_ID` — ID de tu cuenta Cloudflare.
3. Ajusta `--project-name` en el workflow si tu proyecto se llama distinto.
4. Haz push a `main`: el sitio queda disponible en `https://<proyecto>.pages.dev`.

### Opción B: integración nativa de Cloudflare Pages

En Cloudflare → Pages → **Create a project** → conectar el repositorio de GitHub:

- Framework preset: **Astro**
- Build command: `pnpm build`
- Output directory: `dist`

Ambas opciones generan el mismo resultado. La opción A es más transparente (CI visible en
GitHub Actions).

## Personalización

- Datos personales (nombre, universidad, correo, enlaces): `src/consts.ts`.
- URLs (ORCID, Google Scholar, GitHub): `src/consts.ts`.
- `site` (dominio canónico): `astro.config.mjs`.
- Nombre del proyecto Pages en el workflow: `.github/workflows/deploy.yml`.

## Comandos

| Comando             | Acción                                      |
| :------------------ | :------------------------------------------ |
| `pnpm install`      | Instala dependencias                        |
| `pnpm dev`          | Servidor de desarrollo en `localhost:4321`  |
| `pnpm build`        | Compila el sitio estático en `./dist/`      |
| `pnpm preview`      | Previsualiza el build en local              |