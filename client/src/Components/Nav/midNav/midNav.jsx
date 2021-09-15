import React from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import Order from './OrderingCards/Alphabetical/Alphabetical'
import ByIngredient from './FilteredCards/ByIngredient/FilteredByIngredient'
import ByCategory from './FilteredCards/ByCategory/ByCategory'
import ByDifficulty from './FilteredCards/ByDifficulty/FilterByDifficulty'
import style from '../../../Styles/StyleNav.module.css'
import { Link } from 'react-router-dom'



export default function midNav() {
    return (
        <div id={style.midNav} className="navbar navbar-light" >
            <Order />
            <ByIngredient />
            <ByCategory />
            <ByDifficulty />
            <SearchBar />
           <Link to='/AllRecipe'><h6> Ver todas la recetas </h6></Link> 
        </div>
    )
}
