import axios from "axios";
import {GET_RECIPES, GET_INGREDIENTS}from './constants'
import {RECIPES_URL, INGREDIENTS_URL } from '../routes'



export function getRecipes() {
        return async function (dispatch){
                const recipes= await axios.get(RECIPES_URL);
                return dispatch ({
                        type: GET_RECIPES,
                        payload:recipes.data
                });
        };
}

export function getIngredients(){
        return async function (dispatch){
                const ingredients = await axios.get (INGREDIENTS_URL);
                return dispatch ({
                        type: GET_INGREDIENTS,
                        payload: ingredients.data
                })
        }
}


