'use client'; 

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CharacterListProps {
  characters: Character[];
}

export default function CharacterList({ characters }: CharacterListProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {characters.map((character: Character) => (
        <div
          key={character.id}
          className="border border-gray-300 p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push(`/character/${character.id}`)}
        >
          <Image
            src={character.image}
            alt={character.name}
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-bold mb-2">{character.name}</h3>
          <p className="text-gray-600">Status: {character.status}</p>
          <p className="text-gray-600">Species: {character.species}</p>
          <p className="text-gray-600">Gender: {character.gender}</p>
        </div>
      ))}
    </div>
  );
}
