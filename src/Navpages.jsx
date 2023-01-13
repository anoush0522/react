import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Partners from './Pages/Partners/Partners';
const Navpages = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/partners" element={<Partners />}></Route>
            </Routes>
        </React.Fragment>
    )
}

export default Navpages