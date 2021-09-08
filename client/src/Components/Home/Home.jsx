import React, { useEffect } from 'react'
import Cards from '../Cards/Cards';
import calendar from '../../Image/Menu_semanal.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'
import MidNav from '../Nav/midNav/midNav'


export default function Home() {

        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);

        useEffect(() => {
                dispatch(getRecipes());
        }, [dispatch]);
     
        return (
                <div class={style.order}>
                 <h2 className={style.margin}>Planea tus comidas :D</h2>
                 <img src= {calendar} class="img-fluid" alt='medium'/>
                 <MidNav />
                 <Cards allRecipes={allRecipes}/>
                </div>
        )
}
