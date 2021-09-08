import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { putRecipe,  getIngredients } from "../../actions/index";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "../CreateRecipe/SelectCard/SelectCard";
import {Link, useParams} from "react-router-dom"

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const {id} = useParams()
  const ingre = useSelector((state) => state.ingredients);
  const formIngre = useSelector((state) => state.formIngredients);
  const update = useSelector((state) => state.detail);
   
    useEffect(() => {
    dispatch(getIngredients());
    }, [dispatch, formIngre]);
    
   useEffect(() => {  
      formik.values.name= update.name
      formik.values.preparation= update.preparation
      formik.values.difficulty= update.difficulty
      formik.values.img= update.img

    if (update?.ingredients?.length) {
     let arr= update.ingredients.map(x=>{
       return {
         ingredient:x.ingredient.name,
         amount:x.amount,
         unit:x.unit.name
       }
     })
        onChangeIngredients(arr);
    }
  }, []); 
 
  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "",
    ingredients:[],
    img: "",
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
    dispatch(putRecipe(update.id,values));
    console.log("Values submit", values);
    console.log("formulario enviado");
  };
  const onChangeIngredients = (values) => {
    formik.values.ingredients = values;
    
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    onChangeIngredients,
  });

  return (
    <div class={style.centrado}>
      <form class={style.forms} onSubmit={formik.handleSubmit}>
        <div div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name || update.name}
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
            name={`ingredients[${formik.values?.ingredients?.length}].ingredient`}
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
            {formik.values?.ingredients?.length > 0 &&
              formik.values?.ingredients?.map((e, index) => {
                return (
                  <SelectCard
                    formik={formik}
                    onChange={onChangeIngredients}
                    ingredient={e.ingredient}
                    name={`ingredients[${index}]`}
                    handleChange={formik.handleChange}
                    unit={e.unit}
                    amount={e.amount}
                  />
                );
              })}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Dificultad</label>
          <select
            defaultValue={update.difficulty}
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
            value={formik.values.preparation || update.preparation}
            onBlur={formik.handleBlur}
            class="form-control"
            name="preparation"
            type="text"
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
            value={formik.values.img || update.img}
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
        <div class="col-auto">
          <Link to={`/recipe/${id}`}>
          <button type="submit" class="btn btn-primary mb-3">
            Actualizar
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
