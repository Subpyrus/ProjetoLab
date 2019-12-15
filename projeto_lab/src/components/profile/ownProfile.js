import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LazyLoad from 'react-lazyload';
import Loading from '../layout/Loading';
import Error from '../layout/Error';
import { connect } from 'react-redux';
import { removeFavoritePokemon, removePokemonFromTeam, editProfile } from '../../store/actions/favoriteActions';
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
            getPokemonIQ: null,
            loading: true,
            error: '',
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

    getPokemonForProfileIQ = (userCorrectAnswers, userWrongAnswers) => {
        var pokemon;
        let allAnswers = userCorrectAnswers + userWrongAnswers;
        let averageCorrectAnswers = userCorrectAnswers / allAnswers;
        averageCorrectAnswers *= 100;
        averageCorrectAnswers = parseInt(averageCorrectAnswers);

        if (isNaN(averageCorrectAnswers)) {
            this.setState({ getPokemonIQ: null, loading: false })
        } else if (averageCorrectAnswers >= 90) {
            pokemon = 'alakazam';
        } else if (averageCorrectAnswers >= 75) {
            pokemon = 'metagross';
        } else if (averageCorrectAnswers >= 50) {
            pokemon = 'beheeyem';
        } else if (averageCorrectAnswers >= 25) {
            pokemon = 'quagsire';
        } else if (averageCorrectAnswers >= 10) {
            pokemon = 'slowpoke';
        } else {
            pokemon = 'magikarp';
        }

        var url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
        fetch(url)
            .then((response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then((data) => this.setState({ getPokemonIQ: data, loading: false }))
            .catch((error) => this.setState({ error: error, loading: false }))

    }

    componentDidMount() {
        const { pokemonIQ } = this.props
        this.updateWindowDimensions();
        this.getPokemonForProfileIQ(pokemonIQ[0], pokemonIQ[1])
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
        const { username, avatar, gender, nationality, favoritePokemons, favoriteTeam, triviaRecord, friends, favoriteGame, favoriteRegion } = this.props.ownProfileContent
        const { name, action } = this.state.modalContent;
        const { editProfileContent, width, editProfileData, selectNationality, selectGame, selectRegion, getPokemonIQ, loading, error } = this.state;
        var string = require('lodash/string');
        const optionsNationality = []
        const optionsGame = [];
        const optionsRegion = [];

        const customStyles = {
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: '#ebebd3' };
            },
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? '#f24643' : '#ffe066',
                backgroundColor: state.isSelected ? '#ffe066' : '#f24643',
                "&:hover": {
                    backgroundColor: "#1688b9",
                    fontWeight: 'bold',
                    color: "#ebebd3"
                }
            }),
            menu: (provided) => ({
                ...provided,
                borderRadius: 0,
                marginTop: 0,
            }),
            menuList: (provided, state) => ({
                ...provided,
                backgroundColor: '#f24643',
                color: '#ffe066',
                padding: 0
            }),
            control: (provided, state) => ({
                ...provided,
                color: '#ffe066',
                border: '1px solid #ffe066',
                borderRadius: 3,
                backgroundColor: state.isFocused ? '#f24643' : '#1688b9',
                boxShadow: state.isFocused ? null : null,
                "&:hover": {
                    borderColor: "ffe066"
                }
            }),
            dropdownIndicator: (provided, state) => ({
                ...provided,
                color: '#ffe066'
            }),
            placeholder: (provided, state) => ({
                ...provided,
                color: state.isFocused ? '#ffe066' : '#ebebd3',
                fontWeight: state.isFocused ? 'bold' : 'normal',
            }),
        }

        if (getPokemonIQ) {
            var pokemon = require('pokemon');
            var pokemonName = pokemon.getName(getPokemonIQ.id)
        }

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
                {loading ? (<Loading height='68vh' />) : error ? (<Error error={error} />) : (
                    <>
                        <Col xs='12' md='6' className='text-center'>
                            <h1>{username}</h1>
                        </Col>
                        <Col xs='12' md='6' className='text-center mb-4 pb-md-0'>
                            {editProfileContent ? (
                                <Button color='success' onClick={() => { this.editProfileState(); editProfile(selectNationality.value, selectGame.value, selectRegion.value) }}>Save Changes</Button>
                            ) : (
                                    <Button color='warning' onClick={() => { this.getEditProfileData(); }}>Edit Profile</Button>
                                )
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
                                            styles={customStyles}
                                            value={selectNationality}
                                            onChange={this.handleSelectChange}
                                            options={optionsNationality}
                                            isSearchable={false}
                                        />)
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
                                            styles={customStyles}
                                            value={selectGame}
                                            onChange={this.handleSelectChange}
                                            options={optionsGame}
                                            isSearchable={false}
                                        />)
                                        :
                                        (<p className='col-12'>{favoriteGame}</p>)
                                    }
                                </Col>
                                <Col xs='12' md='3' className='p-2 p-md-0'>
                                    <h5 className='col-12'>Favorite Generation:</h5>
                                    {editProfileContent ?
                                        (<Select required
                                            name='selectRegion'
                                            styles={customStyles}
                                            value={selectRegion}
                                            onChange={this.handleSelectChange}
                                            options={optionsRegion}
                                            isSearchable={false}
                                        />)
                                        :
                                        (<p className='col-12'>{favoriteRegion}</p>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <hr className='col-8 mx-auto my-4 my-lg-5' />
                        <Col xs='12'>
                            <Row className='text-center justify-content-center'>
                                <Col xs='12' md='6' lg='4'>
                                    <h3>Personality</h3>
                                    {favoritePokemons &&
                                        favoritePokemons.length !== 0 ? (<div><h4>{favoritesResults[0]}</h4><p>Trait: {favoritesResults[1]}</p></div>) : (
                                            <p>You still don't have any pokémons on your Favorites to calculate this result! Search for your favorites in the PokéList!</p>)}
                                </Col>
                                <Col xs='12' md='6' lg='4'>
                                    <h3>Battle Personality</h3>
                                    {favoriteTeam &&
                                        favoriteTeam.length !== 0 ? (<div><h4>{teamResults[0]}</h4><p>Trait: {teamResults[1]}</p></div>) : (
                                            <p>You still don't have any pokémons on your Favorite Team to calculate this result! Search for your team members in the PokéList!</p>)}
                                </Col>
                            </Row>
                        </Col>
                        <hr className='col-8 mx-auto my-4 my-lg-5' />
                        <Col xs='12'>
                            <Row className='text-center justify-content-center'>
                                <h3 className='col-12'>Inner Pokémon IQ</h3>
                                {triviaRecord &&
                                    !getPokemonIQ ? (
                                        <p className='col-12'>You still haven't played any PokéTrivia to calculte your Inner Pokémon IQ, start playing by <Link className='basicLink' to='/pokemon-trivia'>clicking here!</Link></p>) : (
                                        <Row className='justify-content-center align-items-center'>
                                            <h4 className='col-12'>You're intelligent as a <b>{pokemonName}</b>!</h4>
                                            <Col xs='12' sm='4' md='3' className='py-3'>
                                                <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                            </Col>
                                            <p className='col-12 col-sm-8 col-md-5'>{getPokemonIQ.flavor_text_entries[2].flavor_text}</p>
                                        </Row>
                                    )
                                }
                            </Row>
                        </Col>
                        <hr className='col-8 mx-auto my-4 my-lg-5' />
                        <Col className='pb-4 pb-lg-5' xs='12'>
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
                                        <p>You still haven't added any Pokémon Trainers to your friends list! Check cool trainers on the PokéTrainers tab!</p>
                                    ) : (
                                        friends.map((item, key) =>
                                            <Col key={key} xs='6' md='4' lg='2'>
                                                <i style={{ position: 'relative', top: '-40px' }} id={item.name} onClick={() => removeFriend(item.name)} className="far fa-times-circle"></i>
                                                <Link className='basic-link' key={key} to={{
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
                    </>
                )}
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