import React from 'react'
import Cards from '../Cards/Cards'
import { useSelector } from 'react-redux'



export default function SearchCards() {


 // const name = useParams('name')

const match = useSelector((state) => state.recipes)

 // const dispatch = useDispatch()

 // useEffect(() => {
  //  dispatch(searchRecipes(name))
//  }, [dispatch, name])

if(match.error){
  return(
    <div>
      <h1> NO Hay receta con ese nombre</h1>
    </div>
  )
}
  else return (
    <div>
      <h1> Results: </h1>
      <div>
        <Cards/>
      </div>
    </div>
  );
}
