import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {useHistory} from 'react-router'
import { cleanDeleteRecipe, deleteRecipe, getDetail, getRecipes, postLike, setRecipeCalendar } from "../../actions";
import style from "../../Styles/StyleDetail.module.css";
import CardRelacionadas from "../CardRelacionadas/CardRelacionadas";
import Dificultad from "../Cards/Dificultad";
import Inventary from "../Inventary/Inventary";
import Reviews from "./Reviews";
import { VerComentarios } from "./VerComentarios";
import swal from 'sweetalert';


export default function DetailRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.detail);
  const stackReceta = useSelector((state) => state.recipeCalendar);
  const borrar = useSelector((state)=>state.deleteRecipe);
  const history = useHistory();
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);
  //Lo despacho
  useEffect(() => {
    dispatch(getDetail(id,token));
    window.scrollTo(0,0);
    }, [token]);

  useEffect(() => {
    if(Object.keys(borrar).length){
      dispatch(getRecipes(token));
      dispatch(cleanDeleteRecipe());
      history.push('/');
      }
  }, [history,borrar])


 //envio receta al stack del calendario
  function agregarCalendario(receta){

    if(stackReceta.length < 14 && !stackReceta.includes(receta)){
    return dispatch(setRecipeCalendar(receta))
    } else{
    return swal({
      title: "Receta no agregada",
      text: "La receta ya se encuentra en el calendario o ya tiene 14 elementos",
      icon: "error",
    });
    }
    }

    function handleClick(){
      dispatch(deleteRecipe(recipeDetail.id,token));
    }

    function handleClick2(){
     console.log('post')
     dispatch(postLike(recipeDetail.id,token));
    }

  return (
    <div class={style.order}>
      <div class="card" id={style.maxwidth}>
        {recipeDetail?.availability === 'Unavailable' && 
          <div>Receta no disponible.
            <img src='https://e7.pngegg.com/pngimages/589/416/png-clipart-computer-icons-encapsulated-postscript-disabled-angle-text.png' alt='sin foto'/>
          </div>}
        {recipeDetail.availability === 'Available' && 
          <img
            class="card-img-top"
            id={style.img}
            src={recipeDetail.img}
            alt="imagen de comida"
            width="500px"
          />  
        } 
        <div class="card-body">
          <h3 >{recipeDetail.name}</h3>
          <div className={style.ingredientes}>
              <h3>Ingredientes : </h3>
              <ul class={style.ul}>
                {
                  recipeDetail.ingredients?.map((x) => (
                    <li className={style.li}>
                      <h5>{x.ingredient} {x.amount} {x.unit}</h5>
                    </li>
                  ))
                }
              </ul>
          </div>
          </div>
          <div className={style.dificulty}>
            <div class={style.maxwidth}>
              <h3>Dificultad:</h3>
              <Dificultad difficulty={recipeDetail.difficulty} />
            </div>
          </div>
          <div>
            {recipeDetail.likes===1 ? <h4>A 1 persona le gusta esta receta </h4>:
            recipeDetail.likes>1 ? <h4>{`A ${recipeDetail.likes} personas le gusta esta receta`}</h4>:
            <></>}
          </div>
              <div>
          <label>¿Te gusto la receta? </label> 
          <button className="btn btn-primary" name='like' onClick={handleClick2}>Dale Like</button> 
          
            </div>
          <div className={style.normal}>
            <h3>Instrucciones:</h3>
            <h5>{recipeDetail.availability !== 'Unavailable' && recipeDetail.preparation}</h5>
            <h5>{recipeDetail.availability === 'Unavailable' && <span>Receta no disponible.</span>}</h5>
          </div>

          <div class={style.category}>
            <h3 class={style.leftH3}>Categorias: </h3>
              <table class={style.content}>
                <tr>
                  {recipeDetail?.category?.map((x, index) => {
                    
                    return(
                      <td>
                        <h4>{x}</h4>
                      </td>
                    )
                  })}
                </tr>
              </table>
          </div>
          {( recipeDetail.disabled === false && !!token && user.category === "Admin") ? 
            <div>
              <Link id={style.link} class="nav-link active" to={`/update/${id}`}>Editar receta</Link>
              <button className="btn btn-primary" onClick={handleClick}>Eliminar receta</button>
            </div>            
            : null
          }          
          {recipeDetail.availability === 'Available' && 
          <button onClick={() => agregarCalendario(recipeDetail)}>Agregala a tu Calendario!</button>}
          </div>
          <div className={style.inventory}>
          <Inventary/>                      
          </div> 
          
           <br/>  
          {(!!token) ? 
          <Reviews id={recipeDetail.id}/> : <></>} 
          <VerComentarios id={recipeDetail.id}/>    
      {
        !!token ?
        <h2>Recetas relacionadas</h2>:
        <h2>Otras recetas</h2>
      }
      <CardRelacionadas/>
    </div>

  );
}
