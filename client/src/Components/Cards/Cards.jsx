import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import style from "../../Styles/StyleCards.module.css";
import { Link } from "react-router-dom";
import { getDetail, page, setRecipeCalendar } from "../../actions/index";
import Dificultad from './Dificultad';
import swal from 'sweetalert';
import Pagination from "../Pagination/Pagination";

export default function Cards(props) {
 
 let recipesPerPage
 const dispatch = useDispatch();
 const pages =  useSelector(state => state.page)
 const token = useSelector(state => state.token)

  if(props.confirmador){
     recipesPerPage = 3;
  }else{
     recipesPerPage = 6;
  }
  const lastRecipeIndex = pages * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = props.allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const stackReceta = useSelector((state) => state.recipeCalendar);
  const paginado = (pageNumber) => {
    dispatch(page(pageNumber));
  };
  function agregarCalendario(receta){
    if(stackReceta.length < 14 ){
    return dispatch(setRecipeCalendar(receta))
    } else{
    return swal({
      title: "Receta no agregada",
      text: "El calendario ya tiene 14 elementos",
      icon: "error",
    });
    }
    }

  return (
    <div class={style.content}>
      {currentRecipes?.map((e) => {
        return (
          <div class="card" id={style.carData} Keys={e.id}>
            <Link
              to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id, token))}
              id={style.normal}
            >
              <img
                class="card-img-top"
                id={style.img}
                src={e.img}
                alt="No sé encuentra la imagen"
              />
              <div class="card-body">
                <h4 class="card-title">{e.name.toUpperCase()}</h4>
                <h5 class="card-text" id={style.normal}>
                    Dificultad:
                </h5>
                <Dificultad difficulty={e.difficulty}/>
              </div>
            </Link>
            <div>
              {e.availability === 'Available' && 
              <button id={style.btn} onClick={() => agregarCalendario(e)} class="btn btn-secondary" >Agregala a tu Calendario!</button>
              }
            </div>
           
          </div>
        );
      })}
      <div class={style.navFake}>
        <Pagination
         recipesPerPage={recipesPerPage}
         allRecipes={props.allRecipes.length}
         paginado={paginado}
        />
      </div>
      
    </div>
  );
}
