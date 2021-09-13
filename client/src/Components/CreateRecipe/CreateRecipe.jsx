import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { createRecipe, getIngredients,getCategory, cleanNewRecipe, getDetail } from "../../actions/index";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "./SelectCard/SelectCard";
import SelectCategory from "./SelectCategory/SelectCategory";
import CreateIngredient from "../CreateIngredient/CreateIngredient"
import CreateCategory from "../CreateCategory/CreateCategory";
import { orderAZ } from "../../orderFunction/OrderFuncions";
import {useHistory} from 'react-router-dom'

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const toggle = useSelector((state)=>state.toggleAddIngredient)
  const toggleCat = useSelector((state)=>state.toggleAddCategory)
  let ingre = useSelector((state) => state.ingredients);
  const formIngre = useSelector((state) => state.formIngredients);
  let category = useSelector((state)=>state.category);
  const formCater=useSelector((state)=>state.formCategory);
  const history = useHistory();
  const toggleUpdateRecipe = useSelector((state) => state.newRecipe)
  

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getCategory());

  }, [dispatch,formIngre,toggle,formCater, toggleCat]);

  if (ingre[0]?.name !== ' ' && ingre.length > 0){
    ingre = ingre.sort(orderAZ)
    ingre.unshift({name: ' '})
  } else if(ingre.length > 0){
    ingre.shift();
    ingre = ingre.sort(orderAZ)
    ingre.unshift({name: ' '})
  }
  if (category[0]?.name !== ' ' && category.length > 0){
    category = category.sort(orderAZ)
    category.unshift({name: ' '})
  } else if(category.length > 0){
    category.shift();
    category = category.sort(orderAZ)
    category.unshift({name: ' '})
  }
 
  useEffect(() =>{
    if(toggleUpdateRecipe){
     history.push('/');
      dispatch(cleanNewRecipe())
    }
    }, [dispatch, history, toggleUpdateRecipe])

   
  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "Fácil",
    ingredients: [],
    img: "",
    category:[],
    premium: false,
    availability: true
  };

  const validate = (values) => {
    let error = {};

    if (!values.name) {
      error.name = "Requerido";
    } else if (!/^[^{}<>#$%&~^`/*+¿?¡!@]*$/g.test(values.name)) {
      error.name = "No es texto";
    }

    if (!values.preparation) {
      error.preparation = "Requerido";
    } else if (!/^[^{}<>#$%&~^`/*+¿?¡!@]*$/g.test(values.preparation)) {
      error.preparation = "No es texto";
    }

    if (!values.img) {
      error.img = "Requerido";
    }

    return error;
  };

  const onSubmit = (values) => {
    if(formik.values.premium==='false'){
      formik.values.premium=false
    }
    if(formik.values.premium==='true'){
      formik.values.premium=true
    }
    if(formik.values.availability==='false'){
      formik.values.availability=false
    }
    if(formik.values.availability==='true'){
      formik.values.availability=true
    }
    dispatch(createRecipe(formik.values));
    console.log("Values submit", values);

  };
  const onChangeIngredients = (values) =>{
    formik.values.ingredients = values
  }
   const onChangeCategory = (values)=>{
     formik.values.category = values
   }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    onChangeIngredients,
    onChangeCategory
  });

  
  return (
    <div class={style.centrado}>
      <form class={style.forms} onSubmit={formik.handleSubmit}>
        <div div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            name="name"
            class="form-control"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.name && formik.touched.name === true ? (
            <div class="cosoForm">
              <span>{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

        <div class="mb-3">
          <label class="form-label">Ingredientes</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`ingredients[${formik.values.ingredients.length}].ingredient`}
            id="disabledSelect"
            class="form-select"
          >
            {ingre?.map((e, index) => {
              if (!formik.values.ingredients.some(i => e.name === i.ingredient)) {
                return <option value={e.ingredient} key={`ingredient-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>
          <div class={style.buttonsRemove}>

            {formik.values.ingredients.length > 0 &&
              formik.values.ingredients.map((e, index) => {

                return <SelectCard formik={formik} onChange={onChangeIngredients} ingredient={e.ingredient} name={`ingredients[${index}]`}
                  handleChange={formik.handleChange} />
              })}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Dificultad</label>
          <select
            defaultValue="Fácil"
            onChange={formik.handleChange}
            name="difficulty"
            class="form-control"
          >
            <option name="difficulty" value="Fácil"> 
              Fácil
            </option>
            <option name="difficulty" value="Moderado">  
              Moderado
            </option>
            <option name="difficulty" value="Difícil">
              Difícil
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Preparacion</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.preparation}
            onBlur={formik.handleBlur}
            class="form-control"
            name="preparation"
            type="text"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.preparation && formik.touched.preparation === true ? (
            <div class="cosoForm">
              <span>{formik.errors.preparation}</span>
            </div>
          ) : null}
        </div>

        <div class="mb-3">
          <label class="form-label">Imagen</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.img}
            onBlur={formik.handleBlur}
            class="form-control"
            name="img"
            type="text"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.img && formik.touched.img === true ? (
            <div class="cosoForm">
              <span>{formik.errors.img}</span>
            </div>
          ) : null}
        </div>

        <div class="mb-3">
          <label class="form-label">Categorias</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`category[${formik.values.category?.length}]`}
            id="disabledSelect"
            class="form-select"
          >
            {category?.map((e, index) => {
              if (!formik.values.category.some(i => e.name === i)) {
                return <option value={e.name} key={`category-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>
          <div class={style.buttonsRemove}>
            {formik.values.category.length > 0 &&
              formik.values.category.map((e, index) => {
                return <SelectCategory formik={formik} onChange={onChangeCategory} category={e} name={`category[${index}]` }
                  handleChange={formik.handleChange} />
              })}
          </div>
        </div>

        <div>
            <label class="form-label">Tipo de receta</label>
            <select 
            onChange={formik.handleChange}
            class="form-control"
            name="premium">
              <option value={false}>Free</option>
              <option value={true}>Premium</option>
              </select>
        </div>

        <div>
            <label class="form-label">Está Disponible?</label>
            <select 
            onChange={formik.handleChange}
            class="form-control"
            name="availability">
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
              </select>
        </div>

        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
            Crear
          </button>
        </div>
      </form>
      <CreateIngredient ingre={ingre} toggle={toggle}/> <CreateCategory category={category} toggleCat={toggleCat}/>
    </div>
  );
}