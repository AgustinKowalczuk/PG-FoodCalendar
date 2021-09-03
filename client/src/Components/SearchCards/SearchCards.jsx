import React from 'react'
import Cards from '../Cards/Cards'




export default function SearchCards() {


 // const name = useParams('name')

  //const match = useSelector((state) => state.recipes)

 // const dispatch = useDispatch()

 // useEffect(() => {
  //  dispatch(searchRecipes(name))
//  }, [dispatch, name])


  return (
    <div>
      <h1> Results: </h1>
      <div>
        <Cards/>
      </div>
    </div>
  );
}
