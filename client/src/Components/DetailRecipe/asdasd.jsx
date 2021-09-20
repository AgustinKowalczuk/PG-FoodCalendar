import React, { useEffect, useState } from "react";
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
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import IngredientsPanel from "./IngredientsPanel";
import InstrunctionsPanel from "./InstrunctionsPanel";
import * as FaIcons from "react-icons/fa";




export default function DetailRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.detail);
  const stackReceta = useSelector((state) => state.recipeCalendar);
  const borrar = useSelector((state)=>state.deleteRecipe);
  const history = useHistory();
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);
  const [key, setKey]  = useState('')






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
    <div>

      <div className={style.content}  >
          <div className={style.containerTitles}>
            <h3  className={style.titleH3}>{recipeDetail.name}</h3>
            <div class={style.category}>
                <h3 class={style.categoryH3}>Categorias: </h3>
                  <table class={style.table}>
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
              
              <h3 className={style.difficultyH3}>Dificultad:</h3>
              <Dificultad className={style.cuadraditos} difficulty={recipeDetail.difficulty} />
              
            </div>
          </div>
          
          <div className={style.imgContainer}>
            {
              recipeDetail.availability === 'Available' ? 
              <img
                  id={style.img}
                  src={recipeDetail.img}
                  alt="imagen de comida"
                  width="500px"
                /> :
                <img src='data:image/jpeg;base64,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' alt="img not found"/>
            }
            {( recipeDetail.disabled === false && !!token && user.category === "Admin") ? 
            <div>
              <Link to={`/update/${id}`}>Editar receta</Link>
              <button  onClick={()=>handleClick(recipeDetail.id)}>Eliminar receta</button>
            </div>            
            : null
            } 
          </div>
            {/* {
          recipeDetail.availability === 'Unavailable' && 
            <div className={style.imgContainer}>
        
            </div>
            } */}
            
      </div>
      <div className={style.tabsContainer}>
            <Tabs
        id="controlled-tab-example"
        className="mb-3"
        defaultActiveKey="Ingredientes"
      >
        
        <Tab eventKey="Ingredientes" title="Ingredientes" >
          <IngredientsPanel/>
        </Tab>
        <Tab eventKey="Instrucciones" title="Instrucciones">
        <InstrunctionsPanel/>
        </Tab > 
      
        </Tabs>
            </div>
      <div className={style.contentComent}>
        <div className={style.buttonComent}>      
          <Reviews id={recipeDetail.id}/> 
          {recipeDetail.availability === 'Available' && 
            <button  onClick={() => agregarCalendario(recipeDetail)}><FaIcons.FaCalendarPlus/></button>
          }  
        </div>
        <VerComentarios id={recipeDetail.id}/> 
      </div>
      <div>
        <h2> Otras recetas</h2>
        <CardRelacionadas />
      </div>
    </div>


  );
}
