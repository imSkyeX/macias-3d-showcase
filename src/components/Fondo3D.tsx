import Spline from '@splinetool/react-spline';

export default function Fondo3D() {
  return (
    // Quitamos 'z-[-1]' temporalmente y ponemos 'z-0' para ver si es un problema de capas.
    // Quitamos 'pointer-events-none' para que puedas probar si reacciona al mouse.
    <div className="fixed inset-0 w-full h-full z-0">
      <Spline scene="https://prod.spline.design/XpthAcuM6ezUVpXO/scene.splinecode" />
    </div>
  );
}