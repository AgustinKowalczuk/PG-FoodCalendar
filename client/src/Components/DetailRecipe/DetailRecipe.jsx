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

    console.log(recipeDetail,'detalle2')

        return (
                <div class={style.carData}>
                    <h3>{recipeDetail.name}</h3>
                    <h3>Dificultad:{recipeDetail.difficulty}</h3>
                    <h3>Rating:{recipeDetail.rating}</h3>
                    <h3>Preparacion:{recipeDetail.preparation}</h3>
                    <img src={recipeDetail.img} alt='imagen de comida'  width='200px' height= '100px'/> 
          <h5> Ingredientes : {recipeDetail.ingredients?.map(x =>(
            <table class={style.content}><tr>
           
            <td>  <h4>{x.name}</h4></td>
            <td>  <h6>{x.unit}</h6></td>
            
               </tr></table>
              ) )} </h5>
                </div>
        )
}
