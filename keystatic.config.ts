import { config, fields, collection } from '@keystatic/core';

// Acceso seguro a variables de entorno (funciona en servidor y navegador).
// En el cliente solo se exponen las variables con prefijo PUBLIC_.
const env = (key: string): string | undefined =>
	(import.meta as Record<string, any>).env?.[key];

// Modo GitHub: se activa cuando defines PUBLIC_KEYSTATIC_GITHUB_REPO
// (tu repositorio owner/repo) en el archivo .env. Con esto, al visitar
// /keystatic en desarrollo podrás iniciar sesión con GitHub y seguir el
// asistente, que genera el resto de variables de autenticación.
// Sin el repositorio, se usa modo local (edición directa de archivos).
const repo = env('PUBLIC_KEYSTATIC_GITHUB_REPO');
const isGitHubMode = Boolean(repo);

const heroImageField = fields.image({
	label: 'Imagen principal',
	directory: 'src/assets',
	publicPath: '/src/assets/',
	description: 'Imagen opcional para la entrada. Se guarda en src/assets.',
});

const tagsField = fields.array(fields.text({ label: 'Etiqueta' }), {
	label: 'Etiquetas',
	itemLabel: (props) => props.value || 'Etiqueta',
});

export default config({
	storage: isGitHubMode ? { kind: 'github', repo: repo! as `${string}/${string}` } : { kind: 'local' },
	collections: {
		posts: collection({
			label: 'Blog',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Título', validation: { isRequired: true } },
				}),
				description: fields.text({
					label: 'Descripción',
					multiline: true,
					validation: { isRequired: true },
				}),
				pubDate: fields.date({
					label: 'Fecha de publicación',
					validation: { isRequired: true },
				}),
				updatedDate: fields.date({
					label: 'Fecha de actualización',
					description: 'Opcional. Se muestra si la entrada fue actualizada.',
				}),
				heroImage: heroImageField,
				tags: tagsField,
				content: fields.markdoc({ label: 'Contenido' }),
			},
		}),
		publications: collection({
			label: 'Publicaciones',
			slugField: 'title',
			path: 'src/content/publications/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Título', validation: { isRequired: true } },
				}),
				authors: fields.text({
					label: 'Autores/as',
					validation: { isRequired: true },
				}),
				venue: fields.text({
					label: 'Medio / Revista',
					validation: { isRequired: true },
				}),
				type: fields.select({
					label: 'Tipo',
					options: [
						{ label: 'Artículo de revista', value: 'Artículo de revista' },
						{ label: 'Conferencia', value: 'Conferencia' },
						{ label: 'Capítulo de libro', value: 'Capítulo de libro' },
					],
					defaultValue: 'Artículo de revista',
				}),
				date: fields.date({
					label: 'Fecha de publicación',
					validation: { isRequired: true },
				}),
				description: fields.text({
					label: 'Resumen',
					multiline: true,
				}),
				doi: fields.text({
					label: 'DOI',
					description: 'Opcional. Ej: 10.1234/ejemplo.001',
				}),
				url: fields.url({
					label: 'Enlace',
					description: 'Opcional. Enlace a la versión completa.',
				}),
				featured: fields.checkbox({
					label: 'Destacada',
					description: 'Se muestra en la portada.',
				}),
				content: fields.markdoc({ label: 'Resumen extendido' }),
			},
		}),
		projects: collection({
			label: 'Proyectos',
			slugField: 'title',
			path: 'src/content/projects/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Título', validation: { isRequired: true } },
				}),
				description: fields.text({
					label: 'Descripción breve',
					multiline: true,
					validation: { isRequired: true },
				}),
				startDate: fields.date({
					label: 'Fecha de inicio',
					validation: { isRequired: true },
				}),
				endDate: fields.date({
					label: 'Fecha de fin',
					description: 'Opcional. Vacío si sigue activo.',
				}),
				status: fields.select({
					label: 'Estado',
					options: [
						{ label: 'Activo', value: 'activo' },
						{ label: 'Finalizado', value: 'finalizado' },
						{ label: 'En pausa', value: 'en pausa' },
					],
					defaultValue: 'activo',
				}),
				tags: tagsField,
				heroImage: heroImageField,
				links: fields.object(
					{
						site: fields.url({ label: 'Sitio del proyecto' }),
						github: fields.url({ label: 'Código fuente' }),
						paper: fields.url({ label: 'Publicación relacionada' }),
					},
					{ label: 'Enlaces' },
				),
				featured: fields.checkbox({
					label: 'Destacado',
					description: 'Se muestra en la portada.',
				}),
				content: fields.markdoc({ label: 'Contenido' }),
			},
		}),
		research: collection({
			label: 'Investigación',
			slugField: 'title',
			path: 'src/content/research/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Título', validation: { isRequired: true } },
				}),
				description: fields.text({
					label: 'Descripción breve',
					multiline: true,
					validation: { isRequired: true },
				}),
				startDate: fields.date({
					label: 'Fecha de inicio',
					validation: { isRequired: true },
				}),
				endDate: fields.date({
					label: 'Fecha de fin',
					description: 'Opcional. Vacío si sigue activo.',
				}),
				status: fields.select({
					label: 'Estado',
					options: [
						{ label: 'Activo', value: 'activo' },
						{ label: 'Finalizado', value: 'finalizado' },
						{ label: 'En pausa', value: 'en pausa' },
					],
					defaultValue: 'activo',
				}),
				tags: tagsField,
				heroImage: heroImageField,
				links: fields.object(
					{
						site: fields.url({ label: 'Sitio del proyecto' }),
						github: fields.url({ label: 'Código fuente' }),
						paper: fields.url({ label: 'Publicación relacionada' }),
					},
					{ label: 'Enlaces' },
				),
				featured: fields.checkbox({
					label: 'Destacado',
					description: 'Se muestra en la portada.',
				}),
				content: fields.markdoc({ label: 'Contenido' }),
			},
		}),
		videos: collection({
			label: 'Videos',
			slugField: 'title',
			path: 'src/content/videos/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Título', validation: { isRequired: true } },
				}),
				description: fields.text({
					label: 'Descripción',
					multiline: true,
					validation: { isRequired: true },
				}),
				date: fields.date({
					label: 'Fecha',
					validation: { isRequired: true },
				}),
				url: fields.url({
					label: 'Enlace del video',
					description: 'URL de YouTube. Ej: https://www.youtube.com/watch?v=XXXX',
					validation: { isRequired: true },
				}),
				duration: fields.text({
					label: 'Duración',
					description: 'Opcional. Ej: 45:12',
				}),
				tags: tagsField,
				featured: fields.checkbox({
					label: 'Destacado',
					description: 'Se muestra en la portada.',
				}),
				content: fields.markdoc({ label: 'Descripción extendida' }),
			},
		}),
	},
});