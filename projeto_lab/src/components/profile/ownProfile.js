import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const ownProfile = (props) => {
    const { username, avatar, gender, favoritePokemons, favoriteTeam, triviaRecord, email } = props.ownProfileContent
    console.log(triviaRecord)
    const { teamResults } = props.teamResults
    const { favoritesResults } = props.favoritesResults
    const triviaResults = props.triviaResults;
    console.log(triviaResults)

    return (
        <Row>
            <Col xs='12' md='6' className='text-center text-md-left'>
                <h1>{username}</h1>
            </Col>
            <Col xs='6' className='text-center p-2 p-md-0 text-md-right'>
                <Button color='warning'>Edit Profile</Button>
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
                        <p>You still don't have any pokémons on your Favorites to calculate this result! Search for your favorites in the PokéList!</p>
                    )
                }
                <h4>Battle wise</h4>
                {favoriteTeam &&
                    favoriteTeam.length !== 0 ? (
                        <p>{teamResults}</p>
                    ) : (
                        <p>You still don't have any pokémons on your Favorite Team to calculate this result! Search for your team members in the PokéList!</p>
                    )
                }
            </Col>
            <Col xs='12' md='6' lg='4'>
                <h3>Inner Pokémon IQ</h3>
                {triviaRecord &&
                    !triviaResults ? (
                        <p>You still haven't play any PokéTrivia...</p>
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
                {favoritePokemons &&
                    favoritePokemons.length === 0 ? (
                        <p>You still haven't added any Favorite Pokémons to your list yet! Search for your favorites in the PokéList!</p>
                    ) : (
                        <Row className='justify-content-center'>
                            {favoritePokemons.map((item, key) =>
                                <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key}>
                                    <LazyLoad height={200} once={true}>
                                        <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                    </LazyLoad>
                                </Col>
                            )}
                        </Row>
                    )
                }
            </Col>
            <Col xs='12' md='6'>
                <h3>Favorite Pokémon Team</h3>
                {favoriteTeam &&
                    favoriteTeam.length === 0 ? (
                        <p>You still haven't added any Pokémon to your Favorite Team! Search for your team members in the PokéList!</p>
                    ) : (
                        <Row className='justify-content-center'>
                            {favoriteTeam.map((item, key) =>
                                <Col className='d-flex align-items-center justify-content-center' xs='6' md='4' key={key}>
                                    <LazyLoad height={200} once={true}>
                                        <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                    </LazyLoad>
                                </Col>
                            )}
                        </Row>
                    )}
            </Col>
        </Row>
    )
}

export default ownProfile;