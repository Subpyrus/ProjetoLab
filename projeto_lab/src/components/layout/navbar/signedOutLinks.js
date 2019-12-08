import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { getSignUpData } from '../../../store/actions/apiActions';

const signedOutLinks = (props) => {
    return (
        <>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-in">
                    Sign-In
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={props.getSignUpData}
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-up">
                    Sign-Up
                </NavLink>
            </NavItem>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSignUpData: () => dispatch(getSignUpData())
    }
}

export default connect(null, mapDispatchToProps)(signedOutLinks);
