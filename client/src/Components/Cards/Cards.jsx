import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';

import Pagination from '../Pagination/Pagination'

export default function Cards(){
    //Traigo todo
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)

    //Para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(6);
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
                <div class="card" id={style.carData} key={e.id}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" >{e.name}</h1>
                        <h4 class="card-text" >Dificultad: {e.difficulty}</h4>
                    </div>       
                </div>
            )
        })}
        </div>
    )
}