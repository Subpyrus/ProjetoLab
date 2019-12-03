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
    const { auth, username } = props;
    const links = auth.uid ? (<SignedInLinks username={username} />) : (<SignedOutLinks />);

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
                            <NavLink onClick={(event) => { props.getPokedex('national'); }} isActive={(match, location) => {
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
    return {
        auth: state.firebase.auth,
        username: state.firebase.profile.username
    }
}

export default connect(mapStateToProps, null)(NavBar);
