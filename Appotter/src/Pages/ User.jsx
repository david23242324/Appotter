import { useState } from "react";

const User = () => {
  const [name, setName] = useState("Estudiante");
  const [house, setHouse] = useState("Gryffindor");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

  const houseStyles = {
    Gryffindor: { border: "border-red-600", bg: "bg-red-950", badge: "bg-red-600", emoji: "🦁" },
    Slytherin:  { border: "border-green-600", bg: "bg-green-950", badge: "bg-green-600", emoji: "🐍" },
    Hufflepuff: { border: "border-yellow-500", bg: "bg-yellow-950", badge: "bg-yellow-500 text-gray-900", emoji: "🦡" },
    Ravenclaw:  { border: "border-blue-600", bg: "bg-blue-950", badge: "bg-blue-600", emoji: "🦅" },
  };

  const stats = [
    { label: "Casa",       value: house,        emoji: "🏰" },
    { label: "Rol",        value: "Estudiante",  emoji: "🧑‍🎓" },
    { label: "Año",        value: "7mo Año",     emoji: "📅" },
    { label: "Estado",     value: "Activo",      emoji: "✅" },
  ];

  const style = houseStyles[house];

  const handleSave = () => {
    setName(tempName || "Estudiante");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-6 pb-20">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          👤 Usuario
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Tu perfil mágico
        </p>
      </div>

      {/* Card perfil */}
      <div className={`rounded-2xl border-2 ${style.border} ${style.bg} p-5 mb-6`}>
        
        {/* Avatar y nombre */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-yellow-400 flex items-center justify-center text-4xl">
            🧙
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Tu nombre..."
                autoFocus
              />
            ) : (
              <h2 className="text-white font-bold text-xl">{name}</h2>
            )}
            <span className={`text-xs text-white px-2 py-0.5 rounded-full mt-1 inline-block ${style.badge}`}>
              {style.emoji} {house}
            </span>
          </div>
        </div>

        {/* Botones editar/guardar */}
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-yellow-400 text-gray-900 font-bold py-2 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => { setEditing(false); setTempName(name); }}
                className="flex-1 bg-gray-700 text-white py-2 rounded-xl text-sm hover:bg-gray-600 transition-colors"
              >
                ✖ Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => { setEditing(true); setTempName(name); }}
              className="flex-1 bg-gray-700 text-white py-2 rounded-xl text-sm hover:bg-gray-600 transition-colors"
            >
              ✏️ Editar nombre
            </button>
          )}
        </div>
      </div>

      {/* Elegir casa */}
      <h2 className="text-white font-bold text-base mb-3">
        🏰 Elige tu casa
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {houses.map((h) => {
          const s = houseStyles[h];
          const isSelected = house === h;
          return (
            <button
              key={h}
              onClick={() => setHouse(h)}
              className={`rounded-xl border-2 p-3 text-left transition-all duration-200
                ${isSelected ? `${s.border} ${s.bg} scale-105` : "border-gray-700 bg-gray-900"}`}
            >
              <span className="text-2xl">{s.emoji}</span>
              <p className={`text-sm font-bold mt-1 ${isSelected ? "text-white" : "text-gray-400"}`}>
                {h}
              </p>
              {isSelected && (
                <span className="text-xs text-yellow-400">✓ Seleccionada</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <h2 className="text-white font-bold text-base mb-3">
        📊 Tu perfil
      </h2>
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">
              {stat.emoji} {stat.label}
            </span>
            <span className="text-white text-sm font-semibold">
              {stat.label === "Casa" ? house : stat.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default User;