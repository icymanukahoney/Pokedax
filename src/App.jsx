import React from "react";
import {HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { PokemonContextProvider } from "./context/PokemonContext";

// import of pages 
import Home from './pages/Home'

//import of components
import Header from './components/Header'
import Footer from './components/Footer'
import PokemonDetails from "./components/PokemonDetails"


function App() {
  
  return (
    <HashRouter>
      <PokemonContextProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
        <Footer />
      </PokemonContextProvider>
    </HashRouter>
  )
}

export default App
