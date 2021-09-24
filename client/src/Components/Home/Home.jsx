import React, { useEffect } from 'react'
import Cards from '../Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'
import SiliderImages from './SiliderImages/SiliderImages';
import InventaryNav from '../Inventary/InventaryNav'
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
                        <SiliderImages />
                        <div className={style.width}>

                                <Cards page={4} allRecipes={recipesHome} />
                        </div>
                        <InventaryNav />
                </div>
        )
}
