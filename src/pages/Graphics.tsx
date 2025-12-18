import UcaPracticesGrid from "@/components/UcaPracticesGrid";

const Graphics = () => {
  return (
    <div className="min-h-screen  bg-white/5 backdrop-blur-xl pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Gráficos y <span className="text-[#ff9500]">Prácticas</span>
        </h1>
        <div className="bg-[#1e1e1e]/50 p-6 rounded-2xl">
            <UcaPracticesGrid />
        </div>
      </div>
    </div>
  );
};

export default Graphics;