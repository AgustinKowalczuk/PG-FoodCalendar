import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail,getRecipes,page,setRecipeCalendar } from '../../actions/index'
import Dificultad from '../Cards/Dificultad'
import Pagination from '../Pagination/Pagination'
import swal from 'sweetalert';

export default function CardRelacionadas() {
    const allRecipes = useSelector((state) => state.recipes)
    const token = useSelector(state => state.token);
    const dispatch = useDispatch()
    const pages =  useSelector(state => state.page)
    
    const recipesPerPage = 3
    const lastRecipeIndex = pages * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const paginado = (pageNumber) => {
        dispatch(page(pageNumber))
    }
    const stackReceta = useSelector((state) => state.recipeCalendar);
    function agregarCalendario(receta){
        if(stackReceta.length < 14  && !stackReceta.includes(receta)){
        return dispatch(setRecipeCalendar(receta))
        } else{
        return swal({
          title: "Receta no agregada",
          text: "La reseta ya se encuentra en el calendario o ya tiene 14 elementos",
          icon: "error",
        });
        }
        }

    useEffect(() => {
        dispatch(getRecipes(token));
    }, [dispatch]);



    return (
        <div class={style.content}>
            
            {currentRecipes?.map((e) => {
                return (
                    <div class="card" id={style.carData} Key={e.id}>
                        <Link to={`/recipe/${e.id}`}
                            onClick={() => dispatch(getDetail(e.id,token))} id={style.normal}>
                            <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                            <div class="card-body" >
                                <h4 class="card-title" >{e.name.toUpperCase()}</h4>
                                <div>
                                    <Dificultad difficulty={e.difficulty} />
                                </div>
                                <div>
              {e.availability === 'Available' && 
              <button id={style.btn} onClick={() => agregarCalendario(e)} class="btn btn-secondary" >Agregala a tu Calendario!</button>
              }
            </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
            <div className={style.navFake}>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
            </div>
            
        </div>
    )
}