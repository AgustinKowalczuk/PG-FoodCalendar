import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import {getDetail}from '../../actions'

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
        <div>
        {allRecipes?.map((e) => {
            return(
                <div key={e.id} >
            <Link to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))} >
                    <h1>Receta: {e.name}</h1>
                    <h4>Dificultad: {e.difficulty}</h4>
                    <img width={250} height={250} src={e.img} alt="No sé encuentra la imagen" />
                    </Link>
                </div>
            )
        })}
     </div>
    )
}