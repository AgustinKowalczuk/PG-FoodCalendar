import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategory, FilterRecipeByCategory, getRecipes } from "../../../../../actions/index"



export default function FilteredByCategory() {

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category)

    const handleFilterChange = (e) => {
        if (e.target.value === "-") dispatch(getRecipes())
        else if (e.target.value !== "-") dispatch(FilterRecipeByCategory(e.target.value))
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    return (
        <select class="nav-link dropdown-toggle" id="navbarDropdown" onChange={(e) => handleFilterChange(e)}>
            <option value="-">Por Categoria</option>
            {category?.map((e) => {
                return (
                    <option name="category" value={e.name}>
                        {e.name}
                    </option>
                )
            })
            }
        </select>
    )
}