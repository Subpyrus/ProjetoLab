import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { auth } = props;
    const links = auth.uid ? (<SignedInLinks />) : (<SignedOutLinks />);

    return (
        <div>
            <Navbar light expand="md" className='mb-5'>
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink exact
                                activeClassName="navbar__link-active" className="navbar__link" to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink isActive={(match, location) => {
                                let string = "/pokemon-search"
                                let searchPokemonListURL = location.pathname.match(string);
                                if (searchPokemonListURL !== null) {
                                    return true;
                                }
                            }}
                                activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-search">
                                PokéSearch
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={props.getPokedex} isActive={(match, location) => {
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(NavBar);
