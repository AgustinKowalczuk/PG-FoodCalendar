import {
  GET_RECIPES,
  GET_INGREDIENTS,
  GET_CATEGORY,
  GET_UNIT,
  GET_DETAIL,
  SEARCH_RECIPES,
  ORDER_ZA,
  ORDER_AZ,
  ORDER_BY_DIFFICULTY,
  ORDER_BY_DIFFICULTY_INV,
  UPDATE_RECIPE,
  FILTERED_BY_INGREDIENT,
  FILTERED_BY_CATEGORY,
  FILTERED_BY_DIFFICULTY,
  SET_FORM_INGREDIENTS,
  RECIPE_CALENDAR,
  PAGE,
  CREATE_INGREDIENT,
  SET_FORM_CATEGORY,
  CREATE_CATEGORY,
  CLEAN_NEW_RECIPE,
  DELETE_INVENTARY,
  CLEAR_INVENTARY,
  GET_CALENDAR,
  GET_CALENDAR_DETAIL,
  GET_CALENDAR_USER,
  DELETE_RECIPE,
  CLEAN_DELETE_RECIPE,
  LOGIN,
  CREATE_RECIPE,
  CREATE_CALENDAR,
  CLEAN_NEW_CALENDAR,
  ADMIN_USERS,
  POST_COMENTARIO,
  GET_COMENTARIOS_RECETA,
  DELETE_USER
} from "../actions/constants";

import { orderAZ , orderDifficultyAsc } from '../orderFunction/OrderFuncions'

var initialState = {
  recipes: [],
  copyRecipe: [],
  ingredients: [],
  category:[],
  detail:{},
  unit: [],
  difficulty:[],
  page: 1,
  formIngredients:[],
  toggleAddIngredient:false,
  formCategory:[],
  toggleAddCategory:false,
  recipeCalendar: [],
  newRecipe:false,
  newRecipeId: "",
  calendary:[],
  calendarDetail:[],
  calendarUser:[],
  deleteRecipe:{},
  token: null,
  user: null,
  newCalendar: false,
  adminUsers: [],
  comments:[],
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
        page: 1
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
        case ORDER_BY_DIFFICULTY:
        return {
          ...state,
          recipes: state.recipes.slice().sort(orderDifficultyAsc)
        }
        case ORDER_BY_DIFFICULTY_INV:
        return {
          ...state,
          recipes: state.recipes.slice().sort(orderDifficultyAsc).reverse()
        }

      case GET_DETAIL:
        return {
          ...state,
          detail: action.payload
        } 
      case UPDATE_RECIPE:
        return{
          ...state,
          newRecipe: true
            } 
      case GET_UNIT:
        return {
          ...state,
          unit: action.payload
        }
      case FILTERED_BY_INGREDIENT:
          return{
            ...state,
            recipes: action.payload,
            page: 1
          }
      case FILTERED_BY_CATEGORY:
          return{
            ...state,
            recipes: action.payload,
            page: 1
          }
      case FILTERED_BY_DIFFICULTY:
          return{
            ...state,
            recipes: state.copyRecipe.filter((x) => x.difficulty === action.payload),
            page: 1
          }
      case SET_FORM_INGREDIENTS:
          return{
            ...state,
            formIngredients: action.payload
          }

      case RECIPE_CALENDAR:
        return {
          ...state,
          recipeCalendar: state.recipeCalendar.concat(action.payload)
        }
      case PAGE:
        return{
          ...state,
          page: action.payload
        }    
      case CREATE_RECIPE:
        return {
          ...state,
          newRecipe: true,
          newRecipeId: action.payload.id
        }
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
      case CLEAN_NEW_RECIPE:
        return {
          ...state,
          newRecipe: false,
          newRecipeId: ""
        }
      case DELETE_INVENTARY:
        return {
          ...state,
          recipeCalendar: state.recipeCalendar.filter((x,index)=> index !==action.payload)
        }
      case CLEAR_INVENTARY:
        return {
          ...state,
          recipeCalendar: []
        }
      case GET_CALENDAR:
        return {
          ...state,
          calendary:action.payload
        }
      case GET_CALENDAR_DETAIL:
        return {
          ...state,
          calendarDetail:action.payload
        }
      case GET_CALENDAR_USER:
        return {
          ...state,
          calendarUser:action.payload
        }
      case DELETE_RECIPE:
          return {
            ...state,
            deleteRecipe: action.payload
          }
      case CLEAN_DELETE_RECIPE:
        return {
          ...state,
          deleteRecipe:{}
        }
      case CREATE_CALENDAR:
        return {
          ...state,
          newCalendar: true
        }
      case CLEAN_NEW_CALENDAR:
        return {
          ...state,
          newCalendar: false
        }
      case LOGIN:
        return {
          ...state,
          token: action.payload.token, 
          user: action.payload.user
        }
      case ADMIN_USERS:
        return {
          ...state,
          adminUsers: action.payload
        }
       case POST_COMENTARIO:
         return {
           ...state,
           comments:[action.payload,...state.comments]
         } 
        case GET_COMENTARIOS_RECETA:
          return {
            ...state,
            comments: action.payload.reverse()
        }

      case DELETE_USER:
        return {
          ...state,
          adminUsers: state.adminUsers.filter((e) => e.id !== action.payload.id)
        }
    default:
      return state;
  }
}

export default reducer;
