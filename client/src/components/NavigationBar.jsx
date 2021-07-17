import React, {useState} from 'react'
import {Navbar,Nav} from "react-bootstrap";
import { useHistory } from 'react-router-dom';


function NavigationBar() {

    let history = useHistory();

    return (
        <>
            <Navbar className='Navbar' expand="lg">
                <Navbar.Brand href="/">
                    {/* <img src={MainLogo} alt="Just2Connect Logo" className="MainLogo"/> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className = 'NavLinks' onClick={()=> history.push('/')}>Swap</Nav.Link>
                        <Nav.Link className = 'NavLinks' onClick={()=> history.push('/Add')}>Add</Nav.Link>
                    </Nav>
                    {/* Add some kind of login/profile button here?  */}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavigationBar
