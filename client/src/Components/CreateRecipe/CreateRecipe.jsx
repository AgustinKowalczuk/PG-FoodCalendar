import React from "react";
import style from "../../Styles/StyleFrom.module.css"

export default function CreateRecipe() {
  
  return (
    <div class={style.centrado}>
      <form class={style.forms}>
        <div div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" placeholder="write here..."/>
        </div>

        <div class="mb-3">
          <label class="form-label">Ingredients</label>
          <select id="disabledSelect" class="form-select">
            <option >algo</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Dificult</label>
          <select name='Dificult' class="form-control">
          <option name='Dificult' value="Easy"> Easy </option>
          <option name='Dificult' value="Medium"> Medium </option>
          <option name='Dificult' value="Hard"> Hard </option>
          </select>
          </div>

        <div class="mb-3">
          <label class="form-label">Preparation</label>
          <textarea class="form-control" placeholder="write here..."></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Image</label>
          <input class="form-control" type="text" placeholder="write here..."/>
        </div>

        <div class="col-auto">
          <button class="btn btn-primary mb-3" type="submit">Create</button>
        </div>    
      </form>
    </div>
  );
}