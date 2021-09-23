import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteInventary, clearInventary } from '../../actions';
import style from "../../Styles/StyleInventary.module.css";



export default function Inventary() {
       let stackReceta = useSelector((state)=>state.recipeCalendar)
       const dispatch = useDispatch();

       function deleteRecipe(i){
               dispatch(deleteInventary(i))
       }
       function vaciar() {
           dispatch(clearInventary())
       }

        return (
                <div id={style.stack}>
                        <div className={style.title}>
                                <h3>Inventario</h3>
                        </div>
                        <div className={style.contentRecipes}>

                                {stackReceta?.map((x,i)=>(
                                        <div className={style.recipes}> 
                                                <h6>{x.name}</h6>
                                                <button className="btn btn-danger" id={style.exit} onClick={()=>deleteRecipe(i)}>X</button> 
                                        </div>  
                                ))}
                        </div>
                        {(stackReceta.length > 0) && 
                        <div className={style.btnContent}>
                                <button className="btn btn-danger" onClick={()=>vaciar()}>Vaciar</button>
                        </div>
                        }
                        
                </div>
        )
}
