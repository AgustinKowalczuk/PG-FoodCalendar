import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../Styles/StyleCards.module.css";
import { Link } from "react-router-dom";
import { addToInitialRecipes, getDetail, page } from "../../actions/index";
import Dificultad from './Dificultad';
import swal from 'sweetalert';
import Pagination from "../Pagination/Pagination";
import * as FaIcons from "react-icons/fa"

export default function Cards(props) {

  let recipesPerPage = props.page
  const dispatch = useDispatch();
  const pages = useSelector(state => state.page)
  const token = useSelector(state => state.token)

  const lastRecipeIndex = pages * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = props.allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const stackReceta = useSelector((state) => state.recipeCalendar);
  const paginado = (pageNumber) => {
    dispatch(page(pageNumber));
  };
  function agregarCalendario(receta) {
    if (stackReceta.length < 14) {
      return dispatch(addToInitialRecipes({
        title: receta.name,
        description: receta?.category?.length > 2 ? receta?.category[0] + ' ' + receta?.category[1] : receta?.category?.join(' '),
        recipeID: receta.id,
      }))
    } else {
      return swal({
        title: "Receta no agregada",
        text: "El calendario ya tiene 14 elementos",
        icon: "error",
      });
    }
  }

  return (
    <div className={style.content}>
      {currentRecipes?.map((e) => {
        return (
          <div id={style.carData} key={e.id}>

            <Link
              to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id, token))}
              id={style.normal}
            >
              {e.premium !== 'Free' ? <FaIcons.FaStar className={style.premium} /> : null}
              <img
                className="card-img-top"
                id={style.img}
                src={e.img}
                alt="Imagen de la receta"
              />
              <div className="card-body" id={style.card}>

                <h4 id={style.title}>{e.name.toUpperCase()}</h4>
                <h5 id={style.text}>
                  Dificultad:
                </h5>
              </div>
              <Dificultad difficulty={e.difficulty} />
            </Link>
            <div className={style.resize}>
              {e.availability === 'Available' ?
                <button id={style.btn} onClick={() => agregarCalendario(e)} className="btn btn-secondary">Agrégala a tu calendario!</button>:
                <h4 style={{color: 'red'}}>Receta pendiente de aprobación</h4>
              }
            
            </div>

          </div>
        );
      })}
      <div className={style.navFake}>
        <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={props.allRecipes.length}
          paginado={paginado}
        />
      </div>

    </div>
  );
}
