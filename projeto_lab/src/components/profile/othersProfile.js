import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PokemonImage from '../layout/PokemonImage';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import { connect } from 'react-redux';
import { getInfoPokemonPage, getUserAndPokemonForProfileIQ, getYoutubeVideo } from '../../store/actions/apiActions';

class othersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getPokemonIQ: null,
            error: '',
            width: window.innerWidth
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        const { username, avatar, gender, nationality, favoriteGame, favoriteRegion, favoritePokemons, favoriteTeam, triviaRecord, friends } = this.props.othersProfileContent
        const { loggedUserFollowers, favoritesResults, teamResults, pokemonIQ } = this.props;
        const { width } = this.state;

        var pokemon = require('pokemon');
        var pokemonName;
        pokemonIQ ? (pokemonName = pokemon.getName(pokemonIQ.id)) : (pokemonName = null)

        if (loggedUserFollowers) {
            var findFriends = loggedUserFollowers.find(friend => friend.username === username)
        }

        return (
            <Row>
                <Col xs='12' md='6' className='text-center'>
                    <h1>{username}</h1>
                </Col>
                <Col xs='12' md='6' className='' className='text-center py-3 py-md-0'>
                    {findFriends === undefined ?
                        (<Button color='warning' onClick={() => this.props.addFriend(this.props.othersProfileContent)}>Add to Following List</Button>) :
                        (<Button color='danger' onClick={() => this.props.removeFriend(this.props.othersProfileContent)}>Remove from Following List</Button>)}
                </Col>
                <Col xs='12'>
                    <Row className='text-center align-items-center'>
                        {width < 768 &&
                            <Col className='d-flex justify-content-center mb-2 p-2 p-md-0' xs='12' md='2' lg='2'>
                                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                            </Col>
                        }
                        <Col xs='12' md='3' className='p-2 p-md-0'>
                            <h5 className='col-12'>Gender:</h5>
                            <p className='col-12'>{gender}</p>
                        </Col>
                        <Col xs='12' md='2' className='p-2 p-md-0'>
                            <h5 className='col-12'>From:</h5>
                            <p className='col-12'>{nationality}</p>
                        </Col>
                        {width > 768 &&
                            <Col className='d-flex justify-content-center mb-2 p-2 p-md-0' xs='12' md='2' lg='2'>
                                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                            </Col>
                        }
                        <Col xs='12' md='2' className='p-2 p-md-0'>
                            <h5 className='col-12'>Favorite Game:</h5>
                            <p className='col-12'>{favoriteGame}</p>
                        </Col>
                        <Col xs='12' md='3' className='p-2 p-md-0'>
                            <h5 className='col-12'>Favorite Generation:</h5>
                            <p className='col-12'>{favoriteRegion}</p>
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12'>
                    <Row className='text-center justify-content-center'>
                        <Col xs='12' md='6'>
                            <h3>Personality</h3>
                            {favoritePokemons &&
                                favoritePokemons.length !== 0 ? (<div><h4>{favoritesResults[0]}</h4><p>Trait: {favoritesResults[1]}</p></div>) : (
                                    <p>{username} doesn't have any pokémons on their Favorite Pokemons List to calculate this result...</p>)}
                        </Col>
                        <Col xs='12' md='6'>
                            <h3>Battle Personality</h3>
                            {favoriteTeam &&
                                favoriteTeam.length !== 0 ? (<div><h4>{teamResults[0]}</h4><p>Trait: {teamResults[1]}</p></div>) : (
                                    <p>{username} doesn't have any pokémons on their Favorite Team to calculate this result...</p>)}
                        </Col>
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12'>
                    <Row className='text-center justify-content-center'>
                        <h3 className='col-12'>Inner Pokémon IQ</h3>
                        {triviaRecord &&
                            !pokemonIQ ? (<p className='col-12'>{username} hasn't played any PokéTrivia to calculte their Inner Pokémon IQ...</p>) :
                            (<>
                                <p>{username} is intelligent as a {pokemonName}!</p>
                                <Col xs='6' lg='3' className='py-3'>
                                    <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                </Col>
                                {pokemonIQ.flavor_text_entries.map((item, key) =>
                                    (item.language.name === 'en' && item.version.name === 'alpha-sapphire') && <p key={key} className='col-12 col-sm-10 mx-auto'>{item.flavor_text}</p>
                                )}
                            </>)
                        }
                    </Row>
                </Col>
                <Col className='pb-4 pb-lg-5' xs='12'>
                    <Row className='text-center justify-content-center'>
                        <Col className='py-3 py-lg-4' xs='12'>
                            <h3>Favorite Pokémons</h3>
                            {favoritePokemons &&
                                favoritePokemons.length === 0 ? (
                                    <p>{username} doesn't have any Pokémon in their Favorite Pokemons List!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoritePokemons.map((item, key) =>
                                            <React.Fragment key={key}>
                                                <PokemonImage key={key} pokemonName={item.name} img={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} pokedexSearch={'national'} functionPokemon={getInfoPokemonPage} functionVideo={getYoutubeVideo} lg='3' />
                                            </React.Fragment>
                                        )}
                                    </Row>)}
                        </Col>
                        <Col className='py-3 py-lg-4' xs='12'>
                            <h3>Favorite Pokémon Team</h3>
                            {favoriteTeam &&
                                favoriteTeam.length === 0 ? (
                                    <p>{username} doesn't have any Pokémon in their Favorite Team!</p>
                                ) : (
                                    <Row className='justify-content-center'>
                                        {favoriteTeam.map((item, key) =>
                                            <React.Fragment key={key}>
                                                <PokemonImage key={key} pokemonName={item.name} img={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} pokedexSearch={'national'} functionPokemon={getInfoPokemonPage} functionVideo={getYoutubeVideo} lg='3' />
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
                                <p>{username} still doesn't have any Pokémon Trainers in their follow list.</p>
                            ) : (
                                friends.map((item, key) =>
                                    <Col key={key} xs='6' md='4' lg='2'>
                                        <Link onClick={() => getUserAndPokemonForProfileIQ(item.username)} className='basicLink' to={{
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
            </Row >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        addFriend: (user) => dispatch(addFriend(user)),
        removeFriend: (user) => dispatch(removeFriend(user)),
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon))
    }
}

const mapStateToProps = (state) => {
    return {
        friendAction: state.friends.actionFriendError,
        loggedUserFollowers: state.firebase.profile.friends
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(othersProfile);