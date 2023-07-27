import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Puff } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";

const Home = () => {

  // set up the Pokemon context 
  const {setSelectedPokemon } = useContext (PokemonContext)

  // useState definitions for input:
  const [searchTerm, setSearchTerm] = useState('');
  //const [type, setType] = useState('type')

  // set a state for pokemons (all my pokemons)
  const [pokemons, setPokemons] = useState([]);

  // set a state for loading
  const [loading, setLoading] = useState(true);

  // Store details in an object
  //const [pokemonDetails, setPokemonDetails] = useState({}); 

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=151/`
        );

       const pokemons = response.data.results.map((pokemon) => ({
    
            //...pokemon,
            name: pokemon.name,
            url: pokemon.url,
            id: pokemon.url.split("/")[6],
            types: [], // Initialize types as an empty array
            imageUrl: '',
        }));
        for (const pokemon of pokemons) {
            const response = await axios.get(pokemon.url);
            //console.log(response.data); // Log the response data to check its structure
            pokemon.types = response.data.types.map((type) => type.type.name);
            pokemon.imageUrl = response.data.sprites.front_default; // Set the imageUrl for each Pokemon
            pokemon.onSelect = () => handlePokemonSelect(pokemon); // Pass the entire Pokemon object to onSelect
          }
            //onSelect: () => handlePokemonSelect(pokemon.name), // Pass the Pokemon name to onSelect
          //}));

        console.log(response.data.pokemons)

        setPokemons(pokemons);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [searchTerm]);

  /*
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const updatedDetails = {};
      for (const pokemon of pokemons) {
        const response = await axios.get(pokemon.url);
        updatedDetails[pokemon.name] = response.data;
      }
      setPokemonDetails(updatedDetails);
    };
    fetchPokemonDetails();
  }, [pokemons]); 
  */

////////------
// Function to handle Pokemon selection and navigation
const handlePokemonSelect = (selectedPokemon) => {
    setSelectedPokemon(selectedPokemon); // Store the selected Pokemon object in the context
    navigate(`/pokemon/${selectedPokemon.name}`); // Navigate to the PokemonDetails page with the Pokemon name as the URL parameter
  };

  // Function to filter the Pokemon list based on search term, type and ID
let filteredPokemons = pokemons.filter((pokemon) =>
pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())||
pokemon.types.some((type) =>
  type.toLowerCase().includes(searchTerm.toLowerCase())
) ||
pokemon.id.includes(searchTerm)
);

//if (type !== "type") {
//filteredPokemons = filteredPokemons.filter((pokemon) =>
  //pokemon.type.includes(type)
//);
//}
  
  return (
    <div className="main-container">
   
<form className="search-form">

{/* Search Bar */}
    <label htmlFor="search" className="search-label">Search</label>
        <input 
        type="text" 
        name="search" 
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
</form>

      {/* Pokemons Results */}
      <div className="pokemon-container">
        {loading ? (
          <div className="loader">
          <Puff color="#00BFFF" height={100} width={100} />
          </div>
        ) : pokemons.length === 0 ? (
          <p>No Pokemons Found</p>
        ) : (

          //pokemons.map((item) => (
            filteredPokemons.map((item) => (
            //const pokemonId = item.url.split("/")[6];
            //const pokemonData = pokemonDetails[item.name];

            //return (

            <div className="pokemon-item" key={item.url}>
                <img
                src={item.imageUrl}
                alt={item.name}
              />
              <p>Number: {item.id}</p>
              <h2>{item.name}</h2>
              <p>Type: {item.types.join(", ")}</p>
                <button
                  onClick={() => {
                  item.onSelect();
                  navigate(`/pokemon/${item.name}`)}}>Read More</button>
             </div>

           // );
          ))
        )}
      </div>
      </div>
  )
}
export default Home;

//{pokemonId && <p>Number: {parseInt(pokemonId)}</p>} // going after: <p>{item.type}</p>
                //{pokemonData && <p>Type: {pokemonData.types[0].type.name}</p>}