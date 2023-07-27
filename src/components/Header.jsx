import React from 'react';
import logoImage from '../images/Pokemon-Logo-PNG-Pic.png';



const Header = () => {
  return (
    <>
    <div id='topnav'>
      <div id='logo'>
        <img src={logoImage} alt="Logo" />
      </div>
      <h1>Pokedex</h1>
    </div>
  </>
  )
}

export default Header
