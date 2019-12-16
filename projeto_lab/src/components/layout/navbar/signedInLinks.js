import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { getAllUsers, getUserAndPokemonForProfileIQ } from '../../../store/actions/apiActions';

const signedInLinks = (props) => {
    const { getAllUsers, profileContent, signOut } = props;
    const { username } = profileContent

    return (
        <>
            <NavItem>
                <NavLink exact
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trivia">
                    PokéTrivia
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={() => getAllUsers(username)}
                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trainers">
                    PokéTrainers
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" onClick={() => getUserAndPokemonForProfileIQ(username)} className="navbar__link" to={`/profile/${username}`} >
                    {username}
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
        getAllUsers: (loggedUser) => dispatch(getAllUsers(loggedUser)),
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks)