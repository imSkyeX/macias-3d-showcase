import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'uqpxp5af', // <--- ¡PÉGALO AQUÍ! (ej: 'z4x8k9lp')
  dataset: 'production', // Lo normal es 'production'
  useCdn: true, // true hace que vaya super rápido
  apiVersion: '2023-05-03', // Fecha de versión, déjala así
})