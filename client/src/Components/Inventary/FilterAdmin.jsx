import React, {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../../actions";

export default function FilterAdmin () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const token = useSelector((state) => state.token)
    useEffect(() =>{
        dispatch(getRecipes(token))
    }, [])
    let recipesUnavailables = allRecipes?.filter((e) => e.availability === 'Unavailable')
    return ( 
        <div>
            <h4>Recetas desabilitadas:</h4>
            {
                recipesUnavailables?.map(e => 
                    <Link to={`/recipe/${e.id}`}>
                    <div>{e.name}</div>
                    </Link>
                )
            }
        </div>
     )
}