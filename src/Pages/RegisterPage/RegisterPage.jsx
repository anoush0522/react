import React, { useEffect, useState } from 'react'
import "./RegisterPage.css"
import { Container, Row, Col } from "react-bootstrap" 

import { ethers } from 'ethers';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [spons, setSponsor] = useState("");

    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    
     

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
        }
        catch (err) {
            console.log(err);
        }
    }
    

    async function increaseAllowance() {
        try {
            const { ethereum } = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const busdInstance = new ethers.Contract(BUSD,BUSD_ABI,signer);
                console.log("Instance : " + busdInstance);
                
                let inc = await busdInstance.increaseAllowance(contract,'100000000000000000000', {value : ethers.utils.parseEther('0')});

                await inc.wait();
                register();
                console.log("Tr Hash : " + inc.hash);
            }
        } catch (error) {
            setMsg("Error : " + error);
        }
    }


    async function register() {
        try {
            const { ethereum } = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractinstance = new ethers.Contract(contract,contractABI,signer);
                console.log("Instance : " + contractinstance);
                let inc = await contractinstance.registration(spons, {value : ethers.utils.parseEther('0')});

                await inc.wait();
                console.log("Tr Hash : " + inc.hash);
                setMsg("Register Success.");
                navigate("/dashboard");
            }
        } catch (error) {
            setMsg("Error : " + error);
        }

    }

    useEffect(() => {
        checkWalletIsConnected();
        connectWalletHandler();
    }, [])

    const [msg, setMsg] = useState("");
    
    const [currentAccount, setCurrentAccount] = useState(null);
    return (
        <>
            <div className="div">
                <Container className="connectWalletContainer">
                    {/* <Link to="/"><img src={Logo} alt="logo.png" /></Link> */}
                    <Row className="connectWalletRow align-items-center">
                        <Col md='6' className="connectRegisterLeft">
                            <span style={{ color: "green" }}>{msg}</span>
                            <h3>Automatic registration</h3>
                            <p>Check the ID of Your inviter. <br></br>You can edit before proceed to payment.</p>
                            <input type="text" placeholder="Enter Sponsor ID." onChange={(e) => setSponsor(e.target.value)} id="sponsor" />
                            <button className="viewing" onClick={increaseAllowance}>To Register</button>
                            <p className='m-0'>Already have account?</p>
                            { /*<Link to="/connectwallet">Login</Link>*/ }
                        </Col>
                        <Col md='6' className="connectRegisterRight">
                            <h3>About GLOBAL MATIC CONTRACT</h3>
                            <p><span>GLOBAL MATIC CONTRACT</span> is a trading platform for contemporary traders that combines trading powers with on-chain data.</p>
                            <p>Using the peer-to-peer network and open-source desktop software of <span> GLOBAL MATIC CONTRACT,</span> you may buy and trade bitcoin for fiat (or other cryptocurrencies) in a private and safe manner.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default RegisterPage