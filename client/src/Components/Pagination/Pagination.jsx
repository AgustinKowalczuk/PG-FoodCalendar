import React from 'react';
import style from '../../Styles/StylePaginate.module.css'
export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(var i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i ++){
        pageNumbers.push(i)
    }

    return(
        <div>
            <ul className="pagination">
                {
                    pageNumbers?.length > 0 &&
                    pageNumbers?.map(number => (
                        <li className="page-item">
                            <a className="page-link" id={style.color} onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                } 
            </ul> 
        </div>
    )
}