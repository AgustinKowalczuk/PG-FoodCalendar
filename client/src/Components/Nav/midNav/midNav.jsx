import React from 'react'
import Order from './OrderingCards/Alphabetical/Alphabetical'
import style from '../../../Styles/StyleNav.module.css'
import FilteredCards from './FilteredCards/FilteredCards'



export default function midNav() {
    return (
        <div id={style.midNav} className="navbar navbar-light" >
            <Order />
            <FilteredCards />      
        </div>
    )
}
