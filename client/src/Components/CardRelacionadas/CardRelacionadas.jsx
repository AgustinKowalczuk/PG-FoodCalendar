import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/index'

import easy from '../../Image/easy.png'
import hard from '../../Image/hard.png'
import medium from '../../Image/medium.png'

import Pagination from '../Pagination/Pagination'

export default function CardRelacionadas(){
    //Traigo todo
    const allRecipes = useSelector((state) => state.recipes)
    //Despacho
    const dispatch = useDispatch()
    //Para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(3);
    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    //Lo despacho
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])
    
    //Existen recetas? Mandale mecha.
    
    return (
        <div class={style.content}>
        <Pagination
        recipesPerPage = {recipesPerPage}
        allRecipes = {allRecipes.length}
        paginado = {paginado}
        />
        {currentRecipes?.map((e) => {
            return(
                <div class="card" id={style.carData} Key={e.id}>
                    <Link to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))} id={style.normal}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" >{e.name.toUpperCase()}</h1>
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