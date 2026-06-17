
import React, { Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Box, GitMerge } from 'lucide-react';

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

// --- TIPOS ---
type ClippingAxis = 'x' | 'y' | 'z' | null;

// --- CONFIGURACIÓN DE CLIPPING GOBAL ---
function ClippingSetup() {
  const { gl } = useThree();
  useEffect(() => { 
    gl.localClippingEnabled = true; 
  }, [gl]);
  return null;
}

// --- MANEJADOR DE CÁMARA AUTOFIT ---
function CameraHandler() {
  const { camera, scene, controls } = useThree();

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const maxSize = Math.max(size.x, size.y, size.z);
    if (maxSize === 0) return;

    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * (camera as THREE.PerspectiveCamera).fov) / 360));
    const fitWidthDistance = fitHeightDistance / (camera as THREE.PerspectiveCamera).aspect;
    const distance = 1.5 * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(distance);
    camera.position.copy(center).add(direction);
    camera.lookAt(center);
    
    if (controls) {
      (controls as any).target.copy(center);
      (controls as any).update();
    }
  }, [camera, scene, controls]);

  return null;
}

// --- COMPONENTE DEL MODELO ---
interface ModelProps {
  url: string;
  clippingAxis: ClippingAxis;
  clipPercentage: number;
}

function Model({ url, clippingAxis, clipPercentage }: ModelProps) {
  const { scene } = useGLTF(url) as any;
  const clipPlane = useMemo(() => new THREE.Plane(), []);

  useLayoutEffect(() => {
    // Si no hay corte activo, limpiamos los planos
    if (!clippingAxis) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat: THREE.Material) => {
            mat.clippingPlanes = null;
            mat.needsUpdate = true;
          });
        }
      });
      return;
    }

    // Cálculo de la caja delimitadora (Bounding Box)
    const box = new THREE.Box3().setFromObject(scene);
    let min = 0; 
    let max = 0;

    if (clippingAxis === 'x') { 
      min = box.min.x; max = box.max.x; clipPlane.normal.set(-1, 0, 0); 
    } else if (clippingAxis === 'y') { 
      min = box.min.y; max = box.max.y; clipPlane.normal.set(0, -1, 0); 
    } else if (clippingAxis === 'z') { 
      min = box.min.z; max = box.max.z; clipPlane.normal.set(0, 0, -1); 
    }

    const targetValue = min + (max - min) * (clipPercentage / 100);
    clipPlane.constant = targetValue;

    // Aplicar plano de corte
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat: THREE.Material) => {
          mat.clippingPlanes = [clipPlane];
          mat.needsUpdate = true;
        });
      }
    });
  }, [scene, clippingAxis, clipPercentage, clipPlane]);

  return <primitive key={url} object={scene} />;
}

// --- VISOR PRINCIPAL ---
interface ModelViewerProps {
  modelUrl?: string;
  explodedModelUrl?: string;
  hasExplodedView?: boolean;
  className?: string;
}

const ModelViewer = ({ modelUrl, explodedModelUrl, hasExplodedView, className }: ModelViewerProps) => {
  // Estados de visualización
  const [showExploded, setShowExploded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estados de corte
  const [clippingAxis, setClippingAxis] = useState<ClippingAxis>(null);
  const [clipPercentage, setClipPercentage] = useState(50);

  // Lógica de rutas
  const finalPath = (showExploded && explodedModelUrl) ? explodedModelUrl : (modelUrl || '/models/pieza1.glb');

  const cycleClipping = () => {
    setClippingAxis(current => {
      if (current === null) return 'x';
      if (current === 'x') return 'y';
      if (current === 'y') return 'z';
      return null;
    });
    setClipPercentage(50);
  };

  // Estilos dinámicos
  const bgColor = isDark 
    ? 'linear-gradient(to bottom, #3a4352, #2b323b)' 
    : 'linear-gradient(to bottom, #f0f4f8, #dce5f0)';
  
  const uiColor = isDark 
    ? 'text-white bg-gray-800/90 hover:bg-gray-700' 
    : 'text-gray-800 bg-white/90 hover:bg-gray-100';
    
  const activeColor = isDark 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'bg-blue-500 text-white hover:bg-blue-600';

  const ViewerContent = (
    <div className="relative w-full h-full flex flex-col">
      
      {/* BOTÓN DE ENSAMBLADO / EXPLOSIONADO */}
      {hasExplodedView && (
        <div className="absolute top-6 left-6 z-50 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-lg">
          <button
            onClick={() => setShowExploded(false)}
            className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-all ${!showExploded ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
            title="Ver Ensamblado"
          >
            <Box className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Assembly</span>
          </button>
          <button
            onClick={() => setShowExploded(true)}
            className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-all ${showExploded ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
            title="Ver Explosionado"
          >
            <GitMerge className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Exploded</span>
          </button>
        </div>
      )}

      {/* BOTONES SUPERIORES (Derecha) */}
      <div className="absolute top-4 right-4 z-50 flex gap-2 items-center">
        <button onClick={cycleClipping} className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${clippingAxis ? activeColor : uiColor}`} title="Ciclar Corte">
          <IconCut axis={clippingAxis} />
        </button>
        <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${uiColor}`}>
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)} 
          className={`p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors ${uiColor}`}
        >
          {isFullscreen ? <IconMinimize /> : <IconMaximize />}
        </button>
      </div>

      {/* SLIDER DE CORTE */}
      {clippingAxis && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-64 max-w-[80%] flex flex-col items-center gap-2 animate-fadeIn">
          <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg uppercase tracking-widest ${uiColor}`}>
            Corte Eje {clippingAxis.toUpperCase()}: {clipPercentage}%
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={clipPercentage}
            onChange={(e) => setClipPercentage(Number(e.target.value))}
            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer backdrop-blur-sm accent-orange-500 hover:accent-orange-400 transition-all shadow-inner"
          />
        </div>
      )}

      <Canvas dpr={[1, 2]} shadows style={{ background: bgColor }} className="flex-1">
        <ClippingSetup />
        <Suspense fallback={null}>
          <Stage
            environment={isDark ? "studio" : "city"}
            intensity={isDark ? 0.5 : 0.6}
            shadows={false}
            adjustCamera={false}
          >
            <Model url={finalPath} clippingAxis={clippingAxis} clipPercentage={clipPercentage} />
          </Stage>
          <ContactShadows position={[0, -0.001, 0]} opacity={isDark ? 0.4 : 0.3} scale={10} blur={isDark ? 2 : 3} far={4} resolution={256} color={isDark ? "#000000" : "#6b7a8f"} />
          <OrbitControls makeDefault enablePan={true} enableZoom={true} />
          <CameraHandler />
        </Suspense>
      </Canvas>

      {/* ETIQUETA INFERIOR */}
      <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none z-40">
        <div className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm transition-colors ${uiColor} uppercase tracking-widest`}>
          VIEWER 3D
        </div>
      </div>
    </div>
  );

  // Renderizado en Portal si está en pantalla completa
  if (isFullscreen) {
    return createPortal(
      <div className="fixed inset-0 w-screen h-[100dvh] z-[99999] bg-black">
        {ViewerContent}
      </div>,
      document.body
    );
  }

  // Renderizado normal
  return (
    <div className={`relative w-full h-96 rounded-2xl overflow-hidden ${className || ''}`}>
      {ViewerContent}
    </div>
  );
};

export default ModelViewer;
