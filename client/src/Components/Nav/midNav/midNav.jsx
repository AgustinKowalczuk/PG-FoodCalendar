import React from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import OrderingCards from '../OrderingCards/OrderingCards'
import ByIngredient from './FilteredCards/ByIngredient/FilteredByIngredient'
import ByCategory from './FilteredCards/ByCategory/ByCategory'
import ByDifficulty from './FilteredCards/ByDifficulty/FilterByDifficulty'

export default function midNav() {
    return (
        <div>
            <OrderingCards />
            <ByIngredient />
            <ByCategory />
            <ByDifficulty />
            <SearchBar />
        </div>
    )
}
