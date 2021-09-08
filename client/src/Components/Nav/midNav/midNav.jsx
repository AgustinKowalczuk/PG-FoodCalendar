import React from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import OrderingCards from '../OrderingCards/OrderingCards'
import FilteredCards from '../FilteredCards/FilteredCards'


export default function midNav() {
    return (
        <div>
            <OrderingCards />
            <FilteredCards />
            <SearchBar />
        </div>
    )
}
