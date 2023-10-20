import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);

  function incrementOffSet() {
    setPageOffset(pageOffset + 20);
  }

  function decrementOffSet() {
    setPageOffset(pageOffset - 20);
  }
  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}?limit=20`
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [pageOffset]);

  return (
    <main>
      <button type="button" onClick={decrementOffSet}>
        Previous Page
      </button>
      <button type="button" onClick={incrementOffSet}>
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
