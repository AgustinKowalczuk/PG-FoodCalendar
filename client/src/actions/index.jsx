import axios from "axios";
import { GET_RECIPES, GET_INGREDIENTS, SEARCH_RECIPES, ORDER_ZA, ORDER_AZ} from "./constants";
import { RECIPES_URL, INGREDIENTS_URL } from "../routes";

export function getRecipes() {

  return async function (dispatch) {
    const recipes = await axios.get(RECIPES_URL);
    return dispatch({
      type: GET_RECIPES,
      payload: recipes.data,
    });
  };
}

export function getIngredients() {

  return async function (dispatch) {
    const ingredients = await axios.get(INGREDIENTS_URL);
    return dispatch({
      type: GET_INGREDIENTS,
      payload: ingredients.data,
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