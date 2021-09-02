import React from 'react';
import { Link } from 'react-router-dom'

export default function LandingPage() {
return(
       <div>
        <h1>Bienvenido a la PokePage</h1>
        <Link to ='/home'>
            <button>Pokedex</button>
        </Link>
       </div>
      )
}