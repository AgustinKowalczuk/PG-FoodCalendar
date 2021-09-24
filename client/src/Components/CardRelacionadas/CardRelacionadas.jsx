import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { FilterRecipeByCategory } from '../../actions/index'
import Cards from '../Cards/Cards'
import InventaryNav from '../Inventary/InventaryNav'
export default function CardRelacionadas() {
    const allRecipes = useSelector((state) => state.recipes)
    const token = useSelector(state => state.token);
    const dispatch = useDispatch()
    const recipeDetail = useSelector((state) => state.detail);

    useEffect(() => {
        if(Object.keys(recipeDetail).length && recipeDetail.category.length > 0 && !!token){
            dispatch(FilterRecipeByCategory(recipeDetail.category[0], token)) 
        } 
    }, [dispatch,recipeDetail,token]);

    return (
        <div className={style.content}>
            <Cards page={3} allRecipes={allRecipes}/>
        </div>
    )
}