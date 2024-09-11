import { GET_SINGLE_CHARACTER } from '@/app/graphql/queries';
import client from '@/app/lib/apolloClient';
import Image from 'next/image';

async function fetchCharacter(id: string) {
  const { data } = await client.query({
    query: GET_SINGLE_CHARACTER,
    variables: { id: parseInt(id, 10) },
  });
  return data.character;
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const character = await fetchCharacter(params.id);

  return (
    <div>
      <h1>{character.name}</h1>
      <Image src={character.image} alt={character.name} width={200} height={200} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}
