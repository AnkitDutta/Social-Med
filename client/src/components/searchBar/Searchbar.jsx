import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Search} from "@material-ui/icons";
import "./searchbar.css";

function searchbar() {
//   const [query, setQuery] = useState("");

//   useEffect(()=>{
//     const fetchUsers = async ()=> {
//         const res  =  await axios.get()
//     }
//   })

  return (
    <div className="search">
      <Search className="searchIcon" />
      <input
        type="text"
        className="searchInput"
        placeholder="Search..."
        // onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default searchbar;
