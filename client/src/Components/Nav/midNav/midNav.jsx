import React from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import Order from './OrderingCards/Alphabetical/Alphabetical'
import ByIngredient from './FilteredCards/ByIngredient/FilteredByIngredient'
import ByCategory from './FilteredCards/ByCategory/ByCategory'
import ByDifficulty from './FilteredCards/ByDifficulty/FilterByDifficulty'


export default function midNav() {
    return (
        <div>
            <Order />
            <ByIngredient />
            <ByCategory />
            <ByDifficulty />
            <SearchBar />
        </div>
    )
}
