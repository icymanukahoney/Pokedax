import { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) =>{
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    return (
        <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
            {children}
        </PokemonContext.Provider>

    )
}