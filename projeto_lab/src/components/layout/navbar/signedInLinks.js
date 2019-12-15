import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { getAllUsers } from '../../../store/actions/apiActions';

const signedInLinks = (props) => {
    const { getAllUsers, profileContent, signOut } = props;

    return (
        <>
            <NavItem>
                <NavLink exact
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trivia">
                    PokéTrivia
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={() => getAllUsers(profileContent.username)}
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trainers">
                    PokéTrainers
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to={`/profile/${profileContent.username}`} >
                    {profileContent.username}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    onClick={signOut} className="navbar__link" to="/">
                    <i className="fas fa-sign-out-alt"></i>
                </NavLink>
            </NavItem>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profileContent: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getAllUsers: (loggedUser) => dispatch(getAllUsers(loggedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks)