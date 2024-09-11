"use client";
interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}
import { useEffect, useState } from "react";
import client from "./lib/apolloClient";
import { GET_CHARACTERS } from "./graphql/queries";
import CharacterList from "./components/characterList";

async function fetchCharacters(page: number) {
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page },
  });

  return {
    characters: data.characters.results,
    info: data.characters.info,
  };
}

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [info, setInfo] = useState<{
    next: number | null;
    prev: number | null;
  }>({ next: null, prev: null });

  useEffect(() => {
    const loadCharacters = async () => {
      const { characters, info } = await fetchCharacters(page);
      setCharacters(characters);
      setInfo(info);
    };

    loadCharacters();
  }, [page]);

  return (
    <main className="mx-5 my-5">
      <h1 className="text-white text-lg font-bold mb-5">
        Rick and Morty Characters
      </h1>
      <CharacterList characters={characters} />

      {/* Pagination Controls */}
      <div className="flex justify-between mt-5">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-700"
          disabled={!info.prev}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-700"
          disabled={!info.next}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}
