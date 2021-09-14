import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { searchRecipes } from "../../actions/index"



export default function SearchBar() {
  const token = useSelector(state => state.token);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {  
    setInput(e.target.value)
  }

  const dispatch = useDispatch();

  const handleSearch = ( e )=> {
    if(input === "") return alert("Ingresa una Receta")
    dispatch(searchRecipes(input,token))    
  }

  return (
    <div class="d-flex">
      <input
        class="form-control me-2" type="text" placeholder="Buscar" onChange={(e) => handleInputChange(e)} /> 
      <Link onClick={() => handleSearch()} class="btn btn-outline-success" to={`/search/${input}`} >
         Buscar
       </Link>
    </div>
  );
}
