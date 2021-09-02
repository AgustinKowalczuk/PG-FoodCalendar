import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {

  let text = ''
  
  const handleChange = (event) => {
    text = event.target.value
  }

  return (
    <div>
      <input type="text" placeholder="Search.." onChange={(e) =>handleChange(e)}/>
      <Link to={`/search/${text}`} >
        <p>Search</p>
      </Link>
    </div>
  );
}
