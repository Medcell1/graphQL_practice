import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        image
      }
      info {
        next
        prev
      }
    }
  }
`;
export const GET_SINGLE_CHARACTER = gql`
  query GetSingleCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      location {
        name
      }
    }
  }
`;
