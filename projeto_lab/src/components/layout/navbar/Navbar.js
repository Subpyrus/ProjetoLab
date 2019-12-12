import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPokedex, getDataPokeListPage } from '../../../store/actions/apiActions';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { auth, username, getPokedex, getDataPokeListPage } = this.props;
        const links = auth.uid ? (<SignedInLinks username={username} />) : (<SignedOutLinks />);

        return (
            <>
                <Navbar light expand="md" className='mb-5'>
                    <Link className='navBrandLink' to='/'>
                        <h1 className='navBrandTitle d-inline'>Poké</h1>
                        <h1 className='navBrandSecondTitle d-inline'>Favo</h1>
                    </Link>
                    <button style={{ borderColor: 'none' }} className="navbar-toggler" onClick={this.toggle} type="button">
                        <i className="fas fa-lg fa-bars"></i>
                    </button>
                    <Collapse isOpen={this.state.isOpen} className='mt-3 mt-md-0' navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink exact
                                    activeClassName="navbar__link-active" className="navbar__link" to='/'>
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => { getPokedex('national'); getDataPokeListPage() }} isActive={(match, location) => {
                                    let string = "/pokemon-list"
                                    let searchPokemonListURL = location.pathname.match(string);
                                    if (searchPokemonListURL !== null) {
                                        return true;
                                    }
                                }}
                                    activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-list/national">
                                    PokéList
                            </NavLink>
                            </NavItem>
                            {auth.isLoaded &&
                                links
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokedex: (region) => dispatch(getPokedex(region)),
        getDataPokeListPage: () => dispatch(getDataPokeListPage()),
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        username: state.firebase.profile.username
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
