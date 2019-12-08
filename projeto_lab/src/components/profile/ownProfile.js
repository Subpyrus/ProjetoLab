import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import { removeFavoritePokemon, removePokemonFromTeam } from '../../store/actions/favoriteActions';
import { removeFriend } from '../../store/actions/friendsActions';
import { getInfoPokemonPage } from '../../store/actions/apiActions';

class ownProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            modalContent: {
                name: '',
                action: ''
            },
            width: window.innerWidth
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    toggleFirstTime = (name, action) => {
        this.setState({
            modal: !this.state.modal,
            modalContent: { name: name, action: action }
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        const { removeFavoritePokemon, removePokemonFromTeam, removeFriend, getInfoPokemonPage, pokemonIQ } = this.props;
        const { username, avatar, gender, nationality, favoritePokemons, favoriteTeam, triviaRecord, friends } = this.props.ownProfileContent
        const { teamResults } = this.props.teamResults
        const { favoritesResults } = this.props.favoritesResults
        const { name, action } = this.state.modalContent;
        let pokemon = require('pokemon');
        let pokemonName = pokemon.getName(pokemonIQ.id)

        return (
            <Row>
                <Col xs='12' className='text-center'>
                    <h1>{username}</h1>
                </Col>
                <Col xs='12'>
                    <Row className='text-center align-items-center'>
                        <Col xs='12' md='3'>
                            <h5 className='col-12'>Gender:</h5>
                            <p className='col-12'>{gender}</p>
                        </Col>
                        <Col xs='12' md='2'>
                            <h5 className='col-12'>From:</h5>
                            <p className='col-12'>{nationality}</p>
                        </Col>
                        <Col className='d-flex justify-content-center' xs='12' md='2' lg='2'>
                            <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                        </Col>
                        <Col xs='12' md='2'>
                            <h5 className='col-12'>Favorite Game:</h5>
                            <p className='col-12'>{nationality}</p>
                        </Col>
                        <Col xs='12' md='3'>
                            <h5 className='col-12'>Favorite Generation:</h5>
                            <p className='col-12'>{gender}</p>
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12' md='6' lg='12'>
                    <Row className='text-center justify-content-center'>
                        <Col xs='12' md='6' lg='4'>
                            <h3>Personality</h3>
                            {favoritePokemons &&
                                favoritePokemons.length !== 0 ? (<p>{favoritesResults}</p>) : (
                                    <p>You still don't have any pokémons on your Favorites to calculate this result! Search for your favorites in the <Link to='/pokemon-list'>PokéList!</Link></p>)}
                        </Col>
                        <Col xs='12' md='6' lg='4'>
                            <h3>Battle Personality</h3>
                            {favoriteTeam &&
                                favoriteTeam.length !== 0 ? (<p>{teamResults}</p>) : (
                                    <p>You still don't have any pokémons on your Favorite Team to calculate this result! Search for your team members in the <Link to='/pokemon-list'>PokéList!</Link></p>)}
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12'>
                    <Row className='text-center justify-content-center'>
                        <h3 className='col-12'>Inner Pokémon IQ</h3>
                        {triviaRecord &&
                            !pokemonIQ ? (
                                <p className='col-12'>You still haven't played any PokéTrivia to calculte your Inner Pokémon IQ, start playing by <Link to='/pokemon-trivia'>clicking here!</Link></p>) : (
                                <>
                                    <p>You're intelligent as a {pokemonName}!</p>
                                    <Col xs='6' lg='3' className='py-3'>
                                        <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                    </Col>
                                    <p>{pokemonIQ.flavor_text_entries[2].flavor_text}</p>
                                </>
                            )
                        }
                    </Row>
                </Col>
                <hr className='col-8 mx-auto' />
                <Col className='pb-4 pb-lg-5' xs='12' md='6' lg='12'>
                    <Row className='text-center justify-content-center'>
                        <Col className='py-3 py-lg-4' xs='12' md='6'>
                            <h3>Favorite Pokémons</h3>
                            {favoritePokemons &&
                                favoritePokemons.length === 0 ? (
                                    <p>You still haven't added any Favorite Pokémons to your list yet! Search for your favorites in the PokéList!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoritePokemons.map((item, key) =>
                                            <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key} style={{ height: '150px' }}>
                                                <LazyLoad height={200} once={true}>
                                                    <Link to={`/pokemon-list/national/pokemon-page/${item.name.toLowerCase()}`}
                                                        onClick={(event) => getInfoPokemonPage(item.name.toLowerCase())}>
                                                        <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                                    </Link>
                                                </LazyLoad>
                                                <i style={{ position: 'relative', top: '-40px' }} onClick={() => this.toggleFirstTime(item.name, 'Favorites Pokémon List')} className="far fa-times-circle"></i>
                                            </Col>)}
                                    </Row>)}
                        </Col>
                        <Col className='py-3 py-lg-4' xs='12' md='6'>
                            <h3>Favorite Pokémon Team</h3>
                            {favoriteTeam &&
                                favoriteTeam.length === 0 ? (
                                    <p>You still haven't added any Pokémon to your Favorite Team! Search for your team members in the PokéList!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoriteTeam.map((item, key) =>
                                            <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key} style={{ height: '150px' }}>
                                                <LazyLoad height={200} once={true}>
                                                    <Link to={`/pokemon-list/national/pokemon-page/${item.name.toLowerCase()}`}
                                                        onClick={(event) => getInfoPokemonPage(item.name.toLowerCase())}>
                                                        <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                                    </Link>
                                                </LazyLoad>
                                                <i style={{ position: 'relative', top: '-40px' }} id={item.name} onClick={() => this.toggleFirstTime(item.name, 'Favorite Pokémon Team')} className="far fa-times-circle"></i>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                        </Col>
                    </Row>
                </Col>
                <Col xs='12'>
                    <Row className='justify-content-center text-center'>
                        <h3 className='col-12'>Friends</h3>
                        {friends &&
                            friends.length === 0 ? (
                                <p>You still haven't added any Pokémon Trainers to your friends list! Check cool trainers on the <Link to='/pokemon-trainers'>PokéTrainers</Link> tab!</p>
                            ) : (
                                friends.map((item, key) =>
                                    <Col xs='12' md='4' lg='2'>
                                        <i style={{ position: 'relative', top: '-40px' }} id={item.name} onClick={() => removeFriend(item.name)} className="far fa-times-circle"></i>
                                        <Link className='basic-link' key={key} to={`pokemon-trainers/profile/${item.name}`}>
                                            <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} />
                                            <p>{item.name}</p>
                                        </Link>
                                    </Col>
                                ))}
                    </Row>
                </Col>
                <Modal size='md' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <p className='text-center'>Are you sure you want to remove {name} from your {action}?</p>
                    </ModalBody>
                    <ModalFooter className='justify-content-center text-center'>
                        {action === 'Favorites Pokémon List' ?
                            (<Button color="warning w-25 mx-3" onClick={() => { this.toggle(); removeFavoritePokemon(name); }}>
                                Yes
                        </Button>)
                            : action === 'Favorite Pokémon Team' ?
                                (<Button color="warning w-25 mx-3" onClick={() => { this.toggle(); removePokemonFromTeam(name); }}>
                                    Yes
                        </Button>) :
                                (<Button color="warning w-25 mx-3" onClick={() => { this.toggle(); }}>
                                    Yes
                        </Button>)}

                        <Button color="danger w-25 mx-3" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        removeFavoritePokemon: (pokemon) => dispatch(removeFavoritePokemon(pokemon)),
        removePokemonFromTeam: (pokemon) => dispatch(removePokemonFromTeam(pokemon)),
        removeFriend: (user) => dispatch(removeFriend(user))
    }
}

const mapStateToProps = (state) => {
    return {
        pokemonIQ: state.apiCalls.apiData.getPokemonIQ
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ownProfile);