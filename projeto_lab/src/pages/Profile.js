import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import { personalityFavorites, personalityTeams } from '../components/profile/personalityContent';
import LazyLoad from 'react-lazyload';

class Profile extends Component {

    getStats = (array) => {
        var saveStats = [];
        var returnArray = []
        for (let item of array) {
            returnArray.push({ name: item.stat.name, value: [] })
            saveStats.push([])
        }
        return [returnArray, saveStats];
    }

    getStatsValues = (firstArray, secondArray, stats) => {
        for (let firstItem in firstArray) {
            for (let [index, secondItem] of secondArray.entries()) {
                stats[index].value.push(secondItem.base_stat)
                let sum = stats[index].value.reduce((a, b) => a + b, 0);
                stats[index].value = [sum];
            }
        }
    }

    compareStats = (array, personality) => {
        var returnResults = [];
        let lastIndex = array.length - 1;

        class verdictFromStats {
            constructor(name, verdict, stats) {
                this.name = name;
                this.verdict = verdict;
                this.stats = stats;
            }
        }

        if (personality === 'favorites') {
            for (let resultStats of personalityFavorites) {
                returnResults.push(new verdictFromStats(resultStats[0], resultStats[1], resultStats[2]));
            }
        } else {
            for (let resultStats of personalityTeams) {
                returnResults.push(new verdictFromStats(resultStats[0], resultStats[1], resultStats[2]));
            }
        }

        switch (array[lastIndex].name) {
            case 'hp':
                if (array[lastIndex - 1].name === 'defense') {
                    return [returnResults[1].name, returnResults[1].verdict]
                } else {
                    return [returnResults[0].name, returnResults[0].verdict]
                }
            case 'attack':
                if (array[lastIndex - 1].name === 'special-attack') {
                    return [returnResults[3].name, returnResults[3].verdict]
                } else if (array[lastIndex - 1].name === 'speed') {
                    return [returnResults[4].name, returnResults[4].verdict]
                } else {
                    return [returnResults[2].name, returnResults[2].verdict]
                }
            case 'defense':
                if (array[lastIndex - 1].name === 'special-defense') {
                    return [returnResults[6].name, returnResults[6].verdict]
                } else if (array[lastIndex - 1].name === 'hp') {
                    return [returnResults[1].name, returnResults[1].verdict]
                } else {
                    return [returnResults[5].name, returnResults[5].verdict]
                }
            case 'special-attack':
                if (array[lastIndex - 1].name === 'attack') {
                    return [returnResults[3].name, returnResults[3].verdict]
                } else if (array[lastIndex - 1].name === 'speed') {
                    return [returnResults[8].name, returnResults[8].verdict]
                } else {
                    return [returnResults[7].name, returnResults[7].verdict]
                }
            case 'special-defense':
                if (array[lastIndex - 1].name === 'defense') {
                    return [returnResults[6].name, returnResults[6].verdict]
                } else {
                    return [returnResults[9].name, returnResults[9].verdict]
                }
            case 'speed':
                if (array[lastIndex - 1].name === 'attack') {
                    return [returnResults[4].name, returnResults[4].verdict]
                } else if (array[lastIndex - 1].name === 'special-attack') {
                    return [returnResults[8].name, returnResults[8].verdict]
                } else {
                    return [returnResults[10].name, returnResults[10].verdict]
                }
            default:
                return 'Ops! Something went wrong'
        }
    }

    getStatsMessages = (array, type) => {
        let arrayStats = this.getStats(array[0].stats);
        this.getStatsValues(array, array[0].stats, arrayStats[0]);
        arrayStats[0].sort((a, b) => a.value[0] - b.value[0]);
        return this.compareStats(arrayStats[0], type);
    }

    render() {
        const { username, avatar, gender, favoritePokemons, favoriteTeam, quizzRecord, email } = this.props.profileContent

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
                    {
                        favoritePokemons.length !== 0 ? (
                            <p>{this.getStatsMessages(favoritePokemons, 'favorites')}</p>
                        ) : (
                                <p>You still don't have any pokémons on your Favorites to calculate this result! Search for your favorites in the PokéList!</p>
                            )
                    }
                    <h4>Battle wise</h4>
                    {
                        favoriteTeam.length !== 0 ? (
                            <p>{this.getStatsMessages(favoriteTeam, 'team')}</p>
                        ) : (
                                <p>You still don't have any pokémons on your Favorite Team to calculate this result! Search for your team members in the PokéList!</p>
                            )
                    }
                </Col>
                <Col xs='12' md='6' lg='4'>
                    <h3>Inner Pokémon IQ</h3>
                    {quizzRecord.length === 0 ? (
                        <p>Quizz</p>
                    ) : (
                            <>
                                {quizzRecord.map((item, key) =>
                                    <Col key={key}>

                                    </Col>
                                )}
                            </>
                        )
                    }
                </Col>
                <Col xs='12' md='6'>
                    <h3>Favorite Pokémons</h3>
                    {favoritePokemons.length === 0 ? (
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
                    {favoriteTeam.length === 0 ? (
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
}

export default Profile;