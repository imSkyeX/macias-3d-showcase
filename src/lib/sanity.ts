import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // 1. Añadimos esta importación

export const client = createClient({
  projectId: 'uqpxp5af', // (Deja los datos que ya tengas aquí)
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// 2. Añadimos estas líneas al final del archivo
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}