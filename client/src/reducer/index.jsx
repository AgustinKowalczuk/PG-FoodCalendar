import {
  GET_RECIPES,
  GET_INGREDIENTS,
  SEARCH_RECIPES,
} from "../actions/constants";

var initialState = {
  recipes: [],
  copyRecipe: [],
  ingredients: [],
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

    default:
      return state;
  }
}

export default reducer;
