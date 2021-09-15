import React from "react";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { FilterRecipeByDifficulty, getRecipes } from "../../../../../actions/index"
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'


export default function FilteredByDifficulty() {

    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleFilterChange = (e) => {
        setDifficulty(e.target.value)
        if (e.target.value === "Reset") dispatch(getRecipes())
        else if (e.target.value !== "Reset") dispatch(FilterRecipeByDifficulty(e.target.value))
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

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