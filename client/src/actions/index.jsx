import axios from "axios";
import { GET_RECIPES, GET_INGREDIENTS, SEARCH_RECIPES, ORDER_ZA, ORDER_AZ, GET_DETAIL} from "./constants";
import { RECIPES_URL, INGREDIENTS_URL, RECIPES_DETAIL_URL } from "../routes";

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

  return async function (dispatch) {
    const ingredients = await axios.get(INGREDIENTS_URL);
    return dispatch({
      type: GET_INGREDIENTS,
      payload: ingredients.data,
    });
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

  return async function (dispatch) {
    const filtRecipes = await axios.get(RECIPES_URL + `/${name}`);
    return dispatch({
      type: SEARCH_RECIPES,
      payload: filtRecipes.data,
    });
  };
}

export function orderZA(){
  return {type:ORDER_ZA}
}
export function orderAZ(){
  return {type:ORDER_AZ}
}