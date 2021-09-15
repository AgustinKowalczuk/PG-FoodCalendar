import React ,{useState}from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredients, FilterRecipeByIngredient, getRecipes } from "../../../../../actions/index"
import Button from 'react-bootstrap/Button'
import Dropdown  from 'react-bootstrap/Dropdown'
import DropdownButton  from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
export default function FilteredByIngredient() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const ingre = useSelector((state) => state.ingredients)
    const [isOpen, setIsOpen] = useState(false)
    const handleFilterChange = (e) => {
        if (e.target.value === "-") dispatch(getRecipes(token))
        else if (e.target.value !== "-") dispatch(FilterRecipeByIngredient(e.target.value,token))
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div>
        <Dropdown  align="end"  drop={"end"}>
            <Dropdown.Toggle variant="light" id="dropdown-basic" aling="end"  drop={"end"}>
                Ingredientes
            </Dropdown.Toggle>
            <Dropdown.Menu align="end"  drop={"end"}  >
            {ingre?.map((e) => {
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