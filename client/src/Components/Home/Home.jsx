import React ,{ useEffect } from 'react'
import Cards from '../Cards/Cards';
import calendar from '../../Image/Menu_semanal.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from "../../actions";
import style from '../../Styles/StyleHome.module.css'

export default function Home() {
      
        
        
        const dispatch = useDispatch()
        const allRecipes = useSelector((state) => state.recipes);


        //Lo despacho
        useEffect(() => {
          dispatch(getRecipes());
        }, [dispatch]);
      
        //Existen recetas? Mandale mecha.
      
      
      
      
      
      
        return (
                <div>
                 <h2>Plan your meals </h2>
                 <img src= {calendar} class="img-fluid" alt='medium'/>
                <h2 >We have these recipes for you</h2>
                    <Cards allRecipes={allRecipes}/>
                </div>
        )
}