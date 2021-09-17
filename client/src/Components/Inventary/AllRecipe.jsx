import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../actions';
import Cards from '../Cards/Cards'
import MidNav from '../Nav/midNav/midNav';




export default function AllRecipe() {
        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);
        const token = useSelector(state => state.token);
        useEffect(() => {
          dispatch(getRecipes(token));
        }, [dispatch, token]);
     

        return (
                <div>
                        <h3> Encuentra Aqui tu receta favorita</h3>
                        <h6>Añadela al calendario y organiza tu semana</h6>
                        
                        <MidNav />
                        <Cards allRecipes={allRecipes}/>       
                </div>
        )
}
