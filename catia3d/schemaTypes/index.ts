import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
// Importamos tu nuevo archivo
import project from './project' 

import album from './album'     // <--- AÑADE ESTO


// FUSIONAMOS TODO EN UN SOLO ARRAY
export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  project, // <--- Aquí añadimos el nuevo, todo junto
  album, // <--- AÑADE ESTO A LA LISTA
]