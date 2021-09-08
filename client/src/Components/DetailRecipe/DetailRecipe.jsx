import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail } from "../../actions";
import style from "../../Styles/StyleDetail.module.css";
import CardRelacionadas from "../CardRelacionadas/CardRelacionadas";
import Dificultad from "../Cards/Dificultad";


export default function DetailRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.detail);

  //Lo despacho
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div class={style.order}>
      <div class="card" id={style.maxwidth}>
        <img
          class="card-img-top"
          src={recipeDetail.img}
          alt="imagen de comida"
          width="500px"
        />
        
        <div class="card-body">
          <h3 class="card-title">{recipeDetail.name}</h3>

          <div className={style.ingredientes}>
              <h3>Ingredientes : </h3>
              <ul class={style.content}>
                {
                  recipeDetail.ingredients?.map((x) => (
                    <li>
                      <h5>{x.ingredient.name} {x.amount} {x.unit.name}</h5>
                    </li>
                  ))
                }
              </ul>
          </div>

          <div className={style.dificulty}>
            <div class={style.maxwidth}>
              <h3>Dificultad:</h3>
              <Dificultad difficulty={recipeDetail.difficulty} />
            </div>
            <h3 >Rating: {recipeDetail.rating}</h3>
          </div>

          <div className={style.normal}>
            <h3>Instrucciones:</h3>
            <h5>{recipeDetail.preparation}</h5>
          </div>

          <div class={style.category}>
            <h3 class={style.leftH3}>Categorias: </h3>
              <table class={style.content}>
                <tr>
                  {recipeDetail.category?.map((x) => (
                    <td>
                      <h4>{x.name}</h4>
                    </td>
                  ))}{" "}
                </tr>
              </table>
          </div>
          <Link id={style.link} class="nav-link active" to={`/update/${id}`}>Editar receta</Link>
        </div>
      </div>

      <h2> Otras recetas</h2>
      <CardRelacionadas />
    </div>
  );
}
