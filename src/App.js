


import { BrowserRouter, Switch, Router, Routes, Route, Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import estilos from './estilos.css'
import Nav from './Components/Nav'
import ImgsInicio from "./Components/ImgsInicio";
import Login from './Components/Login'
import Admin from './Components/Admin'
import Favorites from './Components/Favorites'

function App() {

  return (

    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<ImgsInicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </div>
  )
}


/*




*/



export default App;


