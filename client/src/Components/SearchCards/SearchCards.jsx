import React from 'react'
import Cards from '../Cards/Cards'
import { useSelector } from 'react-redux'



export default function SearchCards() {

  const allRecipes = useSelector((state) => state.recipes)

  return (
    <div>
      <h1> Results: </h1>
      <div>
        <Cards allRecipes={allRecipes} />
      </div>
    </div>
  );
}
