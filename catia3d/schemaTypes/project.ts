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

    // --- DESTACADO PARA CARRUSEL ---
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
      hidden: ({ document }) => !document?.isFeatured, 
    }),
    // ---------------------------------------

    // 4. CATEGORÍA (Para los filtros)
   defineField({
      name: 'category',
      title: 'Software 3D',
      type: 'string',
      description: 'Selecciona el software principal utilizado',
      options: {
        list: [
          { title: 'CATIA V5', value: 'CATIA V5' },
          { title: 'SolidWorks', value: 'SolidWorks' },
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

    // 8. ARCHIVO 3D (.glb) - ENSAMBLADO NORMAL
    defineField({
      name: 'model3d',
      title: 'Archivo 3D Ensamblado (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
      description: 'Sube aquí el modelo completo (cerrado/ensamblado).',
    }),

    // --- NUEVO: LÓGICA DE EXPLOSIONADO ---
    defineField({
      name: 'hasExplodedView',
      title: '¿Tiene vista explosionada?',
      type: 'boolean',
      initialValue: false,
      description: 'Activa esto si has exportado una versión explosionada de este ensamblaje.',
    }),

    defineField({
      name: 'explodedModel3d',
      title: 'Archivo 3D Explosionado (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
      description: 'Sube aquí el modelo con las piezas separadas.',
      hidden: ({ document }) => !document?.hasExplodedView, // Magia: se oculta si es false
    }),
    // ------------------------------------

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