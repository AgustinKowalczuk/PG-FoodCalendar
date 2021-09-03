import React, { useEffect }from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import { useParams } from 'react-router-dom';
import { getDetail } from '../../actions'
import style from '../../Styles/StyleCards.module.css';



export default function DetailRecipe() {

        const {id} = useParams()
        console.log(id,'id')
        const dispatch = useDispatch()
        const recipeDetail = useSelector(state => state.detail)
        
        //Lo despacho
        useEffect(() => {
            dispatch(getDetail(id))
            
    }, [dispatch,id])

    console.log(recipeDetail[0],'detalle2')

        return (
                <div class={style.carData}>
                    <h3>{recipeDetail[0].name}</h3>
                    <h3>Dificultad:{recipeDetail[0].difficulty}</h3>
                    <h3>Rating:{recipeDetail[0].rating}</h3>
                    <h3>Preparacion:{recipeDetail[0].preparation}</h3>
                    <img src={recipeDetail[0].img} alt='imagen de comida'  width='200px' height= '100px'/> 
          <h5> Ingredientes : {recipeDetail[0].ingredients?.map(x =>(
            <table class={style.content}><tr>
           
            <td>  <h4>{x.name}</h4></td>
            <td>  <h6>{x.unit}</h6></td>
            
               </tr></table>
              ) )} </h5>
                </div>
        )
}
