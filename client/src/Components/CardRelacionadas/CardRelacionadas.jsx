import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect, useState} from "react";
import {  useDispatch ,useSelector} from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/index'
import Dificultad from '../Cards/Dificultad'
import Pagination from '../Pagination/Pagination'

export default function CardRelacionadas(props){
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
                        <div>
                        <Dificultad difficulty={e.difficulty}/>
                        </div>       
                    </div>       
                </Link>
                </div>
            )
        })}
     </div>
    )
}