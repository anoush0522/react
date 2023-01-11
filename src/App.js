import React from 'react'
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connect"
import web3 from "web3";
const App = () => {
const first = ''
  return (
    <div>
      <RegisterPage />

    </div>
  )
}

export default App