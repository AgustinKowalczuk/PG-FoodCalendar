import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import style from "../../Styles/StyleCards.module.css";
import { Link } from "react-router-dom";
import { getDetail, page } from "../../actions/index";
import Dificultad from './Dificultad';

import Pagination from "../Pagination/Pagination";

export default function Cards(props) {
 
 const dispatch = useDispatch();
 const pages =  useSelector(state => state.page)
  
  const recipesPerPage = 6;
  const lastRecipeIndex = pages * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = props.allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const paginado = (pageNumber) => {
    dispatch(page(pageNumber));
  };

  return (
    <div class={style.content}>
      {currentRecipes?.map((e) => {
        return (
          <div class="card" id={style.carData} Keys={e.id}>
            <Link
              to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))}
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
                    Dificultad:{e.difficulty}
                </h5>
                <Dificultad difficulty={e.difficulty}/>
              </div>
            </Link>
            
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
