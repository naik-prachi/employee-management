import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Add from './Pages/AddEmp';
import Home from './Pages/Home';
import EmpDetailEdit from './Pages/EmpDetailEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Add />} />
        <Route path='/' element={<Home />} />
        <Route path='/edit/:empID' element={<EmpDetailEdit />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
