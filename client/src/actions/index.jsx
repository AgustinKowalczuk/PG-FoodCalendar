import axios from "axios";
import swal from 'sweetalert';
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
  RECIPE_CALENDAR,
  UPDATE_RECIPE,
  PAGE,
  CREATE_INGREDIENT,
  SET_FORM_CATEGORY,
  CREATE_CATEGORY,
  CLEAN_NEW_RECIPE,
  DELETE_INVENTARY,
  CLEAR_INVENTARY,
  GET_CALENDAR,
  GET_CALENDAR_DETAIL,
  DELETE_RECIPE,
  CLEAN_DELETE_RECIPE,
  LOGIN,
  REGISTERED,
  CREATE_RECIPE,
  CREATE_CALENDAR,
  CLEAN_NEW_CALENDAR,
  ADMIN_USERS,
  POST_COMENTARIO,
  GET_COMENTARIOS_RECETA,
  DELETE_USER,
  CALENDAR_SEND,
  UPDATE_USER,
  POST_LIKE,
  DELETE_REVIEWS,
  PUT_REVIEWS,
  GET_USER_DETAIL,
  RECOVER_PASS,
  SET_CALENDAR,
  GET_GOOGLE_AUTH,
  RESET_PAGE,
  PUT_USER_DETAILS,
  DELETE_SELF_USER,
  CLEAN_GOOGLE_AUTH,
  GET_CHECKOUT,
  SET_USER_REGISTER,
  CLEAN_REGISTERED,
  UPLOAD_IMG
} from "./constants";

import {
  RECIPES_URL,
  CATEGORY_URL,
  INGREDIENTS_URL,
  UNIT_URL,
  REGISTER_URL,
  LOGIN_URL,
  CALENDAR_URL,
  RECIPES_USER_URL,
  RECIPES_GUEST_URL,
  RECIPES_DETAIL_USER_URL,
  RECIPES_DETAIL_GUEST_URL,
  RECIPES_SEARCH_USER_URL,
  RECIPES_SEARCH_GUEST_URL,
  RECIPES_BY_INGREDIENTS_USER_URL,
  RECIPES_BY_INGREDIENTS_GUEST_URL,
  RECIPES_BY_CATEGORY_USER_URL,
  RECIPES_BY_CATEGORY_GUEST_URL,
  CALENDAR_USER_URL,
  ADMIN_USERS_URL,
  POST_COMENTARIO_URL,
  GET_COMENTARIOS_RECETA_URL,
  ADMIN_USERS_DELETE_URL,
  UPDATE_USERS_URL,
  POST_LIKE_URL,
  DELETE_REVIEWS_URL,
  PUT_REVIEWS_URL,
  GET_USER_DETAILS_URL,
  PUT_RECOVERY_PASS_URL,
  GET_GOOGLE_AUTH_URL,
  PUT_USER_DETAILS_URL,
  USERS_DELETE_URL,
  GET_CHECKOUT_URL
} from "../routes";

import config from './config';

export function getRecipes(token) {
  const url = token ? RECIPES_USER_URL : RECIPES_GUEST_URL;
  //me trae las recetas de la db
  return async function (dispatch) {
    try {
      const recipes = await axios.get(url, config(token));
      return dispatch({
        type: GET_RECIPES,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//me trae los ingredientes de la db
export function getIngredients() {
  return async (dispatch) => {
    try {
      const ingredients = await axios.get(INGREDIENTS_URL);
      return dispatch({ type: GET_INGREDIENTS, payload: ingredients.data, });
    } catch (error) {
      console.log("No hay  ingredientes");
      console.log(error);
    }
  };
}

export function getCategory() {
  return async (dispatch) => {
    try {
      const category = await axios.get(CATEGORY_URL);
      dispatch({ type: GET_CATEGORY, payload: category.data, });
    } catch (error) {
      console.log("No hay  categoria");
      console.log(error);
    }
  };
}

//obtener el detalle de la receta
export function getDetail(id, token) {
  const url = !!token ? RECIPES_DETAIL_USER_URL : RECIPES_DETAIL_GUEST_URL;
  return async function (dispatch) {
    try {
      const detail = await axios.get(url + id, config(token));
      return dispatch({
        type: GET_DETAIL,
        payload: detail.data
      });
    } catch (error) {
      console.log(error);
    }

  };
}

export function searchRecipes(name, token) {
  const url = token ? RECIPES_SEARCH_USER_URL : RECIPES_SEARCH_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
      return dispatch({ type: SEARCH_RECIPES, payload: filtRecipes.data });
    } catch (error) {
      console.log(error);
      swal({
        title: "No se encontro",
        text: "Escribio una receta o algo que no existe",
        icon: "error",
        button: "Aceptar",
      })
    }
  };
}

export function getUnit() {
  return async function (dispatch) {
    try {
      const unit = await axios.get(UNIT_URL);
      return dispatch({ type: GET_UNIT, payload: unit.data })
    } catch (error) {
      console.log(error);
    }
  }
}

export function FilterRecipeByIngredient(name, token) {
  const url = token ? RECIPES_BY_INGREDIENTS_USER_URL : RECIPES_BY_INGREDIENTS_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
      dispatch({ type: FILTERED_BY_INGREDIENT, payload: filtRecipes.data });
    } catch (error) {
      swal({
        title: "No hay Receta con ese ingrediente",
        icon: "error",
        button: "Aceptar",
      })
      console.log(error);
    }
  };
}

export function FilterRecipeByDifficulty(payload) {
  return {
    type: FILTERED_BY_DIFFICULTY,
    payload
  };
}

export function FilterRecipeByCategory(name, token) {
  const url = token ? RECIPES_BY_CATEGORY_USER_URL : RECIPES_BY_CATEGORY_GUEST_URL;
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(url + `${name}`, config(token));
      dispatch({ type: FILTERED_BY_CATEGORY, payload: filtRecipes.data });
    } catch (error) {
      swal({
        title: "No hay Receta con esa Categoria",
        icon: "error",
        button: "Aceptar",
      })
      console.log(error);
    }
  };
}

