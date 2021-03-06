import axios from "axios";
import { GET_RECIPES, GETUNIT, GET_INGREDIENTS, SEARCH_RECIPES, ORDER_ZA, ORDER_AZ, GET_DETAIL,FILTERED_BY_INGREDIENT, SET_FORM_INGREDIENTS} from "./constants";
import { RECIPES_URL, INGREDIENTS_URL, RECIPES_DETAIL_URL, UNIT ,RECIPES_SEARCH_URL,RECIPES_BY_INGREDIENTS} from "../routes";

export function getRecipes() {

//me trae las recetas de la db
  return async function (dispatch) {
    const recipes = await axios.get(RECIPES_URL);
    return dispatch({
      type: GET_RECIPES,
      payload: recipes.data,
    });
  };
}
//me trae los ingredientes de la db
export function getIngredients() {
  return async  (dispatch) => {
    try{
      const ingredients = await axios.get(INGREDIENTS_URL);
    dispatch({type: GET_INGREDIENTS, payload: ingredients.data,});
    }catch(error){
      console.log("No hay Resultado BB")
    }
  };
}
//obtener el detalle de la receta
export function getDetail (id){
  return async function (dispatch) {
    const detail = await axios.get(RECIPES_DETAIL_URL + id);
      return dispatch({
      type: GET_DETAIL,
      payload: detail.data
    });
  };
}
// Despues voy a realizar cambios en la function y el el axios
export function searchRecipes(name) {
  return async  (dispatch) => {
    try{
      const filtRecipes = await axios.get(RECIPES_SEARCH_URL + `${name}`);
      console.log(filtRecipes)
      return dispatch({ type: SEARCH_RECIPES, payload: filtRecipes.data});
    }catch(error){
     alert("No se encontraron recetas")
      //return dispatch({ type: SEARCH_RECIPES, payload: ['No encontrado']})
    }
  };
}

// Creacion de Receta

export function createRecipe(recipe){
  return async function(){
    try{
      const newRecipe = await axios.post(RECIPES_URL, {...recipe,rating: 0, category: ['malo', 'vegano']})
      console.log(newRecipe)
    }catch(error){
      alert("No se posteo la ReCiPe")
    }
  }
}

export function getUnit(){
  return async function (dispatch){
    const unit = await axios.get(UNIT)

    dispatch({type:GETUNIT, payload: unit.data})
  }
}

export function orderZA(){
  return {type:ORDER_ZA}
}
export function orderAZ(){
  return {type:ORDER_AZ}
}

export function FilterRecipeByIngredient(name) {
  return async  (dispatch) => {
    try{
      const filtRecipes = await axios.get(RECIPES_BY_INGREDIENTS + `${name}`);
       dispatch({ type: FILTERED_BY_INGREDIENT, payload: filtRecipes.data});
    }catch(error){
      alert("Error En Filtro")
    }
  };
}
export function setFormIngredients(payload){
    return {type: SET_FORM_INGREDIENTS, payload}
}