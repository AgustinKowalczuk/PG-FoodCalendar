import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteInventary, clearInventary } from '../../actions';

//import Style from "../../Styles/StyleInventary.module.css";



export default function Inventary() {
       let stackReceta = useSelector((state)=>state.recipeCalendar)
       const dispatch = useDispatch();

       function deleteRecipe(id){
               dispatch(deleteInventary(id))
       }
       function vaciar() {
           dispatch(clearInventary())
       }

        return (
                <div id={stackReceta.id}>
                <h6>Aca van las recetas del calendario </h6>
                {stackReceta?.map((x)=>(
                <li> <h6>{x.name}</h6>
                <button onClick={()=>deleteRecipe(x.id)}>X</button> 
               </li>  
                ))}
                <button onClick={()=>vaciar()}>Vaciar</button>
                </div>
        )
}
