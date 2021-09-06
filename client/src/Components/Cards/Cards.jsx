import React from "react";

import {  useState } from "react";
import {  useDispatch } from "react-redux";
import style from "../../Styles/StyleCards.module.css";
import { Link } from "react-router-dom";
import { getDetail } from "../../actions/index";
import Dificultad from './Dificultad';

import Pagination from "../Pagination/Pagination";

export default function Cards(props) {
 
 
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(6);
  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = props.allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


 
  const dispatch = useDispatch();

 

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
                src={e.img}
                alt="No sé encuentra la imagen"
              />
              <div class="card-body">
                <h1 class="card-title">{e.name.toUpperCase()}</h1>
                <h4 class="card-text" id={style.normal}>
                    Dificultad:{e.difficulty}
                </h4>
                <Dificultad difficulty={e.difficulty}/>
              </div>
            </Link>
            
          </div>
        );
      })}
      <Pagination
         recipesPerPage={recipesPerPage}
         allRecipes={props.allRecipes.length}
         paginado={paginado}
        />
    </div>
  );
}
