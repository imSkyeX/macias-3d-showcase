import { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity"; // NUEVO: Importamos urlFor
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";

interface AlbumData {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any; // NUEVO: Cambiamos string por el objeto de imagen completo
}

// Configuración del Grid para pantalla completa (Más columnas en pantallas grandes)
const breakpointColumnsObj = {
  default: 4, // 4 columnas en monitores grandes (Ultra Wide)
  1600: 3,    // 3 columnas en laptops grandes
  1100: 2,    // 2 columnas en tablets/laptops pequeños
  700: 1      // 1 columna en móvil
};

const GraphicsSection = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      // NUEVO: Pedimos el coverImage completo, no solo la URL
      const query = `*[_type == "album"] | order(_createdAt desc) {
        _id,
        title,
        slug, 
        coverImage
      }`;
      const data = await client.fetch(query);
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  return (
    <section className="">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {albums.map((album) => (
          <Link 
            to={`/graficos/${album.slug?.current}`} 
            key={album._id} 
            className="block relative group mb-8" 
          >
            <div className="overflow-hidden rounded-sm relative">
                {/* NUEVO: Usamos urlFor para aplicar el recorte (hotspot) automáticamente */}
                <img 
                  src={album.coverImage ? urlFor(album.coverImage).width(800).url() : ''} 
                  alt={album.title}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
                
                {/* Overlay limpio al pasar el ratón */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <h3 className="text-white text-center text-xl font-bold p-12 group-hover:translate-y-0 transition-transform duration-300">
                      {album.title}
                   </h3>
                </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </section>
  );
};

export default GraphicsSection;