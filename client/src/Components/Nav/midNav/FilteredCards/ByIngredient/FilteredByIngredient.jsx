import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredients, FilterRecipeByIngredient, getRecipes } from "../../../../../actions/index"



export default function FilteredByIngredient() {

    const dispatch = useDispatch();

    const ingre = useSelector((state) => state.ingredients)

    const handleFilterChange = (e) => {
        if (e.target.value === "-") dispatch(getRecipes())
        else if (e.target.value !== "-") dispatch(FilterRecipeByIngredient(e.target.value))
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <select class="nav-link dropdown-toggle" id="navbarDropdown" onChange={(e) => handleFilterChange(e)}>
            <option value="-">Por Ingrediente</option>
            {ingre?.map((e) => {
                return (
                    <option name="ingredients" value={e.name}>
                        {e.name}
                    </option>
                )
            })
            }
        </select>
    )
}