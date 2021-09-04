import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import {getDetail}from '../../actions'
import style from '../../Styles/StyleCards.module.css';
import easy from '../../Image/easy.png'
import hard from '../../Image/hard.png'
import medium from '../../Image/medium.png'

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
        <div class={style.content} >
        {allRecipes?.map((e) => {
            return(
                <div class="card" id={style.carData} Key={e.id}>
                    <Link to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))} id={style.normal}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" id={style.normal}>{e.name}</h1>
                     <div>{e.difficulty ==='Fácil'?
                            <h4 class="card-text" id={style.normal}>Dificultad:{e.difficulty} 
                            <img width="100px"  src= {easy} alt='easy'/></h4>
                            : e.difficulty==='Moderado'?
                                <h4 class="card-text" id={style.normal} >Dificultad:{e.difficulty} 
                                <img width="100px" src= {medium} alt='medium'/></h4>
                                :<h4 class="card-text" id={style.normal} >Dificultad:{e.difficulty} 
                                    <img width="100px" src= {hard} alt='hard'/></h4>
                           }                  
                      </div> 
                    </div>       
                </Link>
                </div>
            )
        })}
     </div>
    )
}