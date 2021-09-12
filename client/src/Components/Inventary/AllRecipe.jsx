import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../actions';
import Cards from '../Cards/Cards'

export default function AllRecipe() {
        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);

        useEffect(() => {
          dispatch(getRecipes());
        }, [dispatch]);
     

        return (
                <div>
                        <h3> Encuentra Aqui tu receta favorita</h3>
                        <h6>Añadela al calendario y organiza tu semana</h6>
                <Cards allRecipes={allRecipes}/>       
                </div>
        )
}
