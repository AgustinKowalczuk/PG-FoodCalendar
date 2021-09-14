import React from "react";
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  FilterRecipeByDifficulty, getRecipes } from "../../../../../actions/index"



export default function FilteredByDifficulty() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState("")
    

    const handleFilterChange = (e) => {
        setDifficulty(e.target.value)
    }

    useEffect(() => {
       if(difficulty === "-") dispatch(getRecipes(token))
       else if( difficulty !== "-")dispatch(FilterRecipeByDifficulty(difficulty))
    }, [dispatch,difficulty])

    return (
        <select class="nav-link dropdown-toggle" id="navbarDropdown" onChange={(e) => handleFilterChange(e)}>
            <option value="-">Por Dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Moderado">Moderado</option>
            <option value="Difícil">Difícil</option>
        </select>
    )
}