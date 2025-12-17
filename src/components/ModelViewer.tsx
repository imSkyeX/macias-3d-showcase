import React, { Suspense, useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- ICONOS ---
const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const IconMaximize = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IconMinimize = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IconCut = ({ axis }: { axis: ClippingAxis }) => (
  <div className="relative flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
    {axis && <span className="absolute -bottom-2 -right-2 text-[10px] font-black bg-white text-black border border-gray-300 rounded px-1 leading-none shadow-sm">{axis.toUpperCase()}</span>}
  </div>
);

// --- TIPOS Y CONFIG ---
type ClippingAxis = 'x' | 'y' | 'z' | null;

const PLANES = {
  x: new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
  y: new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  z: new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
};

function ClippingSetup() {
  const { gl } = useThree();
  useEffect(() => { gl.localClippingEnabled = true; }, [gl]);
  return null;
}

// --- NUEVO COMPONENTE: CameraHandler ---
// Este componente mide la escena y posiciona la cámara instantáneamente
function CameraHandler() {
  const { camera, scene, controls } = useThree();
  
  useLayoutEffect(() => {
    // 1. Calculamos la caja que envuelve todo el modelo (Bounding Box)
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size); // Obtenemos las dimensiones (ancho, alto, profundo)
    const center = new THREE.Vector3();
    box.getCenter(center); // Obtenemos el punto central exacto

    // 2. Encontramos la dimensión más grande (para que quepa todo)
    const maxSize = Math.max(size.x, size.y, size.z);
    
    // 3. Calculamos la distancia necesaria usando trigonometría básica (FOV)
    // El 1.5 es un factor de margen para que la pieza no toque los bordes de la pantalla
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * (camera as THREE.PerspectiveCamera).fov) / 360));
    const fitWidthDistance = fitHeightDistance / (camera as THREE.PerspectiveCamera).aspect;
    const distance = 1.5 * Math.max(fitHeightDistance, fitWidthDistance);

    // 4. Movemos la cámara instantáneamente
    // La colocamos en diagonal (isométrica) relativa al centro
    const direction = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(distance);
    camera.position.copy(center).add(direction);
    
    // 5. Apuntamos la cámara y los controles al centro de la pieza
    camera.lookAt(center);
    if (controls) {
      (controls as any).target.copy(center);
      (controls as any).update();
    }
  }, [camera, scene, controls]);

  return null;
}

function TechnicalPart({ mesh, isDark, clippingAxis }: { mesh: THREE.Mesh, isDark: boolean, clippingAxis: ClippingAxis }) {
  const activePlanes = useMemo(() => clippingAxis ? [PLANES[clippingAxis]] : [], [clippingAxis]);

  const techMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: isDark ? "#5f6b7c" : "#dcebc0",
    roughness: 0.8,
    metalness: 0.1,
    flatShading: false,
    clippingPlanes: activePlanes,
    clipShadows: true,
  }), [isDark, activePlanes]);

  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(mesh.geometry, 0), [mesh.geometry]);
  
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ 
    color: isDark ? "#ffffff" : "#000000",
    linewidth: 1,
    opacity: 0.5,
    transparent: true,
    clippingPlanes: activePlanes,
  }), [isDark, activePlanes]);

  return (
    <group position={mesh.position} rotation={mesh.rotation} scale={mesh.scale}>
      <mesh geometry={mesh.geometry} material={techMaterial} />
      <lineSegments geometry={edgesGeometry} material={lineMaterial} />
    </group>
  );
}

interface ModelProps {
  url: string;
  isTechnical: boolean;
  isDark: boolean;
  clippingAxis: ClippingAxis;
}

