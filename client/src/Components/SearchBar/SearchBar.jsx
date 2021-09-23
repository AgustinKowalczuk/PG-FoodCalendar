import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { searchRecipes } from "../../actions/index"
import styles from "../../Styles/StyleNav.module.css"
import swal from 'sweetalert';


export default function SearchBar() {
  const token = useSelector(state => state.token);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {  
    setInput(e.target.value)
  }

  const dispatch = useDispatch();

  const handleSearch = ( e )=> {
    if(input === "") return swal({
      title: "Campo incompleto",
      text: "EL campo esta vacio",
      icon: "error",
      button: "Aceptar",
  })
    dispatch(searchRecipes(input,token))  
  }

  return (
    <div class="d-flex">
      <input
        class="form-control me-2" id={styles.SearchBar} type="text" placeholder="Buscar" onChange={(e) => handleInputChange(e)} /> 
      <Link id={styles.button} onClick={(e) => handleSearch(e)} class="btn btn-outline-success" to={`/search/${input}`} >
         Buscar
      </Link>
    </div>
  );
}
