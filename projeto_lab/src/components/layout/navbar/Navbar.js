import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
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
        const { auth, username, nationality, getPokedex, getDataPokeListPage } = this.props;
        const links = auth.uid ? (<SignedInLinks username={username} />) : (<SignedOutLinks nationality={nationality} />);

        return (
            <div>
                <Navbar light expand="md" className='mb-5'>
                    <NavbarBrand href="/">
                        PokéFavo
                    </NavbarBrand>
                    <button className="navbar-toggler" onClick={this.toggle} type="button">
                        <i className="fas fa-bars"></i>
                    </button>
                    <Collapse isOpen={this.state.isOpen} navbar>
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
            </div >
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
