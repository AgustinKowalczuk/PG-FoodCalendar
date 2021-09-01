
import{GET_RECIPES, GET_INGREDIENTS }from '../actions/constants'
var initialState={
        recipes:[],
        ingredients:[],
}
function reducer(state = initialState, action) {
        switch (action.type){
                case GET_RECIPES:
               return {
                ...state,
                recipes: action.payload,
               };
               case GET_INGREDIENTS:
               return {
                ...state,
                ingredients: action.payload,
               }
               default: return state;
        }
        
}

export default reducer;
