import { useState } from "react";

const Original = () => {
  const [phase, setPhase] = useState("idle"); // idle | thinking | result
  const [selectedHouse, setSelectedHouse] = useState(null);

  const houses = [
    {
      name: "Gryffindor",
      emoji: "🦁",
      border: "border-red-600",
      bg: "bg-red-950",
      badge: "bg-red-600",
      text: "text-red-400",
      description: "Eres valiente, audaz y tienes coraje para enfrentar cualquier desafío. ¡Los más grandes héroes vinieron de aquí!",
    },
    {
      name: "Slytherin",
      emoji: "🐍",
      border: "border-green-600",
      bg: "bg-green-950",
      badge: "bg-green-600",
      text: "text-green-400",
      description: "Eres ambicioso, astuto y sabes exactamente lo que quieres. La grandeza está en tu destino.",
    },
    {
      name: "Hufflepuff",
      emoji: "🦡",
      border: "border-yellow-500",
      bg: "bg-yellow-950",
      badge: "bg-yellow-500 text-gray-900",
      text: "text-yellow-400",
      description: "Eres leal, trabajador y siempre hay para los demás. La casa más noble de Hogwarts.",
    },
    {
      name: "Ravenclaw",
      emoji: "🦅",
      border: "border-blue-600",
      bg: "bg-blue-950",
      badge: "bg-blue-600",
      text: "text-blue-400",
      description: "Eres inteligente, creativo e ingenioso. Tu mente es tu mayor poder.",
    },
  ];

  const handleSort = () => {
    setPhase("thinking");
    setSelectedHouse(null);

    setTimeout(() => {
      const random = houses[Math.floor(Math.random() * houses.length)];
      setSelectedHouse(random);
      setPhase("result");
    }, 3000);
  };

  const handleReset = () => {
    setPhase("idle");
    setSelectedHouse(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-6 pb-20 flex flex-col">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          🎩 Sombrero Seleccionador
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Descubre a qué casa perteneces
        </p>
      </div>

      {/* Fase idle */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          <div className="text-center">
            <div className="text-9xl mb-4">🎩</div>
            <h2 className="text-white text-xl font-bold mb-2">
              ¿Estás listo?
            </h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
              El Sombrero Seleccionador analizará tu espíritu y te asignará la casa que mejor se adapte a ti.
            </p>
          </div>

          <button
            onClick={handleSort}
            className="bg-yellow-400 text-gray-900 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-yellow-300 active:scale-95 transition-all duration-200 shadow-lg shadow-yellow-400/20"
          >
            ✨ ¡Seleccionarme!
          </button>

          {/* Casas disponibles */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {houses.map((house) => (
              <div
                key={house.name}
                className={`rounded-xl border ${house.border} bg-gray-900 p-3 flex items-center gap-2`}
              >
                <span className="text-2xl">{house.emoji}</span>
                <span className={`text-sm font-semibold ${house.text}`}>
                  {house.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fase thinking */}
      {phase === "thinking" && (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <div className="relative">
            <div className="text-9xl animate-bounce">🎩</div>
            <div className="absolute -top-2 -right-2 text-3xl animate-spin">
              ✨
            </div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-ping">
              ⭐
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-yellow-400 text-xl font-bold mb-2">
              El sombrero está pensando...
            </h2>
            <p className="text-gray-400 text-sm">
              Analizando tu espíritu mágico
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full animate-[loading_3s_ease-in-out_forwards]" />
          </div>

          {/* Casas parpadeando */}
          <div className="flex gap-4 text-4xl">
            {houses.map((house, i) => (
              <span
                key={house.name}
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {house.emoji}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fase result */}
      {phase === "result" && selectedHouse && (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">

          {/* Sombrero con emoji de casa */}
          <div className="relative">
            <div className="text-8xl">🎩</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-5xl">
              {selectedHouse.emoji}
            </div>
          </div>

          {/* Card resultado */}
          <div className={`w-full rounded-2xl border-2 ${selectedHouse.border} ${selectedHouse.bg} p-6 text-center mt-4`}>
            <p className="text-gray-300 text-sm mb-2 uppercase tracking-widest">
              Tu casa es
            </p>
            <h2 className={`text-4xl font-bold mb-3 ${selectedHouse.text}`}>
              {selectedHouse.name}
            </h2>
            <span className={`text-sm text-white px-4 py-1 rounded-full ${selectedHouse.badge}`}>
              {selectedHouse.emoji} {selectedHouse.name}
            </span>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              {selectedHouse.description}
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-800 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-700 transition-colors"
            >
              🔄 Intentar de nuevo
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
            >
              ✨ Aceptar casa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Original;