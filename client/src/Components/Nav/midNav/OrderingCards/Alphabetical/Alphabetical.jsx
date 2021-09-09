import React, {useState, useEffect}from "react";
import {  useDispatch } from "react-redux";
import{orderZA, orderAZ ,orderByDifficulty, orderByDifficultyInv } from '../../../../../actions/index'








export default function OrderingCards(){

    const dispatch = useDispatch();   
    
    const [order, setOrder] = useState("")

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }


    useEffect(() => {
        if (order === "A-Z") dispatch(orderAZ())
        else if (order === "Z-A") dispatch(orderZA())
        else if  (order === "↑") dispatch(orderByDifficulty())
        else if (order === "↓") dispatch(orderByDifficultyInv())
    }, [dispatch, order])



    return(
        
           <select class="nav-link dropdown-toggle" id="navbarDropdown" onChange={(e) => handleOrderChange(e)}>
               <option>Ordenamiento</option>
               <option value= "A-Z">"A-Z"</option>
                <option value= "Z-A">"Z-A"</option>
                <option value= "↑">"↑"</option>
                <option value= "↓">"↓"</option>
            </select>

    
    
    )
}