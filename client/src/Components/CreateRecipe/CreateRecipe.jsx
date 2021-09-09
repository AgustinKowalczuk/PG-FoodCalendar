import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { createRecipe, getIngredients,getCategory } from "../../actions/index";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "./SelectCard/SelectCard";
import SelectCategory from "./SelectCategory/SelectCategory";
import CreateIngredient from "../CreateIngredient/CreateIngredient"
import CreateCategory from "../CreateCategory/CreateCategory";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const toggle = useSelector((state)=>state.toggleAddIngredient)
  const toggleCat = useSelector((state)=>state.toggleAddCategory)
  const ingre = useSelector((state) => state.ingredients);
  const formIngre = useSelector((state) => state.formIngredients);
  const category = useSelector((state)=>state.category)
  const formCater=useSelector((state)=>state.formCategory)

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getCategory());
  }, [dispatch,formIngre,toggle,formCater, toggleCat]);

  useEffect(()=>{
   console.log(formik.values) 
  },[formCater])

  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "",
    ingredients: [],
    img: "",
    category:[],
    premium:'',
    availability:''
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
            {ingre?.map((e) => {
              return (
                <option name="ingredients" value={e.name}>
                  {e.name}
                </option>
              );
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
            {category?.map((e) => {
              return (
                <option name="category" value={e.name}>
                  {e.name}
                </option>
              );
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
            <label class="form-label">Tipo de usuario</label>
            <select 
            onChange={formik.handleChange}
            class="form-control"
            name="premium">
              <option value={true}>Premium</option>
              <option value={false}>Free</option>
              </select>
        </div>

        <div>
            <label class="form-label">Esta Disponible?</label>
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