import React from 'react';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(var i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i ++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}