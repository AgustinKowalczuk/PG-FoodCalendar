import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';

export default function Cards(){
    //Traigo todo
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)

    //Lo despacho
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])
    
    //Existen recetas? Mandale mecha.
    return (
        <div class={style.content}>
        {allRecipes?.map((e) => {
            return(
                <div class="card" id={style.carData}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" >{e.name}</h1>
                        <h4 class="card-text" >Dificult: {e.difficulty}</h4>
                    </div>       
                </div>
            )
        })}
        </div>
    )
}