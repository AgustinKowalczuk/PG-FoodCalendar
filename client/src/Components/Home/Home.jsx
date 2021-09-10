import React, { useEffect } from 'react'
import Cards from '../Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'
import SiliderImages from './SiliderImages/SiliderImages';
import MidNav from '../Nav/midNav/midNav'


export default function Home() {

        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);

        useEffect(() => {
                dispatch(getRecipes());
        }, [dispatch]);
     
        return (
                <div class={style.order}>
                 <SiliderImages allRecipes={allRecipes} />
                 <h2 className={style.margin}>Tenemos recetas para ti !! UWU</h2>
                 <MidNav />
                 <Cards allRecipes={allRecipes}/>
                </div>
        )
}
