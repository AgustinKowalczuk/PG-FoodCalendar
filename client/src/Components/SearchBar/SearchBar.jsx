import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {

  let text = ''
  
  const handleChange = (event) => {
    text = event.target.value
  }

  return (
    <div class="d-flex">
      <input class="form-control me-2" type="text" placeholder="Search.." onChange={(e) =>handleChange(e)}/>
      <Link class="btn btn-outline-success" to={`/search/${text}`} >
        Search
      </Link>
    </div>
  );
}
