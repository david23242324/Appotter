const Info = () => {
  const houses = [
    {
      name: "Gryffindor",
      color: "border-red-600 bg-red-950",
      badge: "bg-red-600",
      description: "Valentía, coraje y determinación. Hogar de Harry Potter.",
    },
    {
      name: "Slytherin",
      color: "border-green-600 bg-green-950",
      badge: "bg-green-600",
      description: "Ambición, astucia y liderazgo. Hogar de Draco Malfoy.",
    },
    {
      name: "Hufflepuff",
      color: "border-yellow-500 bg-yellow-950",
      badge: "bg-yellow-500 text-gray-900",
      description: "Lealtad, paciencia y trabajo duro. Hogar de Cedric Diggory.",
    },
    {
      name: "Ravenclaw",
      color: "border-blue-600 bg-blue-950",
      badge: "bg-blue-600",
      description: "Sabiduría, creatividad e ingenio. Hogar de Luna Lovegood.",
    },
  ];

  const facts = [
    "La saga tiene 7 libros escritos por J.K. Rowling",
    "8 películas producidas entre 2001 y 2011",
    "Más de 700 personajes en todo el universo",
    "Hogwarts fue fundada hace más de 1000 años",
    "Harry Potter nació el 31 de julio de 1980",
    "Existen 3 tipos de varitas: madera, núcleo y largo",
  ];

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-6 pb-20">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          Informativa
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Todo sobre el universo mágico
        </p>
      </div>

      <div className="bg-gray-800 border border-yellow-500/30 rounded-2xl p-4 mb-6">
        <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-2">
          Sobre la API
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Esta app consume la API de{" "}
          <span className="text-yellow-400 font-semibold">PotterDB</span>, una
          base de datos gratuita y abierta con información detallada de
          personajes, libros, películas, pociones y hechizos del universo
          Harry Potter.
        </p>
        <div className="mt-3 space-y-1">
          <p className="text-gray-400 text-xs">
            <span className="text-gray-300">Base URL:</span>{" "}
            <span className="text-yellow-300 font-mono">https://api.potterdb.com/v1</span>
          </p>
          <p className="text-gray-400 text-xs">
            <span className="text-gray-300">Endpoint:</span>{" "}
            <span className="text-yellow-300 font-mono">/characters</span>
          </p>
          <p className="text-gray-400 text-xs">
            <span className="text-gray-300">Autenticación:</span>{" "}
            <span className="text-green-400">No requerida</span>
          </p>
          <p className="text-gray-400 text-xs">
            <span className="text-gray-300">Formato:</span>{" "}
            <span className="text-gray-300">JSON:API</span>
          </p>
        </div>
      </div>

      <h2 className="text-white font-bold text-base mb-3">
        Casas de Hogwarts
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {houses.map((house) => (
          <div
            key={house.name}
            className={`rounded-xl border-2 ${house.color} p-3`}
          >
            <span className={`text-xs text-white font-bold px-2 py-0.5 rounded-full ${house.badge}`}>
              {house.name}
            </span>
            <p className="text-gray-300 text-xs leading-relaxed mt-2">
              {house.description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-white font-bold text-base mb-3">
        Datos Curiosos
      </h2>
      <div className="space-y-2 mb-6">
        {facts.map((fact, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl p-3"
          >
            <p className="text-gray-300 text-sm leading-relaxed">{fact}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-4 pb-4">
        <p className="text-gray-600 text-xs">
          Datos obtenidos de PotterDB API
        </p>
        <p className="text-gray-700 text-xs mt-1">
          Harry Potter J.K. Rowling
        </p>
      </div>

    </div>
  );
};

export default Info;