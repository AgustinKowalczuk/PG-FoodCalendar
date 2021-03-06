import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useState } from "react";
import { searchRecipes } from "../../actions/index"



export default function SearchBar() {

  const [input, setInput] = useState("")

  const handleInputChange = (e) => {
      setInput(e.target.value)
  }



  const handleSubmit = (e) => {
    
    alert("Ingresa una Receta")
  
  };

  const dispatch = useDispatch()

  const handleSearch = ( e )=> {
    dispatch(searchRecipes(input))
    
    
  }


  return (
    <div class="d-flex">
      <input
        class="form-control me-2" type="text" placeholder="Search.." onChange={(e) => handleInputChange(e)} />
      {input !== "" ? ( 
      <Link onClick={() => handleSearch()} class="btn btn-outline-success" to={`/search/${input}`} >
         Buscar
       </Link>
      ):( 
        <Link onClick={() => handleSubmit()}  class="btn btn-outline-success" to="/">
          Buscar
        </Link>
      )}
    </div>
  );
}
