import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { searchRecipes } from "../../actions/index"
import styles from "../../Styles/StyleNav.module.css"
import swal from 'sweetalert';


export default function SearchBar() {
  const token = useSelector(state => state.token);
  const [input, setInput] = useState("");
  const history = useHistory()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (input === "") return swal({
      title: "Campo incompleto",
      text: "EL campo esta vacio",
      icon: "error",
      button: "Aceptar",
    })
    dispatch(searchRecipes(input, token))
    history.push(`/search/${input}`)
    setInput("")
  }

  return (
    <form id={styles.form} onSubmit={(e) => {
      e.preventDefault();
      handleSearch(input);
    }}>
      <input
        type="text"
        placeholder="Buscar..."
        value={input}
        onChange={e => handleInputChange(e)}
      />
      <button type="submit" class="btn btn-outline-success" id={styles.button}>
        Buscar
      </button>
    </form>
  );
}