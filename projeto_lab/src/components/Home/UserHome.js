import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import Loading from '../layout/Loading';
import { personalityFavorites, personalityTeams } from '../profile/personalityContent';
import Select from 'react-select';
import SelectStyles from '../layout/SelectStyles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getUserAndPokemonForProfileIQ, getInfoPokemonPage } from '../../store/actions/apiActions'

class UserHome extends Component {
    state = {
        selectNotifications: { value: 'All Users Activity', label: 'All Users Activity' }
    }

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
        if (!array[0]) {
            return [];
        } else {
            let arrayStats = this.getStats(array[0].stats);
            this.getStatsValues(array, array[0].stats, arrayStats[0]);
            arrayStats[0].sort((a, b) => a.value[0] - b.value[0]);
            return this.compareStats(arrayStats[0], type);
        }
    }

    handleSelectChange = (value, action) => {
        this.setState({ [action.name]: value.value });
    }

    render() {
        const { profileContent, notifications, getInfoPokemonPage, getUserAndPokemonForProfileIQ } = this.props
        const { username, triviaRecord, favoritePokemons, favoriteTeam, friends } = profileContent
        const messageFavorites = this.getStatsMessages(favoritePokemons, 'favorites');
        const messageTeam = this.getStatsMessages(favoriteTeam, 'team');

        const optionsNotifications = [
            { value: 'All Users Activity', label: 'All Users Activity' },
            { value: 'Friends Activity', label: 'Friends Activity' },
            { value: 'Your Activity', label: 'Your Activity' }
        ];

        var string = require('lodash/string')
        var array = require('lodash/array')
        var recentFriends = array.takeRight(friends, 6);
        return (
            <>
                <h1 className='col-12 text-center text-md-left px-0'>Home - <small>Wecolme {username}</small></h1>
                {!notifications ? (<Loading height='50vh' />) : (
                    <Row>
                        <Col xs='12' lg='8' className='px-0 pb-5'>
                            <Col xs='12'>
                                <Row>
                                    <h3 className='col-12 col-md-6 col-lg-8'>All Users Activity</h3>
                                    <Col xs='12' md='6' lg='4'>
                                        <Select required
                                            name='selectNotifications'
                                            styles={SelectStyles}
                                            value={this.state.selectNotifications}
                                            onChange={this.handleSelectChange}
                                            options={optionsNotifications}
                                            placeholder='select your gender'
                                            isSearchable={false} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='12'>
                                {notifications.map((item, key) =>
                                    <Col xs='12' key={key}>
                                        <Row className='p-2 text-center d-flex align-items-center'>
                                            <Link onClick={() => getUserAndPokemonForProfileIQ(item.user)} className='col-12 col-md-3 text-center containerLink p-0' to={{
                                                pathname: `/pokemon-trainers/profile/${item.user}`,
                                                state: {
                                                    user: item
                                                }
                                            }}>
                                                <Col xs='12' className='py-2 py-md-0 text-center justify-content-center'>
                                                    <img src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} alt={item.avatar} />
                                                </Col>
                                                <Col xs='12' className='py-2 py-md-0'>
                                                    <p className='m-0'>{item.user}</p>
                                                </Col>
                                            </Link>
                                            <Col xs='12' md='7' className='py-2 py-md-0'>
                                                <p>{item.content}</p>
                                            </Col>
                                            <Col xs='12' md='2'>
                                                <p className='m-0' style={{ color: '#ffe066' }}>
                                                    <small>{moment(item.time.toDate()).fromNow()}</small>
                                                </p>
                                            </Col>
                                        </Row>
                                        <hr className='my-2' />
                                    </Col>
                                )}
                            </Col>
                        </Col>
                        <Col xs='12' md='12' lg='4'>
                            <Row>
                                <Col xs='12' md='6' lg='12'>
                                    <Row className='text-lg-left text-center'>
                                        <h3 className='col-12'>Your Stats</h3>
                                        <div className='py-2'>
                                            <h4 className='col-12'>Favorite Lists</h4>
                                            <p className='col-12'>
                                                No. of Favorite Pokemons -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${favoritePokemons.length}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                No. of Favorite Pokemon Team -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${favoriteTeam.length}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                Personality Trait -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${messageFavorites[0]}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                Battle Personality Trait -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${messageTeam[0]}`}
                                                </span>
                                            </p>
                                        </div>
                                        <div className='py-2'>
                                            <h4 className='col-12'>Trivia</h4>
                                            <p className='col-12'>
                                                No. of Realized Trivias -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${triviaRecord.realizedTrivias}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                No. of Correct Answers -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${triviaRecord.correctAnswers}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                No. of Wrong Answers -
                                                <span style={{ color: '#ffe066', fontWeight: 'bold' }}>
                                                    {` ${triviaRecord.wrongAnswers}`}
                                                </span>
                                            </p>
                                            <p className='col-12'>
                                                Inner Pokémon IQ - {triviaRecord.pokemonIQ ? (
                                                    <Link className='basicLink d-inline' to={`/pokemon-list/national/pokemon-page/${triviaRecord.pokemonIQ}`} onClick={() => getInfoPokemonPage(triviaRecord.pokemonIQ)}>{string.startCase(triviaRecord.pokemonIQ)}</Link>
                                                ) : ("You still haven't played PokéTrivia to calculate this result")}
                                            </p>
                                        </div>
                                    </Row>
                                </Col>
                                <Col xs='12' md='6' lg='12' className='pt-4'>
                                    <Row className='text-lg-left text-center'>
                                        <h3 className='col-12'>Recent Friends</h3>
                                        {!recentFriends ? (
                                            <Col xs='12'>
                                                <p>You don't have any friends in your list, check out the <Link to='/pokemon-trainers'>PokéTrainers</Link> to add fellow Pokémon Trainers.</p>
                                            </Col>) :
                                            (recentFriends.map((item, key) =>
                                                <Col key={key} className='text-center' xs='6'>
                                                    <Link onClick={() => getUserAndPokemonForProfileIQ(item.username)} className='containerLink' to={{
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
                            </Row>
                        </Col>
                    </Row>)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        profileContent: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user)),
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
    }
}

export default compose(
    firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc'], limit: 8 }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(UserHome)