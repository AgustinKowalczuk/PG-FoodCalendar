import React from 'react';
import style from '../../Styles/StylePaginate.module.css'
import { useSelector } from 'react-redux';
export default function Paginado({ recipesPerPage, allRecipes, paginado }) {

    const page = useSelector(state => state.page)
    const pageNumbers = []
    for (var i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className="pagination">
                {
                    pageNumbers?.length !== 1 &&
                    pageNumbers?.map((number,i) => (
                        page !== number ?
                            <li key={`pageNumbers-${i}`} className="page-item">
                                <p  className="page-link" id={style.color} onClick={() => paginado(number)}>{number}</p>
                            </li> :
                            <li className="page-item">
                                <p  className="page-link" id={style.color2} onClick={() => paginado(number)}>{number}</p>
                            </li>

                    ))
                }
            </ul>
        </div>
    )
}