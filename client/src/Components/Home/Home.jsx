import React, { useEffect } from 'react'
import Cards from '../Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'
import SiliderImages from './SiliderImages/SiliderImages';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {

        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);
        const token = useSelector(state => state.token);

        useEffect(() => {
                dispatch(getRecipes(token));
        }, [dispatch, token]);
     
        return (
                <div class={style.order}>
                        <SearchBar/>
                 <SiliderImages allRecipes={allRecipes} />
                 <h2 className={style.margin}>Tenemos recetas para ti !! UWU</h2>
           
                 <Cards allRecipes={allRecipes}/>
                </div>
        )
}
