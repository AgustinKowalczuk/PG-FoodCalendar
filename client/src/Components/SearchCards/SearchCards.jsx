import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { searchRecipes } from "../../actions/index"
import Cards from '../Cards/Cards'
import { useSelector, useDispatch } from 'react-redux'



export default function SearchCards() {


 const name = useParams('name')


const allRecipes = useSelector((state) => state.recipes)


 return (
    <div>
      <h1> Results: </h1>
      <div>
        <Cards allRecipes={allRecipes}/>
      </div>
    </div>
  );
}
