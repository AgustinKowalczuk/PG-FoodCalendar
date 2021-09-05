import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { createRecipe, getIngredients, getUnit } from "../../actions/index";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

export default function CreateRecipe() {
  const dispatch = useDispatch();

  const ingre = useSelector((state) => state.ingredients);
  const unit = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUnit());
  }, [dispatch]);

  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "",
    ingredients: [],
    img: "",
  };

  const validate = (values) => {
    let error = {};

    if (!values.name) {
      error.name = "Requerido";
    } else if (!/^[a-zA-Z\s]*$/.test(values.name)) {
      error.name = "No es texto";
    }

    if (!values.preparation) {
      error.preparation = "Requerido";
    } else if (!/^[a-zA-Z\s]*$/.test(values.preparation)) {
      error.preparation = "No es texto";
    }

    if (!values.img) {
      error.img = "Requerido";
    }

    return error;
  };

  const onSubmit = (values) => {
    dispatch(createRecipe(formik.values));
    console.log("Values submit", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const onDelete = (event) => {
    formik.values.ingredients = formik.values.ingredients.filter(
      (e) => e.ingredient === event.target.value
    );
  };
  const selectUnit = (id) => {
    console.log(id)
    return (
      <select
        defaultValue="gr"
        class={style.selectGrid}
        onChange={formik.handleChange}
        name={id}
        id="disabledSelect"
        class="form-select"
      >
        {unit?.map((e) => {
          return<option name={id}>{e.name}</option>;
        })}
      </select>
    );
  }
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
            placeholder="write here..."
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
                return (
                  <div class={style.grid}>
                    <input
                      type="number"
                      class={style.inputGrid}
                      onChange={formik.handleChange}
                      name={`ingredients[${index}].amount`}
                    />
                    {
                      selectUnit(`ingredients[${index}].unit`)
                    }
                    <h5
                      onClick={(x) => onDelete(x)}
                      value={e.ingredient}
                      class={style.button}
                    >
                      {e.ingredient}
                    </h5>
                  </div>
                );
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
              {" "}
              Fácil{" "}
            </option>
            <option name="difficulty" value="Moderado">
              {" "}
              Moderado{" "}
            </option>
            <option name="difficulty" value="Difícil">
              {" "}
              Difícil{" "}
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
            placeholder="write here..."
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
            placeholder="write here..."
          />
          {formik.errors.img && formik.touched.img === true ? (
            <div class="cosoForm">
              <span>{formik.errors.img}</span>
            </div>
          ) : null}
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
