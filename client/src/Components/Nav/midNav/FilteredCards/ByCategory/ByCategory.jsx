import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategory, FilterRecipeByCategory, getRecipes } from "../../../../../actions/index"
import Button from 'react-bootstrap/Button'
import Dropdown  from 'react-bootstrap/Dropdown'


export default function FilteredByCategory() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const category = useSelector((state) => state.category)

    const [isOpen, setIsOpen] = useState(false)


    const handleFilterChange = (e) => {
        if (e.target.value === "-") dispatch(getRecipes(token))
        else if (e.target.value !== "-") dispatch(FilterRecipeByCategory(e.target.value,token))
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    return (
        <div>
     <Dropdown  align="end"  drop={"end"}>
            <Dropdown.Toggle variant="light" id="dropdown-basic" aling="end"  drop={"end"}>
                Categorias
            </Dropdown.Toggle>
            <Dropdown.Menu align="end"  drop={"end"}  >
                {category?.map((e) => {
                    return (
                        <li>
                        <Button variant="light"
                        key="end"
                        id={e.id}
                        align="end"
                        title={e.name}
                         value={e.name} onClick={(e) => handleFilterChange(e)}>
                          {e.name}
                          </Button>
                          </li>
                    )
                })
                }
                 </Dropdown.Menu>
                </Dropdown>
        </div>
    )
}