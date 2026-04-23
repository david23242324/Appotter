import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CharacterDetail = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.potterdb.com/v1/characters/${id}`);
        if (!res.ok) throw new Error("Personaje no encontrado");
        const json = await res.json();
        const char = json.data;

        setCharacter({
          id:          char.id,
          name:        char.attributes.name,
          image:       char.attributes.image,
          house:       char.attributes.house,
          born:        char.attributes.born,
          died:        char.attributes.died,
          gender:      char.attributes.gender,
          species:     char.attributes.species,
          bloodStatus: char.attributes.blood_status,
          nationality: char.attributes.nationality,
          patronus:    char.attributes.patronus,
          animagus:    char.attributes.animagus,
          boggart:     char.attributes.boggart,
          hairColor:   char.attributes.hair_color,
          eyeColor:    char.attributes.eye_color,
          jobs:        char.attributes.jobs,
          titles:      char.attributes.titles,
          wand:        char.attributes.wand,
          wiki:        char.attributes.wiki,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const houseColors = {
    Gryffindor: "border-red-600",
    Slytherin:  "border-green-600",
    Hufflepuff: "border-yellow-500",
    Ravenclaw:  "border-blue-600",
  };

  const isFavorite = favorites?.some((f) => f.id === character?.id);
  const borderColor = houseColors[character?.house] || "border-gray-700";

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-4">
      <div className="text-5xl animate-spin">⚡</div>
      <p className="text-gray-400 text-sm">Cargando personaje...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-4">
      <p className="text-red-400">❌ {error}</p>
      <button
        onClick={() => navigate("/")}
        className="text-yellow-400 text-sm underline"
      >
        Volver al inicio
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 pb-24">

      {/* Imagen hero */}
      <div className="relative w-full h-72">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-8xl">
            🧙
          </div>
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm"
        >
          ← Volver
        </button>

        {/* Botón favorito */}
        <button
          onClick={() => onToggleFavorite(character)}
          className="absolute top-4 right-4 bg-gray-900/80 px-3 py-1.5 rounded-full text-xl backdrop-blur-sm"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Contenido */}
      <div className={`mx-4 -mt-6 rounded-2xl border-2 ${borderColor} bg-gray-900 p-5`}>

        {/* Nombre y casa */}
        <h1 className="text-2xl font-bold text-white mb-1">
          {character.name}
        </h1>
        {character.house && (
          <span className="text-yellow-400 text-sm font-semibold">
            🏰 {character.house}
          </span>
        )}

        <div className="mt-5 space-y-3">

          {/* Info básica */}
          <Section title="Información General">
            <InfoRow label="Género"      value={character.gender}      />
            <InfoRow label="Especie"     value={character.species}     />
            <InfoRow label="Sangre"      value={character.bloodStatus} />
            <InfoRow label="Nacimiento"  value={character.born}        />
            <InfoRow label="Muerte"      value={character.died}        />
            <InfoRow label="Nacionalidad" value={character.nationality} />
          </Section>

          {/* Magia */}
          <Section title="Magia">
            <InfoRow label="Patronus"  value={character.patronus}  />
            <InfoRow label="Animagus"  value={character.animagus}  />
            <InfoRow label="Boggart"   value={character.boggart}   />
            <InfoRow label="Color ojos" value={character.eyeColor} />
            <InfoRow label="Color pelo" value={character.hairColor} />
          </Section>

          {/* Varita */}
          {character.wand?.length > 0 && (
            <Section title="Varita">
              {character.wand.map((w, i) => (
                <p key={i} className="text-gray-300 text-sm">🪄 {w}</p>
              ))}
            </Section>
          )}

          {/* Títulos */}
          {character.titles?.length > 0 && (
            <Section title="Títulos">
              {character.titles.map((t, i) => (
                <p key={i} className="text-gray-300 text-sm">👑 {t}</p>
              ))}
            </Section>
          )}

          {/* Trabajos */}
          {character.jobs?.length > 0 && (
            <Section title="Trabajos">
              {character.jobs.map((j, i) => (
                <p key={i} className="text-gray-300 text-sm">💼 {j}</p>
              ))}
            </Section>
          )}

        {/* Wiki */}
        {character.wiki && (
        <a
            href={character.wiki}
            target="_blank"
            rel="noreferrer"
            className="block text-center mt-4 bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
        >
            📖 Ver en Harry Potter Wiki
        </a>
        )}

        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const Section = ({ title, children }) => (
  <div className="bg-gray-800 rounded-xl p-4">
    <h2 className="text-yellow-400 font-bold text-sm mb-3 uppercase tracking-wider">
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-gray-400 text-sm shrink-0">{label}</span>
      <span className="text-white text-sm text-right">{value}</span>
    </div>
  );
};

export default CharacterDetail;