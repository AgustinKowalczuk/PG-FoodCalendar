import React from "react";
import FilteredByCategory from "./ByCategory/ByCategory";
import FilteredByDifficulty from "./ByDifficulty/FilterByDifficulty";
import FilteredByIngredient from "./ByIngredient/FilteredByIngredient";
import Dropdown from 'react-bootstrap/Dropdown';


export default function FilteredCards() {

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Filtros:
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    < FilteredByIngredient />
                    <Dropdown.Divider />
                    < FilteredByDifficulty />
                    <Dropdown.Divider />
                    < FilteredByCategory />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}