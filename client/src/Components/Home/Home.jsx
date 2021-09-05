import React from 'react'
import Cards from '../Cards/Cards';
import calendar from '../../Image/Menu_semanal.jpg'
import style from '../../Styles/StyleHome.module.css'

export default function Home() {
        return (
                <div>
                 <h2>Plan your meals </h2>
                 <img src= {calendar} class="img-fluid" alt='medium'/>
                <h2 >We have these recipes for you</h2>
                    <Cards />
                </div>
        )
}