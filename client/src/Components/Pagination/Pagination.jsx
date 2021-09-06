import React from 'react';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(var i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i ++){
        pageNumbers.push(i)
    }

    return(
        <div>
            {pageNumbers &&
            pageNumbers.map(number => (
                <div>
                    <button onClick={() => paginado(number)}>{number}</button>
                </div>
            ))}
        </div>
    )
}