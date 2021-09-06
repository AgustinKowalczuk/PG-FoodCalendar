import React from 'react';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(var i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i ++){
        pageNumbers.push(i)
    }

    return(
        <div>
            <ul class="pagination">
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li class="page-item">
                        <a class="page-link" onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))} 
            </ul> 
        </div>
    )
}