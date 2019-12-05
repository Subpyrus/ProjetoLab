import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import { connect } from 'react-redux';

const othersProfile = (props) => {
    const { username, avatar, gender, favoritePokemons, favoriteTeam, triviaRecord, email, friends } = props.othersProfileContent
    const { teamResults } = props.teamResults
    const { favoritesResults } = props.favoritesResults
    const { loggedUserFriends } = props;
    const triviaResults = props.triviaResults;
    console.log(triviaResults)

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
            <Col xs='12' md='6' lg='4'>
                <h3 className='col-12'>Generic Info</h3>
                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                <p>Gender:{gender}</p>
                <p>Favorite Generation:</p>
                <p>Favorite Game:</p>
                <p>Favorite City:</p>
                <p>Favorite Pokéball:</p>
            </Col>
            <Col xs='12' md='6' lg='4'>
                <h3>Personality</h3>
                <h4>Personality wise</h4>
                {favoritePokemons &&
                    favoritePokemons.length !== 0 ? (
                        <p>{favoritesResults}</p>
                    ) : (
                        <p>{username} doesn't have any Favorite Pokémons so we couldn't calculate his personality...</p>
                    )
                }
                <h4>Battle wise</h4>
                {favoriteTeam &&
                    favoriteTeam.length !== 0 ? (
                        <p>{teamResults}</p>
                    ) : (
                        <p>{username} doesn't have any Pokémons in his favorite team so we couldn't calculate his personality in Pokémon Battles...</p>
                    )
                }
            </Col>
            <Col xs='12' md='6' lg='4'>
                <h3>Inner Pokémon IQ</h3>
                {triviaRecord &&
                    !triviaResults ? (
                        <p>{username} hasn't still played any Pokémon Trivia.</p>
                    ) : (
                        <>
                          <img />
                          <p>description</p>  
                        </>
                    )
                }
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
            <Col xs='12' md='6'>
                <h3>Favorite Pokémon Team</h3>
                {favoriteTeam && favoriteTeam.length === 0 ? (
                    <p>{username} doesn't have any Pokémons in his favorite team...</p>) :
                    (<Row className='justify-content-center'>
                        {favoriteTeam.map((item, key) =>
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
    console.log(state);
    return {
        friendAction: state.friends.actionFriendError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(othersProfile);