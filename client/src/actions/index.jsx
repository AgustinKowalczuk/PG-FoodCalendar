import axios from "axios";
import {
  GET_RECIPES,
  GET_UNIT,
  GET_INGREDIENTS,
  GET_DETAIL,
  GET_CATEGORY,
  ORDER_ZA,
  ORDER_AZ,
  ORDER_BY_DIFFICULTY,
  ORDER_BY_DIFFICULTY_INV,
  SEARCH_RECIPES,
  FILTERED_BY_INGREDIENT,
  FILTERED_BY_DIFFICULTY,
  FILTERED_BY_CATEGORY,
  SET_FORM_INGREDIENTS,
  UPDATE_RECIPE
} from "./constants";

import {
  RECIPES_URL,
  CATEGORY_URL,
  INGREDIENTS_URL,
  UNIT,
  UNIT_URL,
  RECIPES_DETAIL_URL,
  RECIPES_SEARCH_URL,
  RECIPES_BY_INGREDIENTS_URL,
  RECIPES_BY_CATEGORY_URL,
} from "../routes";


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
  return async (dispatch) => {
    try {
      const ingredients = await axios.get(INGREDIENTS_URL);
      dispatch({ type: GET_INGREDIENTS, payload: ingredients.data, });
    } catch (error) {
      console.log("No hay  ingredientes")
    }
  };
}

export function getCategory() {
  return async (dispatch) => {
    try {
      const category = await axios.get(CATEGORY_URL);
      dispatch({ type: GET_CATEGORY, payload: category.data, });
    } catch (error) {
      console.log("No hay  categoria")
    }
  };
}

//obtener el detalle de la receta
export function getDetail(id) {
  return async function (dispatch) {
    const detail = await axios.get(RECIPES_DETAIL_URL + id);
    return dispatch({
      type: GET_DETAIL,
      payload: detail.data
    });
  };
}

export function searchRecipes(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_SEARCH_URL + `${name}`);
      console.log(filtRecipes)
      return dispatch({ type: SEARCH_RECIPES, payload: filtRecipes.data });
    } catch (error) {
      alert("No se encontraron recetas")
    }
  };
}

export function getUnit() {
  return async function (dispatch) {
    const unit = await axios.get(UNIT_URL)

    dispatch({ type: GET_UNIT, payload: unit.data })
  }
}

export function FilterRecipeByIngredient(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_BY_INGREDIENTS_URL + `${name}`);
      dispatch({ type: FILTERED_BY_INGREDIENT, payload: filtRecipes.data });
    } catch (error) {
      alert("No hay Receta con ese ingrediente")
    }
  };
}
export function FilterRecipeByDifficulty(payload) {
  return  {
    type: FILTERED_BY_DIFFICULTY, 
    payload  
  };
}
export function FilterRecipeByCategory(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_BY_CATEGORY_URL + `${name}`);
      dispatch({ type: FILTERED_BY_CATEGORY, payload: filtRecipes.data });
    } catch (error) {
      alert("No hay Receta con esa Categoria")
    }
  };
}

// Creacion de Receta

export function createRecipe(recipe){
  return async function(){
    try{
      const newRecipe = await axios.post(RECIPES_URL, {...recipe,rating: 0, category: ['Vegano', 'Tradicional']})
      console.log(newRecipe)
    }catch(error){
      alert("No se posteo la receta")
    }
  }
}

export function orderAZ() {
  return { type: ORDER_AZ }
}

export function orderZA() {
  return { type: ORDER_ZA }
}

export function orderByDifficulty() {
  return { type: ORDER_BY_DIFFICULTY }
}
export function orderByDifficultyInv() {
  return { type: ORDER_BY_DIFFICULTY_INV }
}

//modificar la receta
export function putRecipe(id,value){
  return async (dispatch)=>{
    try{
      const update = await axios.put(RECIPES_URL + `/${id}`, value);
      return dispatch ({ 
        type: UPDATE_RECIPE,
      payload:update.data})
    }catch(error){
      console.log(error)
   }}}

export function setFormIngredients(payload){
    return {type: SET_FORM_INGREDIENTS, payload}
}

export function register(usuer){
  return async function(dispatch){
    const reg = await axios.post(REGISTER, usuer)
    return dispatch(reg)
  }
}

export function createIngredient(ingredient){
  return async function(){
    try{
      const newIngredient = await axios.post(INGREDIENTS_URL, {...ingredient})
      console.log(newIngredient)
    }catch(error){
      alert("No se creó el ingrediente")
    }
  }
}