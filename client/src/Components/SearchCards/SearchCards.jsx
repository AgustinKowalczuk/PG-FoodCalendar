import React from 'react'
import Cards from '../Cards/Cards'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function SearchCards() {

  const copy = useSelector((state)=> state.copyRecipe)   

  const allRecipes = useSelector((state) => state.recipes)


  return (
    <div>
      <h1> Results: </h1>
      <div>
        {
          copy.length === allRecipes.length  ? 
            <div>
              <h1>No encontre nada</h1>
              <Link to='/'/>
            </div> :
            <Cards allRecipes={allRecipes} />
        }
      </div>
    </div>
  );
}
