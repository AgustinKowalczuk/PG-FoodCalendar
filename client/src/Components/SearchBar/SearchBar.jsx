import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useState } from "react";
import { searchRecipes } from "../../actions/index"



export default function SearchBar() {

  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    dispatch(searchRecipes(input));
};



  return (
    <div class="d-flex">
      <input
        class="form-control me-2" type="text" placeholder="Buscar..." onChange={(e) => handleInputChange(e)} />
      {input !== "" ? (
      <Link onClick={() => handleSubmit()} class="btn btn-outline-success" to={`/search/${input}`} >
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
