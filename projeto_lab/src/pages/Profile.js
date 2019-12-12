import React, { Component } from 'react'
import { personalityFavorites, personalityTeams } from '../components/profile/personalityContent';
import { Redirect } from 'react-router-dom';
import OwnProfile from '../components/profile/ownProfile';
import OthersProfile from '../components/profile/othersProfile';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
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
        if (!array[0]) {
            return [];
        } else {
            let arrayStats = this.getStats(array[0].stats);
            this.getStatsValues(array, array[0].stats, arrayStats[0]);
            arrayStats[0].sort((a, b) => a.value[0] - b.value[0]);
            return this.compareStats(arrayStats[0], type);
        }
    }

    render() {
        const { isLoggedIn, location, profileContent, pokemonIQ } = this.props;

        console.log(this.props)

        if (!isLoggedIn) {
            return <Redirect to='/sign-in' />
        } else if (!location.state) {
            let { favoritePokemons, favoriteTeam } = this.props.profileContent
            return (
                <OwnProfile
                    ownProfileContent={profileContent}
                    favoritesResults={this.getStatsMessages(favoritePokemons, 'favorites')}
                    teamResults={this.getStatsMessages(favoriteTeam, 'team')}
                />)
        } else {
            let { favoritePokemons, favoriteTeam } = this.props.location.state.user
            return (
                <OthersProfile
                    othersProfileContent={location.state.user}
                    loggedUserFriends={this.props.profileContent.friends}
                    favoritesResults={this.getStatsMessages(favoritePokemons, 'favorites')}
                    teamResults={this.getStatsMessages(favoriteTeam, 'team')}
                />)
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.firestore.ordered.users,
        pokemonIQ: state.apiCalls.apiData.getPokemonIQ
    }
}

export default compose(
    firestoreConnect(props => [
        { collection: 'users', where: [['username', '==', props.match.params.username]] }
    ]),
    connect(mapStateToProps)
)(Profile)
