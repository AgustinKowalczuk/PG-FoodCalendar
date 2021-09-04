import React from "react";
import style from "../../Styles/StyleFrom.module.css";
import { useFormik } from "formik";

export default function CreateRecipe() {

  const initialValues = {
    name: '',
    preparation: '',
    difficult: 'Easy',
    ingredients: '',
    image: '',
  }

  const validate = (values) => {
    let error = {}

    if (!values.name) {
      error.name = "Required";
    } else if ( !/^[a-zA-Z\s]*$/.test(values.name) ) {
      error.name = "Not String";
    }

    if (!values.preparation) {
      error.preparation = "Required";
    } else if ( !/^[a-zA-Z\s]*$/.test(values.preparation)) {
      error.preparation = "Not String";
    }
    
    if (!values.image) {
      error.image = "Required";
    }
    
    return error;
  }

  const onSubmit = async (values) => {
    console.log('Values submit', values);
  }
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div class={style.centrado}>
          <form class={style.forms} onSubmit={formik.handleSubmit}>
            <div div class="mb-3">
              <label class="form-label">Name</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                name="name"
                class="form-control"
                placeholder="write here..."
              />
              {
                formik.errors.name && formik.touched.name === true ? 
                <div class='cosoForm'><span>{formik.errors.name}</span></div> : 
                null
              }
            </div>

            <div class="mb-3">
              <label class="form-label">Ingredients</label>
              <select onChange={formik.handleChange} name='ingredients' id="disabledSelect" class="form-select">
                <option name='ingredients' value ="Agua" >Agua</option>
                <option name='ingredients' value ="Barro">Barro</option>
                <option name='ingredients' value ="Harina">Harina</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Difficult</label>
              <select onChange={formik.handleChange} name='difficult' class="form-control">
                <option name='difficult' value="Easy"> Easy </option>
                <option name='difficult' value="Medium"> Medium </option>
                <option name='difficult' value="Hard"> Hard </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Preparation</label>
              <textarea 
                onChange={formik.handleChange}
                value={formik.values.preparation} 
                onBlur={formik.handleBlur} 
                class="form-control"
                name="preparation"
                type="text"
                placeholder="write here..."
              />
              {
                formik.errors.preparation && formik.touched.preparation === true ? 
                <div class='cosoForm'><span>{formik.errors.preparation}</span></div> : 
                null
              }
            </div>

            <div class="mb-3">
              <label class="form-label">Image</label>
              <input 
                onChange={formik.handleChange}
                value={formik.values.image}
                onBlur={formik.handleBlur}
                class="form-control"
                name="image"
                type="text"
                placeholder="write here..."
              />
              {
                formik.errors.image && formik.touched.image === true ? 
                 <div class='cosoForm'><span>{formik.errors.image}</span></div> : null
              }
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3">
                Create
              </button>    
            </div>
          </form>
    </div>
  )
}
