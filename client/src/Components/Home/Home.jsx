import React, { useEffect } from 'react'
import Cards from '../Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'
import SiliderImages from './SiliderImages/SiliderImages';

export default function Home() {

        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);
        const token = useSelector(state => state.token);

        useEffect(() => {
                dispatch(getRecipes(token));
        }, [dispatch, token]);

        const recipesHome = allRecipes.filter(e => e.rating > 5)
        return (
                <div class={style.order}>
                 <SiliderImages allRecipes={allRecipes} />
                 <h2 className={style.margin}>Tenemos recetas para ti !! UWU</h2>
              
                 <Cards allRecipes={recipesHome}/>
                </div>
        )
}