// Creacion de Receta
export function createRecipe(recipe, token) {
  return async function (dispatch) {
    try {
      const newRecipe = await axios.post(RECIPES_URL, { ...recipe, rating: 0 }, config(token));
      swal({
        title: "Receta Creada",
        text: "Se creo la receta con exito",
        iicon: "success",
        button: "Aceptar",
      })
      return dispatch({ type: CREATE_RECIPE, payload: newRecipe.data });
    } catch (error) {
      swal({
        title: "No se posteo la receta",
        icon: "error",
        button: "Aceptar",
      })
      console.log(error);
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
export function putRecipe(id, value, token) {
  return async (dispatch) => {
    try {
      const update = await axios.put(RECIPES_URL + `/${id}`, value, config(token));
      return dispatch({
        type: UPDATE_RECIPE,
        payload: update.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function setFormIngredients(payload) {
  return { type: SET_FORM_INGREDIENTS, payload }
}

export function register(user) {
  return async function (dispatch) {
    try {
      const reg = await axios.post(REGISTER_URL, user);
      if (reg.data.registered) {
        swal({
          title: "Cuenta Registrada",
          text: "Te registraste con exito",
          icon: "success",
          button: "Aceptar",
        })
      }
      return dispatch({
        type: REGISTERED,
        payload: reg.data
      })
    } catch (error) {
      console.log(error);
      return swal({
        title: "Cuenta no Registrada",
        text: "Tu cuenta no se a podido registrar",
        icon: "error",
        button: "Aceptar",
      })
    }
  }
}

export function putRecoveryPass(email) {
  return async (dispatch) => {
    try {
      const recover = await axios.put(PUT_RECOVERY_PASS_URL + `/${email}`);
      return dispatch({
        type: RECOVER_PASS,
        payload: recover.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function login(user) {
  return async function (dispatch) {
    try {
      const logi = await axios.post(LOGIN_URL, user);
      swal({
        title: "Bienvenido!!",
        text: "Ingresaste a tu cuenta con exito",
        icon: "success",
        button: "Aceptar",
      })
      return dispatch({
        type: LOGIN,
        payload: logi.data
      })
    } catch (error) {
      return swal({
        title: "No ingresaste a tu cuenta",
        text: "No ingresaste a tu cuenta con exito",
        icon: "error",
        button: "Aceptar",
      })
    }
  }
}

export function createIngredient(ingredient, token) {
  return async function (dispatch) {
    try {
      await axios.post(INGREDIENTS_URL, { ...ingredient }, config(token));
      return dispatch({ type: CREATE_INGREDIENT });
    } catch (error) {
      swal({
        title: "No se creó el ingrediente",
        icon: "error",
        button: "Aceptar",
      })
      console.log(error);
    }
  }
}

// Enviar recetas  al stack del Calendario
export function setRecipeCalendar(payload) {
  return {
    type: RECIPE_CALENDAR,
    payload
  }
}

export function page(payload) {
  return {
    type: PAGE,
    payload
  }
}

export function postcalendar(obj, token) {
  return async function (dispatch) {
    try {
      const aux = await axios.post(CALENDAR_URL, obj, config(token));
      swal({
        title: "Calendario Guardado",
        text: "El calendario se guardó con éxito",
        icon: "success",
        button: "Aceptar",
      })
      localStorage.clear();
      return dispatch({ type: CREATE_CALENDAR, payload: aux.data });
    } catch (error) {
      console.log(error);
      return swal({
        title: "Calendario no Guardado",
        text: "Faltan parametros para poder guardar el calendario",
        icon: "error",
        button: "Aceptar",
      });
    }
  }
}

export function cleanNewCalendar() {
  return { type: CLEAN_NEW_CALENDAR };
}

export function setFormCategory(payload) {
  return { type: SET_FORM_CATEGORY, payload }
}

export function createCategory(category, token) {
  return async function (dispatch) {
    try {
      const newCategory = await axios.post(CATEGORY_URL, { ...category }, config(token));
      return dispatch({ type: CREATE_CATEGORY, payload: newCategory.data });
    } catch (error) {
      console.log(error);
      return swal({
        title: "No se creó la categoría",
        icon: "error",
        button: "Aceptar",
      });
    }
  }
}

export function cleanNewRecipe() {
  return { type: CLEAN_NEW_RECIPE }
}

//Borra item del inventario
export function deleteInventary(i) {
  return {
    type: DELETE_INVENTARY,
    payload: i
  }
}

//Borra todos los items del inventario
export function clearInventary() {
  return {
    type: CLEAR_INVENTARY
  }
}

export function getCalendar(token) {
  return async function (dispatch) {
    try {
      const calendary = await axios.get(CALENDAR_URL, config(token));
      return dispatch({
        type: GET_CALENDAR,
        payload: calendary.data
      })
    } catch (error) {
      console.log(error);
      return alert("No existen calendarios o el usuario no se logueó");
    }
  }
}

export function getCalendarUser(token) {
  return async function (dispatch) {
    try {
      const calendary = await axios.get(CALENDAR_USER_URL, config(token));
      return dispatch({
        type: GET_CALENDAR,
        payload: calendary.data
      })
    } catch (error) {
      console.log(error);
      return alert("No existen calendarios o el usuario no se logueó");
    }
  }
}

export function getCalendarDetail(id, token) {
  return async function (dispatch) {
    try {
      const calendarDetail = await axios.get(CALENDAR_URL + '/' + id, config(token));
      return dispatch({
        type: GET_CALENDAR_DETAIL,
        payload: calendarDetail.data
      });
    } catch (error) {
      console.log(error);
      return swal({
        title: "No existe el calendario o el usuario no se logueó",
        icon: "error",
        button: "Aceptar",
      });
    }
  };
}

export function deleteRecipe(id, token) {
  return async function (dispatch) {
    try {
      const borrar = await axios.delete(RECIPES_URL + '/' + id, config(token));
      swal({
        title: "Receta Borrada!",
        icon: "success",
        button: "Aceptar",
      });
      return dispatch({
        type: DELETE_RECIPE,
        payload: borrar.data
      });
    } catch (error) {

      console.log(error)
      return swal({
        title: "No existen calendarios o el usuario no se logueó",
        icon: "error",
        button: "Aceptar",
      });
    }
  };
}

export function cleanDeleteRecipe() {
  return { type: CLEAN_DELETE_RECIPE }
}

export function setUserAndToken(payload) {
  return { type: LOGIN, payload }
}

export function setUserForAdmin(token) {
  return async function (dispatch) {
    try {
      const adminUsers = await axios.get(ADMIN_USERS_URL, config(token));
      return dispatch({
        type: ADMIN_USERS,
        payload: adminUsers.data
      })
    }
    catch (error) {
      return swal({
        title: 'No existen los usuarios.',
        icon: "error",
        button: "Aceptar",
      });
    }
  }
}

export function deleteUserForAdmin(id, token) {
  return async function (dispatch) {
    try {
      const deleteUsers = await axios.delete(ADMIN_USERS_DELETE_URL + '/' + id, config(token));
      swal({
        title: 'Usuario eliminado',
        icon: 'success',
        button: 'Aceptar'
      })
      return dispatch({
        type: DELETE_USER,
        payload: deleteUsers.data
      })
    }
    catch (error) {
      return swal({
        title: 'No se puede borrar el usuario.',
        icon: "error",
        button: "Aceptar",
      });
    }
  }
}

export function postComentario(valor, id, token) {
  return async function (dispatch) {
    try {
      const aux = await axios.post(POST_COMENTARIO_URL + '/' + id, valor, config(token));
      console.log(aux.data, 'aux')
      return dispatch({ type: POST_COMENTARIO, payload: aux.data });
    } catch (error) {
      console.log(error);
      return swal({
        title: "El comentario no fue enviado",
        icon: "error",
        button: "Aceptar",
      });
    }
  }
}

export function getComentarios(id) {
  return async function (dispatch) {
    try {
      const comentarios = await axios.get(GET_COMENTARIOS_RECETA_URL + '/' + id);
      console.log(comentarios.data)
      return dispatch({
        type: GET_COMENTARIOS_RECETA,
        payload: comentarios.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sendCalendar(recipe) {

  return { type: CALENDAR_SEND, payload: recipe }
}
export function updateUser(id, obj, token) {
  return async (dispatch) => {
    try {
      const update = await axios.put(UPDATE_USERS_URL + `/${id}`, obj, config(token));

      swal({
        title: 'Se cambio el usuario',
        icon: 'success',
        button: 'Aceptar'
      })
      return dispatch({
        type: UPDATE_USER,
        payload: update.data
      })
    } catch (error) {
      swal({
        title: 'No se pudo cambiar al usuario',
        icon: 'error',
        button: 'Aceptar'
      })
    }
  }
}
export function postLike(id, token) {
  console.log(id, token)
  return async (dispatch) => {
    try {
      const aux = await axios.post(POST_LIKE_URL + `/${id}`, {}, config(token));
      return dispatch({
        type: POST_LIKE,
        payload: aux.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function deleteReviews(id, token) {
  return async function (dispatch) {
    try {

      const borrar = await axios.delete(DELETE_REVIEWS_URL + '/' + id, config(token));
      swal({
        title: "Comentario borrado",
        icon: "success",
        button: "Aceptar",
      });

      return dispatch({
        type: DELETE_REVIEWS,
        payload: borrar.data
      });
    } catch (error) {
      console.log(error);
      return swal({
        title: "No existen comentarios para borrar",
        icon: "error",
        button: "Aceptar",
      });
    }
  };
}
export function putReviews(idReview, valor, token) {
  return async (dispatch) => {
    try {
      const putrev = await axios.put(PUT_REVIEWS_URL + `/${idReview}`, valor, config(token));
      return dispatch({
        type: PUT_REVIEWS,
        payload: putrev.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getComentaryDetail(id, token) {
  return async function (dispatch) {
    try {
      const comentaryDetail = await axios.get(GET_USER_DETAILS_URL + '/' + id, config(token));
      return dispatch({
        type: GET_USER_DETAIL,
        payload: comentaryDetail.data
      });
    } catch (error) {
      return swal({
        title: "No existen comentarios de este usuario",
        icon: "error",
        button: "Aceptar",
      });
    }
  };
}
export function setCalendar(payload) {
  return {
    type: SET_CALENDAR,
    payload
  }
}

export function getGoogleAuthUrl(type) {
  return async function (dispatch) {
    try {
      const response = await axios.get(GET_GOOGLE_AUTH_URL + '/' + type)
      return dispatch({
        type: GET_GOOGLE_AUTH,
        payload: response.data
      })
    } catch (error) {
      swal({
        title: "Cuenta no Registrada",
        text: "Tu cuenta no se a podido registrar",
        icon: "error",
        button: "Aceptar",
      })
    }
  }
}
export function putUserDetails(value, token) {
  return async function (dispatch) {
    try {
      const putUserDetails = await axios.put(PUT_USER_DETAILS_URL, value, config(token));
      swal({
        title: 'Se a modificado con exito',
        icon: 'success',
        button: 'Aceptar'
      })
      return dispatch({
        type: PUT_USER_DETAILS,
        payload: putUserDetails.data
      })
    } catch (error) {
      return swal({
        title: 'No se realizaron los cambios',
        icon: 'error',
        button: 'Aceptar'
      })
    }
  }
}

export function deleteSelfUser(token) {
  return async function (dispatch) {
    try {
      const deleteUser = await axios.delete(USERS_DELETE_URL, config(token));
      swal({
        title: 'Se borró al usuario',
        icon: 'error',
        button: 'Aceptar'
      })
      return dispatch({
        type: DELETE_SELF_USER,
        payload: deleteUser.data
      })
    }
    catch (error) {
      return console.log('No se puede borrar el usuario.')
    }
  }
}

export function cleanGoogleAuthUrl() {
  return { type: CLEAN_GOOGLE_AUTH }
}

///////////////////// Page
export function resetPage() {
  return { type: RESET_PAGE }
}
///CHECKOUT

export function getCheckout() {

  return async function (dispatch) {
    try {
      const aux = await axios.get(GET_CHECKOUT_URL);
      return dispatch({ type: GET_CHECKOUT, payload: aux.data });
    } catch (error) {
      console.log(error);
    }
  }
}

export function setUserRegister(userRegister) {
  return {
    type: SET_USER_REGISTER,
    payload: userRegister
  }
}

export function cleanRegistered() {
  return {
    type: CLEAN_REGISTERED
  }
}

export function getImages(payload) {
  return {
    type: UPLOAD_IMG,
    payload
  }
}
