import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos 3D',
  type: 'document',
  fields: [
    // 1. TÍTULO
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // 2. SLUG (URL)
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // 3. DESCRIPCIÓN CORTA
    defineField({
      name: 'description',
      title: 'Descripción General',
      type: 'text',
      rows: 3,
    }),

    // --- NUEVO: DESTACADO PARA CARRUSEL ---
    defineField({
      name: 'isFeatured',
      title: '¿Destacar en Carrusel?',
      type: 'boolean',
      initialValue: false,
      description: 'Activa esto para que aparezca en el slider grande al inicio.',
    }),

    defineField({
      name: 'featuredImage',
      title: 'Imagen de Cabecera (HD)',
      type: 'image',
      description: 'Imagen panorámica para el carrusel (1920x1080 recomendado).',
      options: { hotspot: true },
      hidden: ({ document }) => !document?.isFeatured, // Solo se ve si activas el switch anterior
    }),
    // ---------------------------------------

    // 4. CATEGORÍA (Para los filtros)
    defineField({
      name: 'category',
      title: 'Categoría CATIA',
      type: 'string',
      description: 'Selecciona el módulo principal para organizar la web',
      options: {
        list: [
          { title: 'Part Design (Mecánica)', value: 'Part Design' },
          { title: 'Generative Shape Design (Superficies)', value: 'Generative Shape Design' },
          { title: 'Module Assembly (Ensamblajes)', value: 'Module Assembly' },
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required(),
    }),

    // 5. HERRAMIENTAS (Array de Strings)
    defineField({
      name: 'tools',
      title: 'Herramientas Utilizadas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),

    // 6. ESPECIFICACIONES (Array de Strings)
    defineField({
      name: 'specifications',
      title: 'Especificaciones Técnicas',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    // 7. DESAFÍOS (Texto largo)
    defineField({
      name: 'challenges',
      title: 'Desafíos del Proyecto',
      type: 'text',
    }),

    // 8. ARCHIVO 3D (.glb)
    defineField({
      name: 'model3d',
      title: 'Archivo 3D (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
    }),

    // 9. IMAGEN PRINCIPAL (Para la Card pequeña)
    defineField({
      name: 'mainImage',
      title: 'Imagen de Portada (Card)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})