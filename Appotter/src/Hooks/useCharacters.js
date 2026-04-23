import { useState, useEffect } from "react";

const BASE_URL = "https://api.potterdb.com/v1/characters";

const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}?page[number]=${page}&page[size]=20`);

        if (!res.ok) throw new Error("Error al cargar los personajes");

        const json = await res.json();
        const parsed = json.data.map((char) => ({
          id:          char.id,
          slug:        char.attributes.slug,
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
        }));

        setCharacters(parsed);
        setTotalPages(json.meta?.pagination?.last || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return {
    characters,
    loading,
    error,
    page,
    setPage,
    totalPages,
  };
};

export default useCharacters;