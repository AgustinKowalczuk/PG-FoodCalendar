import React from 'react';
import { useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';


export default function Cards(){
    //Traigo todo
    const allRecipes = useSelector((state) => state.recipes)

    
    //Existen recetas? Mandale mecha.
    return (
        <div class={style.content} >
        {allRecipes?.map((e) => {
            return(
                <div class="card" id={style.carData} Key={e.id}>
                    <Link to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))} id={style.normal}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" id={style.normal}>{e.name}</h1>
                        <h4 class="card-text" id={style.normal} >Dificultad: {e.difficulty}</h4>
                    </div>       
                </Link>
                </div>
            )
        })}
     </div>
    )
}