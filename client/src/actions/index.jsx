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
  CALENDAR_FILTER,
  UPDATE_RECIPE,
  PAGE,
  CREATE_INGREDIENT,
  SET_FORM_CATEGORY,
  CREATE_CATEGORY,
  CLEAN_NEW_RECIPE,
  LOGIN,
  REGISTER
} from "./constants";

import {
  RECIPES_URL,
  RECIPES_USER_URL,
  RECIPES_GUEST_URL,
  CATEGORY_URL,
  INGREDIENTS_URL,
  UNIT_URL,
  RECIPES_DETAIL_USER_URL,
  RECIPES_DETAIL_GUEST_URL,
  RECIPES_SEARCH_USER_URL,
  RECIPES_SEARCH_GUEST_URL,
  RECIPES_BY_INGREDIENTS_USER_URL,
  RECIPES_BY_INGREDIENTS_GUEST_URL,
  RECIPES_BY_CATEGORY_USER_URL,
  RECIPES_BY_CATEGORY_GUEST_URL,
  REGISTER_URL,
  LOGIN_URL
} from "../routes";
import { config } from "./config";


export function getRecipes(token) {
  const url = token ? RECIPES_USER_URL : RECIPES_GUEST_URL;
  //me trae las recetas de la db
  return async function (dispatch) {
    const recipes = await axios.get(url, config(token));
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
export function getDetail(id,token) {
  const url = token ? RECIPES_DETAIL_USER_URL : RECIPES_DETAIL_GUEST_URL;
  return async function (dispatch) {
    const detail = await axios.get(url + id, config(token));
    return dispatch({
      type: GET_DETAIL,
      payload: detail.data
    });
  };
}

export function searchRecipes(name,token) {
  const url = token ? RECIPES_SEARCH_USER_URL : RECIPES_SEARCH_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
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

export function FilterRecipeByIngredient(name,token) {
  const url = token ? RECIPES_BY_INGREDIENTS_USER_URL : RECIPES_BY_INGREDIENTS_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
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
export function FilterRecipeByCategory(name,token) {
  const url = token ? RECIPES_BY_CATEGORY_USER_URL : RECIPES_BY_CATEGORY_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
      dispatch({ type: FILTERED_BY_CATEGORY, payload: filtRecipes.data });
    } catch (error) {
      alert("No hay Receta con esa Categoria")
    }
  };
}

// Creacion de Receta

export function createRecipe(recipe,token){
  return async function(){
    try{
      const newRecipe = await axios.post(RECIPES_URL, {...recipe,rating: 0}, config(token));
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
export function putRecipe(id,value,token){
  return async (dispatch)=>{
    try{
      const update = await axios.put(RECIPES_URL + `/${id}`, value, config(token));
      return dispatch ({ 
        type: UPDATE_RECIPE,
      payload:update.data})
    }catch(error){
      console.log(error)
   }}}

export function setFormIngredients(payload){
    return {type: SET_FORM_INGREDIENTS, payload}
}

export function register(user){
  return async function(dispatch){
    try {
      const reg = await axios.post(REGISTER_URL, user)
      return dispatch({
        type: REGISTER,
        payload: reg.data
      })
    } catch (error) {
      return console.log(error);
    }
    
  }
}

export function login(user){
  return async function(dispatch){
    try {
      const logi = await axios.post(LOGIN_URL, user)
      return dispatch({
        type: LOGIN,
        payload: logi.data
      })
    } catch(error) {
      return console.log(error);
    }
    
  }
}


export function createIngredient(ingredient, token){
  return async function(dispatch){
    try{
      const newIngredient = await axios.post(INGREDIENTS_URL, {...ingredient}, config(token))
      return dispatch({type:CREATE_INGREDIENT})
    }catch(error){
      alert("No se creó el ingrediente")
    }
  }
}

// Calendario

export function getCalendar(payload){
  return { type: CALENDAR_FILTER, payload }
}
export function page(payload){
  return{
    type: PAGE,
    payload
  }
}

export function setFormCategory(payload){
  return {type: SET_FORM_CATEGORY, payload}
}

export function createCategory(category,token){
  return async function(dispatch){
    try{
      const newCategory = await axios.post(CATEGORY_URL, {...category}, config(token))
      return dispatch({type:CREATE_CATEGORY})
    }catch(error){
      alert("No se creó la categoría")
    }
  }
}

export function cleanNewRecipe(){
  return {type: CLEAN_NEW_RECIPE}
}

export function setUserAndToken(payload){
  return {type: LOGIN, payload}
}
