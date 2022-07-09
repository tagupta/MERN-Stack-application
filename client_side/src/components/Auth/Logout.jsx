import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout_success } from '../../features/auth/authSlice';

export const Logout = () => {
    const dispatch = useDispatch();
    return (
        <>
            <NavLink href="#" onClick={() => dispatch(logout_success())}>Logout</NavLink>
        </>
    );
}
