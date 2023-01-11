import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import Logo from "./../../Images/logo.png"
import Graph2 from "./../../Images/Waves.png";
import { AiFillHome } from "react-icons/ai"
import { ImSearch } from "react-icons/im"
import { BsPeopleFill } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"
import { IoLocation } from "react-icons/io5"
import { FaUserAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { HiIdentification } from "react-icons/hi";
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PoolBg from "./../../Images/poolbg.jpg"

import { ethers } from 'ethers';

import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
    const [msg, setMsg] = useState("");
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);

    function CopyToClipboard() {
        var copyText = document.querySelector('#personalLink');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the text: " + copyText.value);
    }
    const checkWalletIsConnected = () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Make sure you have meta masked installed");
            setMsg("Make sure you have meta masked installed")
            return;
        } else {
            console.log("wallet exists! we are ready to go")
            setMsg("wallet exists! we are ready to go")
        }
    }
    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("please install metamask");
        }
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            //let myAddrss = AccountAddress(account[0]);
            //alert(myAddrss);
            //console.log("length", myAddrss);
            setCurrentAccount(accounts[0]);
            setMsg(`Connected ${accounts[0]}`);
            loadData();
            //alert(currentAccount);
        }
        catch (err) {
            console.log(err);
        }
    }
    async function loadData() {
        
        try {
            const { ethereum } = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractInstance = new ethers.Contract(contract,contractABI,signer);
                
                const userInfo = await contractInstance.users(currentAccount);
                setSponsor(userInfo.referrer);
                setID(userInfo.id.toString());
                setDirects(userInfo.directs.toString());
                console.log(userInfo);
                
                const incomes = await contractInstance.income(currentAccount);
                setPool1income(parseInt(incomes.p1));
                setPool2income(parseInt(incomes.p2));
                setPool3income(parseInt(incomes.p3));
                setTotalincome(parseInt(incomes.total));
                setGenincome(parseInt(incomes.level));

                console.log(window.location.href);
            }
        } catch (error) {
            setMsg("Error : " + error);
        }
    }

    useEffect(() => {
        checkWalletIsConnected();
        connectWalletHandler();
    }, [])
    const [currentAccount, setCurrentAccount] = useState(null);
    const [sponsor, setSponsor] = useState('');
    const [idd, setID] = useState('');
    const [directs, setDirects] = useState(0);
    
    const [pool1income, setPool1income] = useState(0);
    const [pool2income, setPool2income] = useState(0);
    const [pool3income, setPool3income] = useState(0);
    const [totalincome, setTotalincome] = useState(0);
    const [genincome, setGenincome] = useState(0);
    


    return (
        <React.Fragment>
            <section className='dashboardSection'>
                <div className="sidebar">
                    <img src={Logo} alt="logo.png" />
                    <hr></hr>
                    <div className="sideItems active">
                        <i><AiFillHome /></i>
                        <p>Dashboard</p>
                    </div>
                    <div className="sideItems">
                        <i><BsPeopleFill /></i>
                        <p>Partner</p>
                    </div>
                </div>
                <div className="dashboardContent">
                    <div className="topnav">
                        <div className="search">
                            <input type="text" placeholder='Type id here...' />
                            <i><ImSearch /></i>
                        </div>
                        <span>{msg}</span>
                    </div>
                    <Container>
                        <Row>
                            <Col md="4">
                                <div className="partnersDiv gr1">
                                    <div className="partnersDivContent">
                                        <p>Partners</p>
                                        <h1>{directs}</h1>
                                    </div>
                                    <img src={Graph2} alt="" />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="partnersDiv gr2">
                                    <div className="partnersDivContent">
                                        <p>Profit</p>
                                        <h1>{totalincome} USDT</h1>
                                    </div>
                                    <img src={Graph2} alt="" />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="partnersDiv gr3">
                                    <div className="partnersDivContent">
                                        <p>Generation</p>
                                        <h1>{genincome} USDT</h1>
                                    </div>
                                    <img src={Graph2} alt="" />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md='4'>
                                <div className="poolCard">
                                    <div className="poolCardTextDiv">
                                        <h4>Pool 1</h4>
                                        <h4>{pool1income} USDT</h4>
                                    </div>
                                    <div className="poolCardTextDiv">
                                        <p>Cycles</p>
                                        <Link to="">Preview <i><BsArrowRight /></i></Link>
                                    </div>
                                    <img src={PoolBg} alt="" />
                                </div>
                                <div className="poolCard">
                                    <div className="poolCardTextDiv">
                                        <h4>Pool 2</h4>
                                        <h4>{pool2income} USDT</h4>
                                    </div>
                                    <div className="poolCardTextDiv">
                                        <p>Cycles</p>
                                        <Link to="">Preview <i><BsArrowRight /></i></Link>
                                    </div>
                                    <img src={PoolBg} alt="" />
                                </div>
                                <div className="poolCard">
                                    <div className="poolCardTextDiv">
                                        <h4>Pool 3</h4>
                                        <h4>{pool3income} USDT</h4>
                                    </div>
                                    <div className="poolCardTextDiv">
                                        <p>Cycles</p>
                                        <Link to="">Preview <i><BsArrowRight /></i></Link>
                                    </div>
                                    <img src={PoolBg} alt="" />
                                </div>
                            </Col>
                            <Col md="8">
                                <div className="information">
                                    <div className="infoDiv">
                                        <i><IoLocation /></i>
                                        <p>Contract address: <span>{contract}</span></p>
                                    </div>
                                    <div className="infoDiv">
                                        <i><FaUserAlt /></i>
                                        <p>Sponsor: <span>{sponsor}</span></p>
                                    </div>
                                    <div className="infoDiv">
                                        <i><HiIdentification /></i>
                                        <p>ID: <span>{idd}</span></p>
                                    </div>
                                </div>

                                <div className="address">
                                    <p>Personal link</p>
                                    <div className="addressInput">
                                        <input id="personalLink" type="text" value="https://test.mlmreadymade.com/diamond_investment/register?ref=0x5d72Bf" />
                                        <i onClick={() => CopyToClipboard()}><IoCopy /></i>
                                    </div>

                                    <div>
                                        <p>Not a member yet? Sign up with this upline</p>
                                        <Link>Sign up</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Dashboard