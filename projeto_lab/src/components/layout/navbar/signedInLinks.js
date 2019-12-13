import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { getPokemonForProfileIQ } from '../../../store/actions/apiActions'

const signedInLinks = (props) => {
    const { correctAnswers, wrongAnswers } = props.profileContent.triviaRecord
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
                <NavLink onClick={() => getPokemonForProfileIQ(correctAnswers, wrongAnswers)}
                    activeClassName="navbar__link-active" className="navbar__link" to={`/profile/${props.username}`} >
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

const mapStateToProps = (state) => {
    return {
        profileContent: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getPokemonForProfileIQ: (correctAnswers, wrongAnswers) => dispatch(getPokemonForProfileIQ(correctAnswers, wrongAnswers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks)