import { defineField, defineType } from 'sanity'
import { ImagesIcon, PlayIcon } from '@sanity/icons' // Importamos icono de Play

export default defineType({
  name: 'album',
  title: 'Álbumes Gráficos',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Álbum',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL del proyecto)',
      type: 'slug',
      options: {
        source: 'title', // Genera el link automáticamente basado en el título
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 2,
    }),
    // PORTADA: Seguimos usando una imagen estática para el Grid (es más rápido y estético)
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada (Grid)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    
    // GALERÍA MIXTA: Aquí es donde cambiamos la lógica
    defineField({
      name: 'gallery',
      title: 'Contenido del Álbum (Fotos y Vídeos)',
      type: 'array',
      of: [
        // OPCIÓN 1: IMAGEN
        {
          type: 'image',
          title: 'Imagen',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Descripción',
            },
          ],
        },
        // OPCIÓN 2: VÍDEO (Usamos 'file' para subir mp4 directamente)
        {
          type: 'file',
          name: 'video',
          title: 'Vídeo',
          icon: PlayIcon,
          options: {
            accept: 'video/mp4,video/x-m4v,video/*,image/gif', // Filtro para solo vídeos
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Descripción del vídeo',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})