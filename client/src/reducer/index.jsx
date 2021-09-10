import {
  GET_RECIPES,
  GET_INGREDIENTS,
  GET_CATEGORY,
  GET_UNIT,
  GET_DETAIL,
  SEARCH_RECIPES,
  ORDER_ZA,
  ORDER_AZ,
  UPDATE_RECIPE,
  FILTERED_BY_INGREDIENT,
  FILTERED_BY_CATEGORY,
  FILTERED_BY_DIFFICULTY,
  SET_FORM_INGREDIENTS,
  CALENDAR_FILTER,
  CREATE_INGREDIENT,
  SET_FORM_CATEGORY,
  CREATE_CATEGORY
} from "../actions/constants";

import { orderAZ } from '../orderFunction/OrderFuncions'

var initialState = {
  recipes: [],
  copyRecipe: [],
  ingredients: [],
  category:[],
  detail:{},
  update:{},
  unit: [],
  difficulty:[],
  formIngredients:[],
  toggleAddIngredient:false,
  formCategory:[],
  toggleAddCategory:false,
  calendar: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipe: action.payload
      };

    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
      case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    
      case ORDER_AZ:
        return {
          ...state,
          recipes: state.recipes.slice().sort(orderAZ)
        }
      
      case ORDER_ZA:
        return {
          ...state,
          recipes: state.recipes.slice().sort(orderAZ).reverse()
        }

      case GET_DETAIL:
        return {
          ...state,
          detail: action.payload
        } 
      case UPDATE_RECIPE:
        return{
          ...state,
          update: action.payload
            } 
      case GET_UNIT:
        return {
          ...state,
          unit: action.payload
        }
      case FILTERED_BY_INGREDIENT:
          return{
            ...state,
            recipes: action.payload
          }
      case FILTERED_BY_CATEGORY:
          return{
            ...state,
            recipes: action.payload
          }
      case FILTERED_BY_DIFFICULTY:
          return{
            ...state,
            recipes: state.copyRecipe.filter((x) => x.difficulty === action.payload)
          }
      case SET_FORM_INGREDIENTS:
          return{
            ...state,
            formIngredients: action.payload
          }
<<<<<<< HEAD
          
      case CALENDAR_FILTER: 
      return {
        ...state,
        calendar: state.calendar.slice(0,14).push(action.payload)
      }
=======
      case CREATE_INGREDIENT:
          return {
            ...state,
            toggleAddIngredient: !state.toggleAddIngredient
            }
      case SET_FORM_CATEGORY:
          return {
            ...state,
            formCategory:action.payload
              }
      case CREATE_CATEGORY:
        return {
          ...state,
          toggleAddCategory: !state.toggleAddCategory
        }
>>>>>>> CopiaSeguridad
    default:
      return state;
  }
}

export default reducer;
