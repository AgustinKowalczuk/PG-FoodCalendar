import React, {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../../actions";
import styles from "../../Styles/StyleFilterAcont.module.css"

export default function FilterAdmin () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const token = useSelector((state) => state.token)
    useEffect(() =>{
        dispatch(getRecipes(token))
    }, [])
    let recipesUnavailables = allRecipes?.filter((e) => e.availability === 'Unavailable')
    return ( 
        <div className={styles.content}>
            <h3 className={styles.text}>Recetas desabilitadas:</h3>
            {
                recipesUnavailables?.map(e => 
                    <Link className={styles.contentData} to={`/recipe/${e.id}`}>
                        <h4 key={e.id}>{e.name}</h4>
                    </Link>
                )
            }
        </div>
     )
}