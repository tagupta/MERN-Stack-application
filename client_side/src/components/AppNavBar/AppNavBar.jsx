import React, { Component } from 'react'
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import './AppNavBar.css';

class AppNavBar extends Component {
    constructor(){
        super();
        this.state = {
            isOpen: false
        }
    }
 

    toggle = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    }

    render() {
    const {isOpen} = this.state;
    return (
        <div>
        <Navbar color="dark" expand="sm" dark>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse navbar isOpen={isOpen}>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="https://github.com/tagupta/">
                        Github
                    </NavLink>
                </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
    }
}
export default AppNavBar;
