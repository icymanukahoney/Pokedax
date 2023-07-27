import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";

const PokemonDetails = () => {

    // bring in the selected pokemon
const { selectedPokemon } = useContext (PokemonContext)

    // create a variable for the useNavigate
    const navigate = useNavigate()

    if (!selectedPokemon) {
        return <p>Loading...</p>;
      }
    
      const { imageUrl, id, name, types } = selectedPokemon;
    
  // displaying Pokemon details
  return (
    <div className="details">
      <button onClick={() => navigate("/")}>Go Back</button>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt={name} className="image" />
          <p className="id">Number: {id}</p>
          <h1 className="name">{name}</h1>
          <p className="type">Type: {types ? types.join(", ") : "Unknown"}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonDetails;
