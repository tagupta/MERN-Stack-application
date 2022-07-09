import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { RegisterModal } from '../Auth/RegisterModal';
import './AppNavBar.css';
import { Logout } from '../Auth/Logout';
import { LoginModal } from '../Auth/LoginModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AppNavBar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    console.log('isAuthenticated, user', isAuthenticated, user);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const guestLinks = (
        <>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </>
    );

    const authLinks = (
        <>
            <NavItem>
                <div className="navbar-text" style={{ "marginRight": "15px" }}>
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </div>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    );

    return (
        <div>
            <Navbar color="dark" expand="sm" dark>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse navbar isOpen={isOpen}>
                    <Nav className="ml-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
export default AppNavBar;
