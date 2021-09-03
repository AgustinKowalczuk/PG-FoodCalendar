import React, { useEffect }from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import { getRecipes } from '../../actions'


export default function DetailRecipe(id) {
        const dispatch = useDispatch()
        const recipe = useSelector(state => state.recipes)
        console.log(recipe,'recetas')

            //Lo despacho
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])
        return (
                <div>
                    <h3>{recipe[0].name}</h3>
                    <h3>Dificultad:{recipe[0].difficulty}</h3>
                    <h3>Rating:{recipe[0].rating}</h3>
                    <h3>Preparacion:{recipe[0].preparation}</h3>
                    <img src={recipe[0].img} alt='imagen de comida'  width='200px' height= '100px'/>
          <h5> Ingredientes : {recipe[0].ingredients?.map(x =>(
            <table><tr>
           
            <td>  <h4>{x.name}</h4></td>
            <td>  <h6>{x.unit}</h6></td>
            
               </tr></table>
              ) )} </h5>
                </div>
        )
}
