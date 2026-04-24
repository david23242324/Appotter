import CharacterCard from "../Components/CharacterCard";

const Favorites = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-6 pb-20">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          Favoritos
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Tus personajes guardados
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-4">
          <p className="text-gray-400 text-sm text-center">
            No tienes favoritos aún. Explora personajes y guárdalos aquí.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-xs mb-4">
            {favorites.length} {favorites.length === 1 ? "personaje guardado" : "personajes guardados"}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {favorites.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;