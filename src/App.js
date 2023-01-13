import React from 'react'
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import Dashboard from './Pages/Dashboard/Dashboard';

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connect"
import web3 from "web3";
import Sidebar from "./Pages/Sidebar/Sidebar"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Sidebar/>
      {/* <Routes>
        <Route path='/' element={<RegisterPage/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes> */}
        {/* <RegisterPage /> */}
        {/* <Dashboard /> */}
      </BrowserRouter>
    </div>
  )
}

export default App