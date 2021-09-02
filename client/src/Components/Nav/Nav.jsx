import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"

export default function Nav() {
  return (
    <div>
      <ul>
        <li><Link to="/"> Home </Link></li>
      </ul>
      <SearchBar/>
    </div>
  );
}
