import React from "react";
import { useEffect, useState } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { FilterRecipeByDifficulty, getRecipes } from "../../../../../actions/index"
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'


export default function FilteredByDifficulty() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleFilterChange = (e) => {
        setDifficulty(e.target.value)
        if (e.target.value === "Reset") dispatch(getRecipes())
        else if (e.target.value !== "Reset") dispatch(FilterRecipeByDifficulty(e.target.value))
    }

    useEffect(() => {
       if(difficulty === "-") dispatch(getRecipes(token))
       else if( difficulty !== "-")dispatch(FilterRecipeByDifficulty(difficulty))
    }, [dispatch,difficulty])

    return (
        <div >
            <Dropdown align="end" drop={"end"}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" aling="end" drop={"end"}>
                    Dificultad
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" drop={"end"}  >
                    <Button
                        variant="light"
                        onClick={(e) => handleFilterChange(e)}
                        value="Fácil">
                        Fácil
                    </Button>
                    <Button variant="light" onClick={(e) => handleFilterChange(e)} value="Moderado" >Moderado</Button>
                    <Button variant="light" onClick={(e) => handleFilterChange(e)} value="Difícil">Difícil</Button>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}