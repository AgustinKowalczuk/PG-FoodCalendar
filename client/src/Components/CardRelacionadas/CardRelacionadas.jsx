import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail,getRecipes,page } from '../../actions/index'
import Dificultad from '../Cards/Dificultad'
import Pagination from '../Pagination/Pagination'

export default function CardRelacionadas() {
    const allRecipes = useSelector((state) => state.recipes)
    const token = useSelector(state => state.token);
    const dispatch = useDispatch()
    const pages =  useSelector(state => state.page)
    
    const recipesPerPage = 3
    const lastRecipeIndex = pages * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const paginado = (pageNumber) => {
        dispatch(page(pageNumber))
    }

    useEffect(() => {
        dispatch(getRecipes(token));
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
                                <h3 class="card-title" >{e.name.toUpperCase()}</h3>
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