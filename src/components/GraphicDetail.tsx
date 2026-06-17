import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "@/lib/sanity";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
// Importamos la librería mágica
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

interface GalleryItem {
  _key: string;
  _type: 'image' | 'file';
  url: string;
  caption?: string;
}

interface AlbumData {
  title: string;
  description?: string;
  gallery: GalleryItem[];
}

const GraphicDetail = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Referencia para controlar el zoom desde fuera (resetearlo al cambiar foto)
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAlbum = async () => {
      const query = `*[_type == "album" && slug.current == $slug][0]{
        title,
        description,
        gallery[]{
          _key,
          _type, 
          "url": asset->url,
          caption
        }
      }`;
      const data = await client.fetch(query, { slug });
      setAlbum(data);
    };
    fetchAlbum();
  }, [slug]);

  // Resetear el zoom cada vez que cambiamos de imagen
  useEffect(() => {
    if (transformComponentRef.current) {
      transformComponentRef.current.resetTransform();
    }
  }, [currentImageIndex]);

  const nextItem = () => {
    if (!album?.gallery) return;
    setCurrentImageIndex((prev) => prev === album.gallery.length - 1 ? 0 : prev + 1);
  };

  const prevItem = () => {
    if (!album?.gallery) return;
    setCurrentImageIndex((prev) => prev === 0 ? album.gallery.length - 1 : prev - 1);
  };

  if (!album) return <div className="h-screen bg-[#050505] flex items-center justify-center text-white">Cargando...</div>;

  const item = album.gallery?.[currentImageIndex];
  const isVideo = item?._type === 'file' || (item?.url && item.url.match(/\.(mp4|webm|mov|m4v)$/i));

  return (
    <div className="h-screen w-full bg-[#050505] flex flex-col relative overflow-hidden">
        
        {/* HEADER FLOTANTE (Fijo arriba) */}
        {/* pointer-events-none para que el header no bloquee el zoom si pasas el ratón por encima, pero pointer-events-auto en los botones */}
        <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
            <Link to="/graficos" className="flex items-center gap-2 p-4 bg-orange-400 rounded-2xl text-white hover:text-white transition-colors group pointer-events-auto">
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform"/>
            </Link>
            
            <div className="text-right hidden md:block">
                <h1 className="text-white text-xl font-bold uppercase tracking-wider">{album.title}</h1>
                <p className="text-white/40 text-xs mt-1">{currentImageIndex + 1} / {album.gallery?.length}</p>
            </div>
        </div>

        {/* ÁREA PRINCIPAL (VISOR) */}
        <div className="flex-1 w-full h-full relative bg-[#050505]">
            {item ? (
                <TransformWrapper
                    ref={transformComponentRef}
                    initialScale={1}
                    minScale={1}
                    // AQUÍ ESTÁ LA MAGIA: 50 significa un zoom del 5000%. 
                    // Prácticamente "sin límite" para el ojo humano.
                    maxScale={50} 
                    centerOnInit={true}
                    wheel={{ step: 2 }} // Lo subimos a 0.2 para que el zoom con rueda sea más rápido
                    pinch={{ disabled: false }}
                    doubleClick={{ disabled: true }}
                    panning={{ velocityDisabled: false }}
                >
                    {({ zoomIn, zoomOut }) => ( // Quitamos resetTransform de aquí
                        <>
                            {/* COMPONENTE TRANSFORMABLE */}
                            <TransformComponent
                                wrapperClass="!w-full !h-full"
                                contentClass="!w-full !h-full flex items-center justify-center"
                            >
                                {isVideo ? (
                                     <video 
                                        src={item.url}
                                        className="max-w-full max-h-[85vh] shadow-2xl"
                                        controls autoPlay loop playsInline
                                     />
                                ) : (
                                     <img 
                                          src={item.url}
                                          alt={item.caption || album.title}
                                          className="max-w-full max-h-[85vh] w-auto h-auto object-contain shadow-2xl cursor-grab active:cursor-grabbing"
                                     />
                                )}
                            </TransformComponent>

                            {/* CONTROLES DE NAVEGACIÓN (FLECHAS) */}
                            {album.gallery.length > 1 && (
                                <>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); prevItem(); }} 
                                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-40 hidden md:block"
                                    >
                                        <ChevronLeft size={48} strokeWidth={1}/>
                                    </button>
                                    
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); nextItem(); }} 
                                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-40 hidden md:block"
                                    >
                                        <ChevronRight size={48} strokeWidth={1}/>
                                    </button>

                                    {/* Zonas táctiles invisibles para móvil */}
                                    <div className="md:hidden absolute inset-y-0 left-0 w-[15%] z-30" onClick={(e) => { e.stopPropagation(); prevItem(); }} />
                                    <div className="md:hidden absolute inset-y-0 right-0 w-[15%] z-30" onClick={(e) => { e.stopPropagation(); nextItem(); }} />
                                </>
                            )}
                            
                            {/* PIE DE PÁGINA */}
                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none z-40">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    key={currentImageIndex}
                                    className="border-l-2 border-orange-500 pl-4 bg-black/20 backdrop-blur-sm p-2 rounded-r-md"
                                >
                                    <h2 className="text-white text-2xl font-bold md:hidden drop-shadow-md">{album.title}</h2>
                                    {item.caption && (
                                        <p className="text-white/90 text-sm italic font-serif mt-1 max-w-md drop-shadow-md">
                                            "{item.caption}"
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                        </>
                    )}
                </TransformWrapper>
            ) : (
                <div className="flex items-center justify-center h-full text-white/40">Imagen no encontrada</div>
            )}
        </div>
    </div>
  );
};

export default GraphicDetail;