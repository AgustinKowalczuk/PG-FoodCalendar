import React from 'react';
import { getRecipes } from '../../actions';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/index'
import Dificultad from '../Cards/Dificultad'
import Pagination from '../Pagination/Pagination'

export default function CardRelacionadas() {
    const allRecipes = useSelector((state) => state.recipes)

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(3);
    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);



    return (
        <div class={style.content}>
            
            {currentRecipes?.map((e) => {
                return (
                    <div class="card" id={style.carData} Key={e.id}>
                        <Link to={`/recipe/${e.id}`}
                            onClick={() => dispatch(getDetail(e.id))} id={style.normal}>
                            <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                            <div class="card-body" >
                                <h1 class="card-title" >{e.name.toUpperCase()}</h1>
                                <div>
                                    <Dificultad difficulty={e.difficulty} />
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
            <div className={style.navFake}>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
            </div>
            
        </div>
    )
}