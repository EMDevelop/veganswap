import React, {useState} from 'react'
import {Navbar,Nav,NavDropdown} from "react-bootstrap";

function NavigationBar() {

    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }


    return (
        <>
            <Navbar className='Navbar' expand="lg">
                <Navbar.Brand href="/">
                    {/* <img src={MainLogo} alt="Just2Connect Logo" className="MainLogo"/> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className = 'NavLinks' href="/">Swap</Nav.Link>
                        <NavDropdown title="Add" 
                            id="collasible-nav-dropdown" 
                            show={show}
                            onMouseEnter={showDropdown} 
                            onMouseLeave={hideDropdown}
                            className = 'DropdownNav'
                        >
                            <NavDropdown.Item className="dropdownItemsNavbar" href="/">Link</NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItemsNavbar" href="/">Recipe</NavDropdown.Item>    
                            <NavDropdown.Item className="dropdownItemsNavbar" href="/">Ingredient</NavDropdown.Item>    
                            <NavDropdown.Item className="dropdownItemsNavbar" href="/">Ingredient Brand</NavDropdown.Item>    
                        </NavDropdown>
                    </Nav>
                    {/* Add some kind of login/profile button here?  */}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavigationBar
