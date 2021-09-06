import {
  GET_RECIPES,
  GET_INGREDIENTS,
  SEARCH_RECIPES,
  ORDER_ZA,
  ORDER_AZ,
  GET_DETAIL,
  GETUNIT,
  FILTERED_BY_INGREDIENT
} from "../actions/constants";

import { orderAZ } from '../orderFunction/OrderFuncions'

var initialState = {
  recipes: [],
  copyRecipe: [],
  ingredients: [],
  detail:{},
  unit: [],
  
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
      
      case GETUNIT:
        return {
          ...state,
          unit: action.payload
        }
        case FILTERED_BY_INGREDIENT:
          return{
            ...state,
            recipes: action.payload
          }
        
    default:
      return state;
  }
}

export default reducer;
