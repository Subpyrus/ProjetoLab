import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import { connect } from 'react-redux';

const othersProfile = (props) => {
    const { username, avatar, gender, nationality, favoriteGame, favoriteRegion, favoritePokemons, favoriteTeam, triviaRecord, friends } = props.othersProfileContent
    const { teamResults } = props.teamResults
    const { favoritesResults } = props.favoritesResults
    const { loggedUserFriends, pokemonIQ } = props;

    if (pokemonIQ) {
        var pokemon = require('pokemon');
        var pokemonName = pokemon.getName(pokemonIQ.id)
    }

    if (friends) {
        var findFriends = loggedUserFriends.find(friend => friend.name === username)
    }

    return (
        <Row>
            <Col xs='12' md='6' className='text-center text-md-left'>
                <h1>{username}</h1>
            </Col>
            <Col xs='6' className='text-center p-2 p-md-0 text-md-right'>
                {!findFriends ?
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
                            <p className='col-12'>You still haven't played any PokéTrivia to calculte your Inner Pokémon IQ, start playing by <Link className="basicLink" to='/pokemon-trivia'>clicking here!</Link></p>) : (
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
            <Col xs='12' md='6'>
                <h3>Favorite Pokémons</h3>
                {favoritePokemons && favoritePokemons.length === 0 ? (<p>{username} doesn't have any Favorite Pokémons...</p>) :
                    (<Row className='justify-content-center'>
                        {favoritePokemons.map((item, key) =>
                            <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key}>
                                <Link to={`/pokemon-list/national/pokemon-page/${item.name.toLocaleLowerCase()}`} onClick={props.getPokemon}>
                                    <LazyLoad height={200} once={true}>
                                        <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                    </LazyLoad>
                                </Link>
                            </Col>
                        )}
                    </Row>)}
            </Col>
            <Col xs='12'>
                <Row className='justify-content-center text-center'>
                    <h3 className='col-12'>Friends</h3>
                    {friends &&
                        friends.length === 0 ? (
                            <p>{username} still doesn't have any Pokémon Trainers in their friends list.</p>
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
            <Col xs='12'>
                <Row className='justify-content-center text-center'>
                    <h3 className='col-12'>Friends</h3>
                    {(friends.map((item, key) =>
                        <Col key={key} xs='12' md='4' lg='2'>
                            <Link className='basic-link' key={key} to={`pokemon-trainers/profile/${item.name}`}>
                                <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} />
                                <p>{item.name}</p>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (user) => dispatch(addFriend(user)),
        removeFriend: (user) => dispatch(removeFriend(user))
    }
}

const mapStateToProps = (state) => {
    return {
        friendAction: state.friends.actionFriendError,
        pokemonIQ: state.apiCalls.apiData.getPokemonIQ
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(othersProfile);