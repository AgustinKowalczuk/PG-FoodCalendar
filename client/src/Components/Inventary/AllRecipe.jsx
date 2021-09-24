import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../actions';
import Cards from '../Cards/Cards'
import MidNav from '../Nav/midNav/midNav';
import InventaryNav from './InventaryNav';
import Style from '../../Styles/StyleAllRecipe.module.css';



export default function AllRecipe() {
        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);
        const token = useSelector(state => state.token);
        useEffect(() => {
          dispatch(getRecipes(token));
        }, [dispatch, token]);
     

        return (
                <div>
                        <h2 className={Style.titleAllRecipe}> Encuentra aquí tu receta favorita</h2>
                        <h5 className={Style.titleAllRecipe}>Añádela al calendario y organiza tu semana</h5>
                        
                        <MidNav />
                        <Cards page={10} allRecipes={allRecipes}/>       
                        <InventaryNav />
                </div>
        )
}
