import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';

const signedInLinks = (props) => {
    return (
        <>
            <NavItem>
                <NavLink exact
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trivia">
                    PokéTrivia
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trainers">
                    PokéTrainers
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to={{
                        pathname: `/profile/${props.username}`
                    }}>
                    {props.username}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    onClick={props.signOut} className="navbar__link" to="/">
                    <i className="fas fa-sign-out-alt"></i>
                    Log-Out
                </NavLink>
            </NavItem>
        </>
    )
}

const mapDispatchToProps = (dipatch) => {
    return {
        signOut: () => dipatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(signedInLinks)




