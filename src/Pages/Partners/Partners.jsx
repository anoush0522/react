import React from 'react'
import { Container } from 'react-bootstrap'
import "./Partners.css"
import { FaUserAlt } from "react-icons/fa"
import { FaDatabase } from "react-icons/fa"
const Partners = () => {
    return (
        <React.Fragment>
            <Container>
                <div className="partnersHeading">
                    <h3><i><FaUserAlt /></i>Partners</h3>
                    <p>ID: <span>0</span></p>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>Address</th>
                            <th>ID</th>
                            <th>Pool 1</th>
                            <th>Pool 2</th>
                            <th>Pool 3</th>
                            <th>Profit</th>
                            <th>Partners</th>
                        </tr>
                    </table>
                    <div className="noDataMsg">
                        <p>No Data To Show</p>
                        <i><FaDatabase /></i>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Partners