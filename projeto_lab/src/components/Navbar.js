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

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

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
                            <NavLink exact
                                activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trivia">
                                PokéTrivia
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
                        <NavItem>
                            {props.LoggedIn ? (
                                <p>log-in</p>
                            ) : (
                                    <p>log-off</p>
                                )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default NavBar;
