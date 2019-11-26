import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function signedOutLinks() {
    return (
        <>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-in">
                    Sign-In
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-up">
                    Sign-Up
                </NavLink>
            </NavItem>
        </>
    )
}
