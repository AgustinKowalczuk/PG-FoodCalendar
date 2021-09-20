import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { FilterRecipeByCategory,getRecipes,page } from '../../actions/index'
import Dificultad from '../Cards/Dificultad'
import Pagination from '../Pagination/Pagination'
import Cards from '../Cards/Cards'

export default function CardRelacionadas(props) {
    const allRecipes = useSelector((state) => state.recipes)
    const token = useSelector(state => state.token);
    const dispatch = useDispatch()
    const recipeDetail = useSelector((state) => state.detail);

    useEffect(() => {
        if(Object.keys(recipeDetail).length && recipeDetail.category.length > 0 && !!token){
            console.log('GOL',recipeDetail.category[0]);
            dispatch(FilterRecipeByCategory(recipeDetail.category[0], token)) 
        } 
    }, [dispatch,recipeDetail]);


    return (
        <div class={style.content}>
            
            <Cards confirmador={true} allRecipes={allRecipes}/>
            
        </div>
    )
}