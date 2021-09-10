import React from 'react'
import { useSelector } from 'react-redux'
import Style from "../../Styles/StyleInventary.module.css";



export default function Inventary() {
       const calendar = useSelector((state)=>state.recipeCalendar)
       console.log (calendar,'calendar')
        return (
                <div id={Style.stack}>
                <h6>Aca van las recetas del calendario </h6>       
                </div>
        )
}
