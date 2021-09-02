import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"
import logo from '../../Image/Logo_RC.jpg'

export default withRouter( function Nav(props) {
 const {history}= props;

    return (
    <div position='fixed'>
      <Link to = '/'><img align='left' src= {logo} alt='logo'/></Link>
      <button onClick={()=>history.goBack()}>Volver</button>
       <SearchBar/>
        </div>
  );
})
