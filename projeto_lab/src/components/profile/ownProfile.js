import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SelectStyles from '../layout/SelectStyles';
import PokemonImage from '../layout/PokemonImage';
import { connect } from 'react-redux';
import { editProfile } from '../../store/actions/authActions'
import { removeFavoritePokemon, removePokemonFromTeam } from '../../store/actions/favoriteActions';
import { removeFriend } from '../../store/actions/friendsActions';
import { getInfoPokemonPage } from '../../store/actions/apiActions';

class ownProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            editProfileContent: false,
            editProfileData: '',
            modalContent: {
                name: '',
                action: ''
            },
            width: window.innerWidth,
            selectNationality: {
                label: this.props.ownProfileContent.nationality,
                value: this.props.ownProfileContent.nationality
            },
            selectGame: {
                label: this.props.ownProfileContent.favoriteGame,
                value: this.props.ownProfileContent.favoriteGame
            },
            selectRegion: {
                label: this.props.ownProfileContent.favoriteRegion,
                value: this.props.ownProfileContent.favoriteRegion
            }
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

    editProfileState = () => {
        this.setState({
            editProfileContent: !this.state.editProfileContent
        });
    }

    subtmitChanges = () => {
        const { selectNationality, selectGender, game, region } = this.state
        this.editProfile(selectNationality, selectGender, game, region);
    }

    getEditProfileData = () => {
        this.setState({ isLoading: true })

        const urls = [
            `https://restcountries.eu/rest/v2/all?fields=name`,
            `https://pokeapi.co/api/v2/version-group/`,
            `https://pokeapi.co/api/v2/region/`]

        Promise.all(urls.map(url =>
            fetch(url).then(async (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            })))
            .then(async (data) => this.setState({ isLoading: false, editProfileData: data, editProfileContent: !this.state.editProfileContent }))
            .catch((error) => this.setState({ isLoading: false, editProfileData: error, editProfileContent: !this.state.editProfileContent }))
    }

    handleSelectChange = (value, action) => {
        this.setState({ [action.name]: { label: value.value, value: value.value } });
    }

    toggleFirstTime = (name, action) => {
        this.setState({
            modal: !this.state.modal,
            modalContent: { name: name, action: action }
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { removeFavoritePokemon, removePokemonFromTeam, removeFriend, getInfoPokemonPage, pokemonIQ, editProfile, teamResults, favoritesResults } = this.props;
        const { username, avatar, gender, nationality, favoritePokemons, favoriteTeam, triviaRecord, friends, favoriteGame, favoriteRegion } = this.props.profileContent
        const { name, action } = this.state.modalContent;
        const { editProfileContent, width, editProfileData, selectNationality, selectGame, selectRegion } = this.state;
        var string = require('lodash/string');
        const optionsNationality = []
        const optionsGame = [];
        const optionsRegion = [];

        var pokemon = require('pokemon');
        var pokemonName;
        pokemonIQ ? (pokemonName = pokemon.getName(pokemonIQ.id)) : (pokemonName = null)

        if (editProfileContent) {
            for (let item of editProfileData[0]) {
                optionsNationality.push({ value: item.name, label: item.name })
            }
            for (let item of editProfileData[1].results) {
                optionsGame.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
            }
            for (let item of editProfileData[2].results) {
                optionsRegion.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
            }
        }

        return (
            <Row>
                <Col xs='12' md='6' className='text-center'>
                    <h1>{username}</h1>
                </Col>
                <Col xs='12' md='6' className='text-center mb-4 pb-md-0'>
                    {editProfileContent ?
                        (<Button color='success' onClick={() => { this.editProfileState(); editProfile(selectNationality.value, selectGame.value, selectRegion.value) }}>Save Changes</Button>) :
                        (<Button color='warning' onClick={() => { this.getEditProfileData(); }}>Edit Profile</Button>)
                    }
                </Col>
                <Col xs='12'>
                    <Row className='text-center align-items-center'>
                        {width < 768 &&
                            <Col className='d-flex justify-content-center p-2 p-md-0' xs='12' md='2' lg='2'>
                                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                            </Col>
                        }
                        <Col xs='12' md='3' className='p-2 p-md-0'>
                            <h5 className='col-12'>Gender:</h5>
                            <p className='col-12'>{gender}</p>
                        </Col>
                        <Col xs='12' md='2' className='p-2 p-md-0'>
                            <h5 className='col-12'>From:</h5>
                            {editProfileContent ?
                                (<Select required
                                    name='selectNationality'
                                    styles={SelectStyles}
                                    value={selectNationality}
                                    onChange={this.handleSelectChange}
                                    options={optionsNationality}
                                    isSearchable={false} />)
                                :
                                (<p className='col-12'>{nationality}</p>)
                            }
                        </Col>
                        {width > 768 &&
                            <Col className='d-flex justify-content-center p-2 p-md-0' xs='12' md='2' lg='2'>
                                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                            </Col>
                        }
                        <Col xs='12' md='2' className='p-2 p-md-0'>
                            <h5 className='col-12'>Favorite Game:</h5>
                            {editProfileContent ?
                                (<Select required
                                    name='selectGame'
                                    styles={SelectStyles}
                                    value={selectGame}
                                    onChange={this.handleSelectChange}
                                    options={optionsGame}
                                    isSearchable={false} />)
                                :
                                (<p className='col-12'>{favoriteGame}</p>)
                            }
                        </Col>
                        <Col xs='12' md='3' className='p-2 p-md-0'>
                            <h5 className='col-12'>Favorite Generation:</h5>
                            {editProfileContent ?
                                (<Select required
                                    name='selectRegion'
                                    styles={SelectStyles}
                                    value={selectRegion}
                                    onChange={this.handleSelectChange}
                                    options={optionsRegion}
                                    isSearchable={false} />)
                                :
                                (<p className='col-12'>{favoriteRegion}</p>)
                            }
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12'>
                    <Row className='text-center justify-content-center'>
                        <Col xs='12' md='6' lg='5'>
                            <h3>Personality</h3>
                            {favoritePokemons &&
                                favoritePokemons.length !== 0 ?
                                (<div>
                                    <h4>{favoritesResults[0]}</h4>
                                    <p className='text-left'>{favoritesResults[1]}</p>
                                </div>) :
                                (<p>You still don't have any pokémons on your Favorites to calculate this result! Search for your favorites in the PokéList!</p>)}
                        </Col>
                        <Col xs='12' md='6' lg='5'>
                            <h3>Battle Personality</h3>
                            {favoriteTeam &&
                                favoriteTeam.length !== 0 ?
                                (<div>
                                    <h4>{teamResults[0]}</h4>
                                    <p className='text-left'>{teamResults[1]}</p>
                                </div>) :
                                (<p>You still don't have any pokémons on your Favorite Team to calculate this result! Search for your team members in the PokéList!</p>)}
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12'>
                    <Row className='text-center justify-content-center'>
                        <h3 className='col-12'>Inner Pokémon IQ</h3>
                        <h4 className='col-12'>Trivia Stats</h4>
                        <p className='col-12 col-md-3'>No. Realized Trivias -
                        <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.realizedTrivias}`}</span>
                        </p>
                        <p className='col-12 col-md-3'>No. Correct Answers -
                        <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.correctAnswers}`}</span>
                        </p>
                        <p className='col-12 col-md-3'>No. Wrong Answers -
                        <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.wrongAnswers}`}</span>
                        </p>
                        {triviaRecord &&
                            !pokemonIQ ? (
                                <p className='col-12 pt-4'>You still haven't played any PokéTrivia to calculte your Inner Pokémon IQ, start playing by <Link className='basicLink' to='/pokemon-trivia'>clicking here!</Link></p>) : (
                                <Row className='justify-content-center align-items-center pt-4'>
                                    <h4 className='col-12'>You're intelligent as a <b>{pokemonName}</b>!</h4>
                                    <Col xs='12' className='py-3'>
                                        <Link to={`/pokemon-list/national/pokemon-page/${pokemonName.toLowerCase()}`}
                                            onClick={() => getInfoPokemonPage(pokemonName.toLowerCase())}>
                                            <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                        </Link>
                                    </Col>
                                    {pokemonIQ.flavor_text_entries.map((item, key) =>
                                        (item.language.name === 'en' && item.version.name === 'alpha-sapphire') && <p className='text-left col-6 mx-auto' key={key}>{item.flavor_text}</p>
                                    )}
                                </Row>
                            )
                        }
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col className='pb-4 pb-lg-5 mx-auto' xs='12' md='11'>
                    <Row className='text-center justify-content-center'>
                        <Col className='py-3 py-lg-4' xs='12'>
                            <h3>Favorite Pokémons</h3>
                            {favoritePokemons &&
                                favoritePokemons.length === 0 ? (
                                    <p>You still haven't added any Favorite Pokémons to your list yet! Search for your favorites in the PokéList!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoritePokemons.map((item, key) =>
                                            <React.Fragment key={key}>
                                                <PokemonImage key={key} pokemonName={item.name} img={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} pokedexSearch={'national'} functionPokemon={getInfoPokemonPage} lg='3' />
                                                <i style={{ position: 'relative', top: '20px', left: '-40px' }} onClick={() => this.toggleFirstTime(item.name, 'Favorites Pokémon List')} className="far fa-times-circle h-25"></i>
                                            </React.Fragment>
                                        )}
                                    </Row>)}
                        </Col>
                        <Col className='py-3 py-lg-4 offset-lg-1 mx-auto' xs='12' md='11'>
                            <h3>Favorite Pokémon Team</h3>
                            {favoriteTeam &&
                                favoriteTeam.length === 0 ? (
                                    <p>You still haven't added any Pokémon to your Favorite Team! Search for your team members in the PokéList!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoriteTeam.map((item, key) =>
                                            <React.Fragment key={key}>
                                                <PokemonImage key={key} pokemonName={item.name} img={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} pokedexSearch={'national'} functionPokemon={getInfoPokemonPage} lg='3' />
                                                <i style={{ position: 'relative',  top: '20px', left: '-40px' }} id={item.name} onClick={() => this.toggleFirstTime(item.name, 'Favorite Pokémon Team')} className="far fa-times-circle h-25"></i>
                                            </React.Fragment>
                                        )}
                                    </Row>
                                )}
                        </Col>
                    </Row>
                </Col>
                <Col xs='12'>
                    <Row className='justify-content-center text-center'>
                        <h3 className='col-12'>Following</h3>
                        {friends &&
                            friends.length === 0 ? (
                                <p>You still haven't added any Pokémon Trainers to your follow list! Check cool trainers on the PokéTrainers tab!</p>
                            ) : (
                                friends.map((item, key) =>
                                    <Col key={key} xs='6' md='4' lg='2'>
                                        <i style={{ position: 'relative', top: '0px', left: '35%' }} id={item.name} onClick={() => removeFriend(item.name)} className="far fa-times-circle"></i>
                                        <Link className='basicLink d-block' key={key} to={{
                                            pathname: `/pokemon-trainers/profile/${item.username}`,
                                            state: {
                                                user: item
                                            }
                                        }}>
                                            <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} />
                                            <p>{item.username}</p>
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
        removeFriend: (user) => dispatch(removeFriend(user)),
        editProfile: (nationalityForm, genderForm, gameForm, regionForm) => dispatch(editProfile(nationalityForm, genderForm, gameForm, regionForm))
    }
}

const mapStateToProps = (state) => {
    return {
        profileContent: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ownProfile);