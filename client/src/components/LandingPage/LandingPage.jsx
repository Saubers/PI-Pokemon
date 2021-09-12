import styles from './LandingPage.module.css'
import React from 'react';
import { Link } from 'react-router-dom'

export default function LandingPage() {
return(
       <div className={styles.landing}>
        <h1 className={styles.title}>Bienvenido a mi página de Pokémon</h1>
        <Link to ='/home'>
            <button className={styles.button}>ENTER</button>
        </Link>
       </div>
      )
}