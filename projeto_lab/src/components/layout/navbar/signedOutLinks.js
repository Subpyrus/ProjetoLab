import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const signedOutLinks = (props) => {
    console.log(props.nationality)
    return (
        <>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-in">
                    Sign-In
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={props.nationality}
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-up">
                    Sign-Up
                </NavLink>
            </NavItem>
        </>
    )
}

export default signedOutLinks;
