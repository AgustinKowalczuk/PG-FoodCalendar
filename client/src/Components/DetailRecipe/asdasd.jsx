import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {useHistory} from 'react-router'
import { cleanDeleteRecipe, deleteRecipe, getDetail, getRecipes, setRecipeCalendar } from "../../actions";
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
  }, [dispatch, id]);

  useEffect(() => {
    if(Object.keys(borrar).length){
      dispatch(getRecipes(token));
      dispatch(cleanDeleteRecipe());
      history.push('/');
      }
  }, [history,dispatch, borrar])

 //envio receta al stack del calendario
  function agregarCalendario(receta){

    if(stackReceta.length < 14 && !stackReceta.includes(receta)){
    return dispatch(setRecipeCalendar(receta))
    } else{
    return swal({
      title: "Receta no agregada",
      text: "La reseta ya se encuentra en el calendario o ya tiene 14 elementos",
      icon: "error",
    });
    }
    }

    function handleClick(id){
      dispatch(deleteRecipe(id,token));
    }

    console.log(stackReceta)
  return (
    <div className={style.content}  >
        <div className={style.containerTitles}>
        <h3  className={style.titleH3}>{recipeDetail.name}</h3>
        <div class={style.category}>
            <h3 class={style.categoryH3}>Categorias: </h3>
              <table class={style.content}>
                <tr>
                  {recipeDetail?.category?.map((x) => (
                    <td>
                      <h4>{x}</h4>
                    </td>
                  ))}
                </tr>
              </table>
          </div>
          <div className={style.dificulty}>
            <div class={style.maxwidth}>
              <h3 className={style.difficultyH3}>Dificultad:</h3>
              <Dificultad difficulty={recipeDetail.difficulty} />
            </div>
          </div>
        </div>
        
      {
        recipeDetail.availability === 'Available' && 
         <div className={style.imgContainer}>
           <img
              id={style.img}
              src={recipeDetail.img}
              alt="imagen de comida"
              width="500px"
            />  
         </div>
        } 
    </div>

  );
}
