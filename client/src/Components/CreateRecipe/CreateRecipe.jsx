import React from "react";
import style from "../../Styles/StyleFrom.module.css"
import { Formik, Field, Form } from 'formik';

export default function CreateRecipe() {
  
  return (
    <div class={style.centrado}>
        <form class={style.forms}>
          <div div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name='name' class="form-control" placeholder="write here..."/>
          </div>

          <div class="mb-3">
            <label class="form-label">Ingredients</label>
            <select id="disabledSelect" name='ingredients' class="form-select">
              <option >algo</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Dificult</label>
            <input class="form-control" name='Dificult' type="text" placeholder="write here..."/>
          </div>

          <div class="mb-3">
            <label class="form-label">Preparation</label>
            <input class="form-control" name='Preparatio' type="text" placeholder="write here..."/>
          </div>

          <div class="mb-3">
            <label class="form-label">Image</label>
            <input class="form-control" name='Image' type="text" placeholder="write here..."/>
          </div>

          <div class="col-auto">
            <button class="btn btn-primary mb-3" type="submit">Create</button>
          </div>    
        </form>
    </div>
  );
}