function Model({ url, isTechnical, isDark, clippingAxis }: ModelProps) {
  const { scene } = useGLTF(url) as any;
  const meshes = useMemo(() => {
    const found: THREE.Mesh[] = [];
    scene.traverse((child: any) => { if (child.isMesh) found.push(child); });
    return found;
  }, [scene]);

  useLayoutEffect(() => {
    if (!isTechnical) {
      const activePlanes = clippingAxis ? [PLANES[clippingAxis]] : null;
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat: THREE.Material) => {
            mat.clippingPlanes = activePlanes;
            mat.needsUpdate = true;
          });
        }
      });
    }
  }, [scene, isTechnical, clippingAxis]);

  if (isTechnical) {
    return (
      <group>
        {meshes.map((mesh) => (
          <TechnicalPart key={mesh.uuid} mesh={mesh} isDark={isDark} clippingAxis={clippingAxis} />
        ))}
      </group>
    );
  }
  return <primitive object={scene} />;
}

interface ModelViewerProps {
  modelPath?: string;
  className?: string;
}

const ModelViewer = ({ modelPath, className }: ModelViewerProps) => {
  const finalPath = modelPath || '/models/pieza1.glb';
  
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTechnical, setIsTechnical] = useState(true);
  const [clippingAxis, setClippingAxis] = useState<ClippingAxis>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const cycleClipping = () => {
    setClippingAxis(current => {
      if (current === null) return 'x';
      if (current === 'x') return 'y';
      if (current === 'y') return 'z';
      return null;
    });
  };

  const bgColor = isDark 
    ? 'linear-gradient(to bottom, #3a4352, #2b323b)' 
    : 'linear-gradient(to bottom, #f0f4f8, #dce5f0)';
  
  const uiColor = isDark ? 'text-white bg-gray-800/90 hover:bg-gray-700' : 'text-gray-800 bg-white/90 hover:bg-gray-100';
  const activeColor = isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full transition-all duration-300 ${isFullscreen ? 'h-screen fixed top-0 left-0 z-50 rounded-none' : `h-96 rounded-2xl ${className}`}`}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2 items-center">
        <button onClick={() => setIsTechnical(!isTechnical)} className={`px-3 py-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors text-xs font-bold uppercase tracking-wider ${uiColor}`}>
          {isTechnical ? "CAD View" : "Realistic"}
        </button>
        <div className="h-6 w-px bg-gray-400/30 mx-1"></div>
        <button onClick={cycleClipping} className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${clippingAxis ? activeColor : uiColor}`} title="Ciclar Corte">
          <IconCut axis={clippingAxis} />
        </button>
        <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${uiColor}`}>
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
        <button onClick={toggleFullscreen} className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${uiColor}`}>
          {isFullscreen ? <IconMinimize /> : <IconMaximize />}
        </button>
      </div>

      {/* NO ponemos posición inicial a la cámara, dejamos que CameraHandler se encargue */}
      <Canvas dpr={[1, 2]} shadows style={{ background: bgColor }}>
        <ClippingSetup />
        <Suspense fallback={null}>
          <Stage 
            environment={isDark ? "studio" : "city"} 
            intensity={isDark ? 0.5 : 0.6} 
            shadows={false}
            adjustCamera={false} // Desactivamos el ajuste de Stage
          >
            <Model url={finalPath} isTechnical={isTechnical} isDark={isDark} clippingAxis={clippingAxis} />
          </Stage>
          
          <ContactShadows position={[0, -0.001, 0]} opacity={isDark ? 0.4 : 0.3} scale={10} blur={isDark ? 2 : 3} far={4} resolution={256} color={isDark ? "#000000" : "#6b7a8f"} />
          
          <OrbitControls 
            key={isFullscreen ? 'full' : 'window'} 
            makeDefault 
            enablePan={true} 
            enableZoom={true} 
          />

          {/* ESTO HACE LA MAGIA DEL ENCUADRE */}
          <CameraHandler />

        </Suspense>
      </Canvas>

      <div className={`absolute bottom-4 left-4 flex gap-2 pointer-events-none`}>
         <div className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm transition-colors ${uiColor}`}>
          {isTechnical ? 'Technical Wireframe' : 'Realistic View'}
         </div>
         {clippingAxis && (
           <div className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm bg-red-500/80 text-white animate-pulse`}>
             Corte Eje {clippingAxis.toUpperCase()}
           </div>
         )}
      </div>
    </div>
  );
};

export default ModelViewer;