import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const houseColors = {
    Gryffindor: "border-red-600 bg-red-950",
    Slytherin:  "border-green-600 bg-green-950",
    Hufflepuff: "border-yellow-500 bg-yellow-950",
    Ravenclaw:  "border-blue-600 bg-blue-950",
  };

  const houseBadge = {
    Gryffindor: "bg-red-600",
    Slytherin:  "bg-green-600",
    Hufflepuff: "bg-yellow-500 text-gray-900",
    Ravenclaw:  "bg-blue-600",
  };

  const borderColor = houseColors[character.house] || "border-gray-700 bg-gray-900";
  const badgeColor  = houseBadge[character.house]  || "bg-gray-700";

  return (
    <div
      onClick={() => navigate(`/character/${character.id}`)}
      className={`relative rounded-xl border-2 ${borderColor} overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer`}
    >
      <div className="w-full h-48 bg-gray-800 overflow-hidden">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 gap-2">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h2 className="text-white font-bold text-sm truncate mb-1">
          {character.name || "Desconocido"}
        </h2>
        {character.house && (
          <span className={`text-xs text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
            {character.house}
          </span>
        )}
        {character.species && (
          <p className="text-gray-400 text-xs mt-1 truncate">
            {character.species}
          </p>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(character);
        }}
        className="absolute top-2 right-2 text-sm text-white bg-gray-800/80 px-2 py-1 rounded-full"
      >
        {isFavorite ? "Guardado" : "Guardar"}
      </button>
    </div>
  );
};

export default CharacterCard;