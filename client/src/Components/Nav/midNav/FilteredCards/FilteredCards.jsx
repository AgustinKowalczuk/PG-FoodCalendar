import React,{ useState } from "react";
import FilteredByCategory from "./ByCategory/ByCategory";
import FilteredByDifficulty from "./ByDifficulty/FilterByDifficulty";
import FilteredByIngredient from "./ByIngredient/FilteredByIngredient";
import Dropdown  from 'react-bootstrap/Dropdown'
import style  from '../../../../Styles/StyleNav.module.css';


export default function FilteredCards() {
   
   
    const [isOpen, setIsOpen] = useState(false)



    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Filtros:
                </Dropdown.Toggle> 
                <Dropdown.Menu >
                    < FilteredByIngredient/>
                    <Dropdown.Divider />
                    < FilteredByDifficulty/>
                    <Dropdown.Divider />
                    < FilteredByCategory/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}