import { useState, useMemo } from "react";
import useCharacters from "../Hooks/useCharacters";
import CharacterCard from "../Components/CharacterCard";

const Home = ({ favorites, onToggleFavorite }) => {
  const { characters, loading, error, page, setPage, totalPages } = useCharacters();
  const [search, setSearch] = useState("");
  const [filterHouse, setFilterHouse] = useState("");

  const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchName  = char.name?.toLowerCase().includes(search.toLowerCase());
      const matchHouse = filterHouse ? char.house === filterHouse : true;
      return matchName && matchHouse;
    });
  }, [characters, search, filterHouse]);

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-6 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          ⚡ Personajes
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Universo Harry Potter
        </p>
      </div>

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          onClick={() => setFilterHouse("")}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200
            ${filterHouse === "" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-gray-300"}`}
        >
          Todos
        </button>
        {houses.map((house) => (
          <button
            key={house}
            onClick={() => setFilterHouse(house)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200
              ${filterHouse === house ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-gray-300"}`}
          >
            {house}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <div className="text-5xl animate-spin">⚡</div>
          <p className="text-gray-400 text-sm">Cargando personajes...</p>
        </div>
      )}

      {error && (
        <div className="text-center mt-20">
          <p className="text-red-400 text-sm">❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredCharacters.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-400 text-sm">
                No se encontraron personajes 
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isFavorite={favorites.some((f) => f.id === character.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm disabled:opacity-40 hover:bg-gray-700 transition-colors"
            >
               Anterior
            </button>
            <span className="text-gray-400 text-sm">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm disabled:opacity-40 hover:bg-gray-700 transition-colors"
            >
              Siguiente 
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;