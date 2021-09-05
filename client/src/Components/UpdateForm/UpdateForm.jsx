import React ,{useState}from "react";
import style from "../../Styles/StyleFrom.module.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { RECIPES_URL } from "../../routes";


export default function UpdateForm() {
        const update = useSelector(state => state.detail)
        console.log(update,'detalle')
        const [state, setState] = useState({
          name:update.name,
          difficulty:update.difficulty,
          ingredients:update.ingredients,
          preparation:update.preparation,
          img:update.img,
          category:update.category
        })

     async function updatear(value){
             const update= await axios.put(RECIPES_URL + `/${value.id}`, value)
        }
          function eliminar(e){
          e.preventDefault();
          const arr= update.ingredients.filter((e)=>e.ingredient.name!==e.target.value)
          console.log(arr,'ingr')
          setState(()=>{
            return{
              ...state,
            ingredients:arr
             }
             })
            }
       
  return (
    <div class={style.centrado}>
        <form class={style.forms}>
          <div div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name='name' class="form-control" placeholder= {update.name}/>
          </div>

          <div>
            <label class="form-label">Ingredients</label>
            <div name='ingredients' class="form-select" >
            {update.ingredients?.map(x =>(
              <div value={x.ingredient.name}>
             <h5>{x.ingredient.name}</h5><h5>{x.amount}</h5><h5>{x.unit.name}</h5>
             <button onChange={(e)=>{eliminar()}}>x</button>
             </div>    
              ))}  </div>
             <div>

             </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Dificult</label>
            <select class="form-control" name='Dificult' type="text">
            <option defaultValue={update.difficulty}>{update.difficulty} </option>     
            <option value="Fácil">Facil</option>
            <option value="Moderado">Moderado</option>
            <option value="Difícil">Difícil</option>
                </select>

          </div>

          <div class="mb-3">
            <label class="form-label">Preparation</label>
            <textarea class="form-control" name='Preparatio' type="text" placeholder={update.preparation}/>
          </div>

          <div class="mb-3">
            <label class="form-label">Image</label>
            <input class="form-control" name='Image' type="text" placeholder="URL de la imagen"/>
          </div>

          <div class="col-auto">
            <button class="btn btn-primary mb-3" type="submit" onClick={()=>updatear()}>Actualizar</button>
          </div>    
        </form>
    </div>
  );
}
