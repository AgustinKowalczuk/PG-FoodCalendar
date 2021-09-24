import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button'
import Dropdown  from 'react-bootstrap/Dropdown'
import { orderZA, orderAZ, orderByDifficulty, orderByDifficultyInv } from '../../../../../actions/index'
export default function OrderingCards() {

    const dispatch = useDispatch();

    
    const [order, setOrder] = useState("");

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }


    useEffect(() => {
        if (order === "A-Z") dispatch(orderAZ());
        else if (order === "Z-A") dispatch(orderZA());
        else if (order === "Menor") dispatch(orderByDifficulty());
        else if (order === "Mayor") dispatch(orderByDifficultyInv());
    }, [dispatch, order])



    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
                Ordenamiento
            </Dropdown.Toggle>

            <Dropdown.Menu  >
            <h4>Por orden alfabético:</h4>       
               <li><Button variant="light" value= "A-Z"  onClick={(e) => handleOrderChange(e)}>"A-Z"</Button></li>     
                <li> <Button variant="light" value= "Z-A" onClick={(e) => handleOrderChange(e)}>"Z-A"</Button></li>
                <Dropdown.Divider />
                <h4>Por dificultad:</h4>
                <li> <Button variant="light" value= "Menor" onClick={(e) => handleOrderChange(e)}> "Menor"</Button></li>
                <li><Button variant="light" value= "Mayor" onClick={(e) => handleOrderChange(e)}>"Mayor"</Button></li>
            </Dropdown.Menu>
        </Dropdown>
    )
}