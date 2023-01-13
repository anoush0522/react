import React, { useState } from 'react'
import "./Sidebar.css"
import Logo from "./../../Images/logo.png"

import { AiFillHome } from "react-icons/ai"
import { ImSearch } from "react-icons/im"
import { BsPeopleFill } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"
import { ImSwitch } from "react-icons/im"
import { Container } from 'react-bootstrap';
import Navpages from '../../Navpages';
import { NavLink } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx"
const Sidebar = () => {
    function CopyToClipboard() {
        var copyText = document.querySelector('#personalLink');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the text: " + copyText.value);
    }
    const [sideDisplay, setSideDisplay] = useState('block');
    const [sideActive, setSideActive] = useState('dashboard');
    return (
        <React.Fragment>
            <section className='dashboardSection'>
                <div className="sidebar" style={{ display: sideDisplay }}>
                    <div className="imgCrose">
                        <img src={Logo} alt="logo.png" />
                        <i onClick={() => setSideDisplay("none")}><RxCross2 /></i>
                    </div>
                    <hr></hr>
                    <NavLink to="/" onClick={() => setSideActive("dashboard")}>
                        <div className="sideItems" id={`${sideActive === "dashboard" ? "active" : "noActive"}`}>
                            <i><AiFillHome /></i>
                            <p>Dashboard</p>
                        </div>
                    </NavLink>
                    <NavLink to="/partners" onClick={() => setSideActive("partners")}>
                        <div className="sideItems" id={`${sideActive === "partners" ? "active" : "noActive"}`}>
                            <i><BsPeopleFill /></i>
                            <p>Partner</p>
                        </div>
                    </NavLink>
                </div>
                <div className="dashboardContent">
                    <div className="topnav">
                        <Container className=" d-flex align-items-center TopnavContent">
                            <div className="d-flex align-items-center">
                                <i className='menu d-flex' onClick={() => { sideDisplay === "none" ? setSideDisplay("block") : setSideDisplay("none") }} ><AiOutlineMenu /></i>
                                <div className="search">
                                    <input type="text" placeholder='Type id here...' />
                                    <i><ImSearch /></i>
                                </div>
                            </div>
                            <i className="logout" title='Logout'><ImSwitch /></i>
                        </Container>
                    </div>
                    <Navpages />
                </div>
            </section>
        </React.Fragment >
    )
}
export default Sidebar