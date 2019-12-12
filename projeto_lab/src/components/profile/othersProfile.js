import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import { connect } from 'react-redux';
import { getInfoPokemonPage, getPokemonForProfileIQ } from '../../store/actions/apiActions';

const othersProfile = (props) => {
    const { username, avatar, gender, nationality, favoriteGame, favoriteRegion, favoritePokemons, favoriteTeam, triviaRecord, friends } = props.othersProfileContent
    const { loggedUserFriends, pokemonIQ, favoritesResults, teamResults } = props;

    console.log(pokemonIQ)

    if (pokemonIQ) {
        var pokemon = require('pokemon');
        var pokemonName = pokemon.getName(pokemonIQ.id)
    }

    if (loggedUserFriends) {
        var findFriends = loggedUserFriends.find(friend => friend.username === username)
    }

    return (
        <Row>
            <Col xs='12' md='6' className='text-center'>
                <h1>{username}</h1>
            </Col>
            <Col xs='12' md='6' className=''className='text-center py-3 py-md-0'>
                {findFriends === undefined ?
                    (<Button color='warning' onClick={() => props.addFriend(props.othersProfileContent)}>Add to Friends List</Button>) :
                    (<Button color='danger' onClick={() => props.removeFriend(props.othersProfileContent)}>Remove from Friends List</Button>)}
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
                        <p className='col-12'>{favoriteGame}</p>
                    </Col>
                    <Col xs='12' md='3'>
                        <h5 className='col-12'>Favorite Generation:</h5>
                        <p className='col-12'>{favoriteRegion}</p>
                    </Col>
                </Row>
            </Col>
            <hr className='col-8 mx-auto my-4 my-lg-5' />
            <Col xs='12' md='6' lg='12'>
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
                        !pokemonIQ ? (
                            <p className='col-12'>{username} hasn't played any PokéTrivia to calculte their Inner Pokémon IQ...</p>) : (
                            <>
                                <p>{username} is intelligent as a {pokemonName}!</p>
                                <Col xs='6' lg='3' className='py-3'>
                                    <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                </Col>
                                <p>{pokemonIQ.flavor_text_entries[2].flavor_text}</p>
                            </>
                        )
                    }
                </Row>
            </Col>
            <Col className='pb-4 pb-lg-5' xs='12'>
                <Row className='text-center justify-content-center'>
                    <Col className='py-3 py-lg-4' xs='12' md='6'>
                        <h3>Favorite Pokémons</h3>
                        {favoritePokemons &&
                            favoritePokemons.length === 0 ? (
                                <p>{username} doesn't have any Pokémon in their Favorite Pokemons List!</p>
                            ) : (
                                <Row className='justify-content-center'>
                                    {favoritePokemons.map((item, key) =>
                                        <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key} style={{ height: '150px' }}>
                                            <LazyLoad height={200} once={true}>
                                                <Link to={`/pokemon-list/national/pokemon-page/${item.name.toLowerCase()}`}
                                                    onClick={() => getInfoPokemonPage(item.name.toLowerCase())}>
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
                                <p>{username} doesn't have any Pokémon in their Favorite Team!</p>
                            ) : (
                                <Row className='justify-content-center'>
                                    {favoriteTeam.map((item, key) =>
                                        <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key} style={{ height: '150px' }}>
                                            <LazyLoad height={200} once={true}>
                                                <Link to={`/pokemon-list/national/pokemon-page/${item.name.toLowerCase()}`}
                                                    onClick={() => getInfoPokemonPage(item.name.toLowerCase())}>
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
                            <p>{username} still doesn't have any Pokémon Trainers in their friends list.</p>
                        ) : (
                            friends.map((item, key) =>
                                <Col key={key} xs='12' md='4' lg='2'>
                                    <Link className='basic-link' to={{
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

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        addFriend: (user) => dispatch(addFriend(user)),
        removeFriend: (user) => dispatch(removeFriend(user)),
        getPokemonForProfileIQ: (pokemon) => dispatch(getPokemonForProfileIQ(pokemon))
    }
}

const mapStateToProps = (state) => {
    return {
        friendAction: state.friends.actionFriendError,
        pokemonIQ: state.apiCalls.apiData.getPokemonIQ,
        loggedUserFriends: state.firebase.profile.friends
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(othersProfile);