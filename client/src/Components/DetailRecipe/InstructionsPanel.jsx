import React from 'react'
import { useSelector } from "react-redux";
import style from "../../Styles/StyleDetail.module.css";




export default function InstrunctionsPanel() {
    
    const recipeDetail = useSelector((state) => state.detail);




    return (
        <div>
             <div className={style.normal}>
            <h5>{recipeDetail.availability !== 'Unavailable' && recipeDetail.preparation}</h5>
            <h5>{recipeDetail.availability === 'Unavailable' && <span>Receta no disponible.</span>}</h5>
          </div>

        </div>
    )
}
