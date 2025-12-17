import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos 3D',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: 'Descripción General',
      type: 'text',
    }),
    // --- CAMPOS NUEVOS PARA QUE COINCIDA CON TU DISEÑO ---
    defineField({
      name: 'tools',
      title: 'Herramientas Utilizadas',
      type: 'array',
      of: [{ type: 'string' }], // Una lista de textos
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'specifications',
      title: 'Especificaciones Técnicas',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'challenges',
      title: 'Desafíos del Proyecto',
      type: 'text',
    }),
    // ----------------------------------------------------
    defineField({
      name: 'model3d',
      title: 'Archivo 3D (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Portada (Card)',
      type: 'image',
      options: {
        hotspot: true, // Permite recortar la imagen si hace falta
      },
    }),
  ],
})