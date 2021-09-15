import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../actions';
import Cards from '../Cards/Cards'
import MidNav from '../Nav/midNav/midNav';
import SearchBar from '../SearchBar/SearchBar';

export default function AllRecipe() {
        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);

        useEffect(() => {
                dispatch(getRecipes());
        }, [dispatch]);
     

        return (
                <div>
                        <SearchBar/>
                        <h3> Encuentra Aqui tu receta favorita</h3>
                        <h6>Añadela al calendario y organiza tu semana</h6>
                        
                        <MidNav />
                <Cards allRecipes={allRecipes}/>       
                </div>
        )
}
