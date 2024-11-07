import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './Pages/AddEmp';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import EmpDetailEdit from './Pages/EmpDetailEdit'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/register' element={<Add />} />
          <Route path='/home' element={<Home />} />
          <Route path='/edit/:empID' element={<EmpDetailEdit />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
