import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { RegisterModal } from '../Auth/RegisterModal';
import './AppNavBar.css';
import { Logout } from '../Auth/Logout';
class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <div>
                <Navbar color="dark" expand="sm" dark>
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse navbar isOpen={isOpen}>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <RegisterModal />
                            </NavItem>
                            <NavItem>
                                <Logout />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default AppNavBar;
