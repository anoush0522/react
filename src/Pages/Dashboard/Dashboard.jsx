import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import Graph2 from "./../../Images/Waves.png";
import { FaUsers } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"
import { IoLocation } from "react-icons/io5"
import { FaUserAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { HiIdentification } from "react-icons/hi";
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PoolBg from "./../../Images/poolbg.jpg"
import { GiMoneyStack } from "react-icons/gi";
import { ethers } from 'ethers';

import { useSelector,useDispatch } from 'react-redux'


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}


const Dashboard = () => {

    const dispatch = useDispatch()
     
    var currstate1;
    const [msg, setMsg] = useState("");
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    const [sponsor, setSponsor] = useState('');
   
    const { height, width } = useWindowDimensions();

    function CopyToClipboard(id) {
        var copyText = document.querySelector(id);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the text: " + copyText.value);
    }
    var address = contract
    var sponsorId = sponsor
    const [contractAddress, setContractAddress] = useState(address);
    const [sponsorAddress, setSponsorAddress] = useState(sponsorId);
    useEffect(() => {
        if (width < "1000") {

            var last5contract = contractAddress.slice(-4);
            var first5chart = contractAddress.substring(0, 5)
            if(sponsorAddress.length > 5){
                var Sponsorfirst5chart = sponsorAddress.substring(0, 5)
                var Sponsorlast5contract = sponsorAddress.slice(-4)
                var str2 = Sponsorfirst5chart + "..." + Sponsorlast5contract;

                setSponsorAddress(str2);
            }
            var str = first5chart + "..." + last5contract;
            setContractAddress(str);
        } else {
            setContractAddress(address);
            setSponsorAddress(sponsorId);
        }
    },)


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
            
              
            currstate1 = accounts[0];
            //setMsg(`Connected ${accounts[0]}`);
            loadData();
            //alert(currentAccount);
        }
        catch (err) {
            console.log(err);
        }
    }
    async function loadData() {
        //alert();
        try {
            const { ethereum } = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractInstance = new ethers.Contract(contract,contractABI,signer);
                console.log("kohjnio",currstate1);
                
                const userInfo = await contractInstance.users(currstate1);
                setSponsor(userInfo.referrer);
                console.log('reff',userInfo.referrer);
                setID(userInfo.id.toString());
                setDirects(userInfo.directs.toString());
                
                
                const incomes = await contractInstance.income(currstate1);
                setPool1income(parseInt(incomes.p1/1e18));
                setPool2income(parseInt(incomes.p2/1e18));
                setPool3income(parseInt(incomes.p3/1e18));
                setTotalincome(parseInt(incomes.total/1e18));
                setGenincome(parseInt(incomes.level/1e18));

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
   
    
    const [idd, setID] = useState('');
    const [directs, setDirects] = useState(0);
    
    const [pool1income, setPool1income] = useState(0);
    const [pool2income, setPool2income] = useState(0);
    const [pool3income, setPool3income] = useState(0);
    const [totalincome, setTotalincome] = useState(0);
    const [genincome, setGenincome] = useState(0);
    


    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col md="4">
                        <div className="partnersDiv gr1">
                            <div className="partnersDivContent">
                                <div className="partnerdinImg">
                                    <p>Partners</p>
                                    <h1>{directs}</h1>
                                </div>
                                <i><BsPeopleFill /></i>
                            </div>
                            <img src={Graph2} alt="" />
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="partnersDiv gr2">
                            <div className="partnersDivContent">
                                <div className="partnerdinImg">
                                    <p>Profit</p>
                                    <h1>{totalincome} USDT</h1>
                                </div>
                                <i><GiMoneyStack /></i>
                            </div>
                            <img src={Graph2} alt="" />
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="partnersDiv gr3">
                            <div className="partnersDivContent">
                                <div className="partnerdinImg">
                                    <p>Generation</p>
                                    <h1>{genincome} USDT</h1>
                                </div>
                                <i><FaUsers /></i>
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
                                <input style={{ display: "none" }} type="text" id="addressText" value={address} />
                                <p>Contract address: <span id="address" > {contractAddress}</span> <i className="contractAddressCopy" title="copy" onClick={() => CopyToClipboard("#addressText")}><IoCopy /></i></p>
                            </div>
                            <div className="infoDiv">
                                <i><FaUserAlt /></i>
                                <input style={{ display: "none" }} type="text" id="sponsorText" value={sponsorId} />
                                <p>Sponsor: <span id="s" > {sponsorAddress}</span> <i className="contractAddressCopy" title="copy" onClick={() => CopyToClipboard("#sponsorText")}><IoCopy /></i></p>
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
                                <i onClick={() => CopyToClipboard("#personalLink")}><IoCopy /></i>
                            </div>
                            <div>
                                <p>Not a member yet? Sign up with this upline</p>
                                <Link>Sign up</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
        // <React.Fragment>
        //     <section className='dashboardSection'>
        //         <div className="sidebar">
        //             <img src={Logo} alt="logo.png" />
        //             <hr></hr>
        //             <div className="sideItems active">
        //                 <i><AiFillHome /></i>
        //                 <p>Dashboard</p>
        //             </div>
        //             <div className="sideItems">
        //                 <i><BsPeopleFill /></i>
        //                 <p>Partner</p>
        //             </div>
        //         </div>
        //         <div className="dashboardContent">
        //             <div className="topnav">
        //                 <div className="search">
        //                     <input type="text" placeholder='Type id here...' />
        //                     <i><ImSearch /></i>
        //                 </div>
        //                 <span>{msg}</span>
        //             </div>
        //             <Container>
        //                 <Row>
        //                     <Col md="4">
        //                         <div className="partnersDiv gr1">
        //                             <div className="partnersDivContent">
        //                                 <p>Partners</p>
        //                                 <h1>{directs}</h1>
        //                             </div>
        //                             <img src={Graph2} alt="" />
        //                         </div>
        //                     </Col>
        //                     <Col md="4">
        //                         <div className="partnersDiv gr2">
        //                             <div className="partnersDivContent">
        //                                 <p>Profit</p>
        //                                 <h1>{totalincome} USDT</h1>
        //                             </div>
        //                             <img src={Graph2} alt="" />
        //                         </div>
        //                     </Col>
        //                     <Col md="4">
        //                         <div className="partnersDiv gr3">
        //                             <div className="partnersDivContent">
        //                                 <p>Generation</p>
        //                                 <h1>{genincome} USDT</h1>
        //                             </div>
        //                             <img src={Graph2} alt="" />
        //                         </div>
        //                     </Col>
        //                 </Row>

        //                 <Row>
        //                     <Col md='4'>
        //                         <div className="poolCard">
        //                             <div className="poolCardTextDiv">
        //                                 <h4>Pool 1</h4>
        //                                 <h4>{pool1income} USDT</h4>
        //                             </div>
        //                             <div className="poolCardTextDiv">
        //                                 <p>Cycles</p>
        //                                 <Link to="">Preview <i><BsArrowRight /></i></Link>
        //                             </div>
        //                             <img src={PoolBg} alt="" />
        //                         </div>
        //                         <div className="poolCard">
        //                             <div className="poolCardTextDiv">
        //                                 <h4>Pool 2</h4>
        //                                 <h4>{pool2income} USDT</h4>
        //                             </div>
        //                             <div className="poolCardTextDiv">
        //                                 <p>Cycles</p>
        //                                 <Link to="">Preview <i><BsArrowRight /></i></Link>
        //                             </div>
        //                             <img src={PoolBg} alt="" />
        //                         </div>
        //                         <div className="poolCard">
        //                             <div className="poolCardTextDiv">
        //                                 <h4>Pool 3</h4>
        //                                 <h4>{pool3income} USDT</h4>
        //                             </div>
        //                             <div className="poolCardTextDiv">
        //                                 <p>Cycles</p>
        //                                 <Link to="">Preview <i><BsArrowRight /></i></Link>
        //                             </div>
        //                             <img src={PoolBg} alt="" />
        //                         </div>
        //                     </Col>
        //                     <Col md="8">
        //                         <div className="information">
        //                             <div className="infoDiv">
        //                                 <i><IoLocation /></i>
        //                                 <p>Contract address: <span>{contract}</span></p>
        //                             </div>
        //                             <div className="infoDiv">
        //                                 <i><FaUserAlt /></i>
        //                                 <p>Sponsor: <span>{sponsor}</span></p>
        //                             </div>
        //                             <div className="infoDiv">
        //                                 <i><HiIdentification /></i>
        //                                 <p>ID: <span>{idd}</span></p>
        //                             </div>
        //                         </div>

        //                         <div className="address">
        //                             <p>Personal link</p>
        //                             <div className="addressInput">
        //                                 <input id="personalLink" type="text" value="https://test.mlmreadymade.com/diamond_investment/register?ref=0x5d72Bf" />
        //                                 <i onClick={() => CopyToClipboard()}><IoCopy /></i>
        //                             </div>

        //                             <div>
        //                                 <p>Not a member yet? Sign up with this upline</p>
        //                                 <Link>Sign up</Link>
        //                             </div>
        //                         </div>
        //                     </Col>
        //                 </Row>
        //             </Container>
        //         </div>
        //     </section>
        // </React.Fragment>
    )
}
export default Dashboard