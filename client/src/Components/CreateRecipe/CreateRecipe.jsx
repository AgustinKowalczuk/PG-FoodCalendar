import React, { useEffect, useReducer } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { createRecipe, getIngredients,getCategory, cleanNewRecipe, getDetail } from "../../actions/index";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "./SelectCard/SelectCard";
import SelectCategory from "./SelectCategory/SelectCategory";
import CreateIngredient from "../CreateIngredient/CreateIngredient"
import CreateCategory from "../CreateCategory/CreateCategory";
import { orderAZ } from "../../orderFunction/OrderFuncions";
import {useHistory} from 'react-router-dom';
import UploadImage from "./UploadImage/UploadImage";
import swal from 'sweetalert';

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const toggle = useSelector((state)=>state.toggleAddIngredient)
  const toggleCat = useSelector((state)=>state.toggleAddCategory)
  let ingre = useSelector((state) => state.ingredients);
  const formIngre = useSelector((state) => state.formIngredients);
  let category = useSelector((state)=>state.category);
  const formCater=useSelector((state)=>state.formCategory);
  const history = useHistory();
  const newRecipe = useSelector((state) => state.newRecipe)
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);
  const newRecipeId = useSelector(state => state.newRecipeId);
  const uploadImg = useSelector((state) => state.uploadImg)
  
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
    if(newRecipe){
      dispatch(getDetail(newRecipeId,token));
    }
    }, [dispatch, history, newRecipe]);

    useEffect(() =>{
      if(newRecipeId){
        history.push('/recipe/' + newRecipeId);
        dispatch(cleanNewRecipe());
      }
    }, [dispatch, history, newRecipeId]);
   
  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "Fácil",
    ingredients: [],
    img: "",
    category:[],
    premium: false,
    availability: false
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
  //console.log(uploadImg, 'estoy afuera')
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
    if(formik.values.img === ''){
      formik.values.img = uploadImg;
    }
    console.log(uploadImg, 'estoy adentro')
    console.log("Values submit", formik.values);
    dispatch(createRecipe(formik.values,token));
    swal({
      title: "Receta Creada",
      text: "Se creo la receta con exito",
      iicon: "success",
      button: "Aceptar",
    })
    console.log("Values submit", values);
  };
  const onChangeIngredients = (values) =>{
    formik.values.ingredients = values
  }
  const onChangeCategory = (values)=>{
    formik.values.category = values
    console.log(formik.values);
  }
  const onChangeImage = (values)=>{
    formik.values.img = values
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    onChangeIngredients,
    onChangeCategory,
    onChangeImage
  });

  
  return (
    <div className={style.centrado}>
      <form className={style.forms} onSubmit={formik.handleSubmit}>
        <div div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.name && formik.touched.name === true ? (
            <div className="cosoForm">
              <span>{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredientes</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`ingredients[${formik.values.ingredients.length}].ingredient`}
            id="disabledSelect"
          >
            {ingre?.map((e, index) => {
              if (!formik.values.ingredients.some(i => e.name === i.ingredient)) {
                return <option value={e.ingredient} key={`ingredient-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>
          <div className={style.buttonsRemove}>

            {formik.values.ingredients.length > 0 &&
              formik.values.ingredients.map((e, index) => {

                return <SelectCard formik={formik} onChange={onChangeIngredients} ingredient={e.ingredient} name={`ingredients[${index}]`}
                  handleChange={formik.handleChange} />
              })
              }
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Dificultad</label>
          <select
            defaultValue="Fácil"
            onChange={formik.handleChange}
            name="difficulty"
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

        <div className="mb-3">
          <label className="form-label">Preparacion</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.preparation}
            onBlur={formik.handleBlur}
            name="preparation"
            type="text"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.preparation && formik.touched.preparation === true ? (
            <div className="cosoForm">
              <span>{formik.errors.preparation}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <UploadImage onChange={onChangeImage}/>
          {formik.errors.img && formik.touched.img === true ? (
            <div className="cosoForm">
              <span>{formik.errors.img}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Categorias</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`category[${formik.values.category?.length}]`}
            id="disabledSelect"
          >
            {category?.map((e, index) => {
              if (!formik.values.category.some(i => e.name === i)) {
                return <option value={e.name} key={`category-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>
          <div className={style.buttonsRemove}>
            {formik.values.category.length > 0 &&
              formik.values.category.map((e, index) => {
                return <SelectCategory formik={formik} onChange={onChangeCategory} category={e} name={`category[${index}]` }
                  handleChange={formik.handleChange} />
              })}
          </div>
        </div>

        <div>
            <label className="form-label">Tipo de receta</label>
            <select 
            onChange={formik.handleChange}
            name="premium">
              <option value={false}>Free</option>
              <option value={true}>Premium</option>
              </select>
        </div>
              {!!token && (user.category === 'Admin') &&
          <div>
              <label className="form-label">Está Disponible?</label>
              <select 
              onChange={formik.handleChange}
              name="availability">
                <option value={false}>Unavailable</option>
                <option value={true}>Available</option>
                </select>
          </div>
            }
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3" id={style.btnCreate}>
            Crear
          </button>
        </div>
      </form>
      <CreateIngredient ingre={ingre} toggle={toggle}/> 
      <CreateCategory category={category} toggleCat={toggleCat}/>
    </div>
  );
}