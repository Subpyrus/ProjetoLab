import React from 'react'
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';

const Profile = (props) => {
    console.log(props);
    const { username, avatar, gender, favoritePokemons, favoriteTeam, quizzRecord, email } = props.profileContent

    if (!favoritePokemons) {
        if (favoritePokemons.length !== 0) {
            var saveStats = []

            const getStats = (array) => {
                var returnArray = []
                for (let item of array) {
                    returnArray.push({ name: item.stat.name, value: [] })
                    saveStats.push(new Array())
                }
                return returnArray;
            }

            const getStatsValues = (firstArray, secondArray) => {
                for (let firstItem in firstArray) {
                    for (let [index, secondItem] of secondArray.entries()) {
                        stats[index].value.push(secondItem.base_stat)
                        let sum = stats[index].value.reduce((a, b) => a + b, 0);
                        stats[index].value = [sum];
                    }
                }
            }

            const compareStats = (array, personality) => {
                let lastIndex = array.length - 1;
                let favPokemonPersonalityResults = [
                    ''
                ];
                let teamPokemonPersonalityResults = [
                    'You prefer bulkier pokémons and stall strategies to prevail over your oponents in battle /hp',
                    'Having a lot of hit points and simultaneously possessing a solid defense is a style you opt for. With it you are able to have a lot of physical walls who can resist strong attacks /hp/defense',
                    'A good attack is a good defense, so they said, and that is what you choose to do. You aim to destroy the hit points of the enemy pokémon as quick as possible with a strong physical attack /attack'
                ];
                switch (array[lastIndex].name) {
                    case 'hp':
                        if (array[lastIndex - 1].name === 'defense') {
                            return ''
                        } else {
                            return ''
                        }
                    case 'attack':
                        if (array[lastIndex - 1].name === 'special-attack') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'special-attack') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'speed') {
                            return ''
                        } else {
                            return ''
                        }
                    case 'defense':
                        if (array[lastIndex - 1].name === 'special-defense') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'hp') {
                            return ''
                        } else {
                            return ''
                        }
                    case 'special-attack':
                        if (array[lastIndex - 1].name === 'special-defense') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'attack') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'special-attack') {
                            return ''
                        }
                    case 'special-defense':
                        if (array[lastIndex - 1].name === 'defense') {
                            return ''
                        } else {
                            return ''
                        }
                    case 'speed':
                        if (array[lastIndex - 1].name === 'attack') {
                            return ''
                        } else if (array[lastIndex - 1].name === 'special-attack') {
                            return ''
                        } else {
                            return ''
                        }
                }
            }

            let stats = getStats(favoritePokemons[0].stats);
            getStatsValues(favoritePokemons, favoritePokemons[0].stats);
            stats.sort((a, b) => a.value[0] - b.value[0]);
        }
    }

    return (
        <Row>
            <Col xs='12' md='6' className='text-center text-md-left'>
                <h1>{username}</h1>
            </Col>
            <Col xs='6' className='text-center p-2 p-md-0 text-md-right'>
                <Button color='warning'>Edit Profile</Button>
            </Col>
            <Col xs='12' md='6' lg='2'>
                <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                <p>Gender: {gender}</p>
                <p>Favorite Generation:</p>
                <p>Favorite Game:</p>
                <p>Favorite City:</p>
                <p>Favorite Pokéball:</p>
            </Col>
            <Col xs='12' md='6' lg='5'>
                <h3>Inner IQ Pokémon</h3>
                {quizzRecord.length === 0 ? (
                    <Col xs='12'>
                        <p>You haven't tried to play a PokéQuizz yet! If you do it he'll be able to calculate your pokémon intelligence! </p>
                    </Col>
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
                    <Col xs='12'>
                        <p>You don't have any favorite pokémons yet! Search for your favorites in the PokéList!</p>
                    </Col>
                ) : (
                        <>
                            {favoritePokemons.map((item, key) =>
                                <Col key={key}>
                                    <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                </Col>)
                            }
                        </>
                    )
                }
            </Col>
            <Col xs='12' md='6'>
                <h3>Favorite Pokémon Team</h3>
                {favoriteTeam.length === 0 ? (
                    <Col xs='12'>
                        <p>You don't have any favorite pokémons yet! Search for your favorites in the PokéList!</p>
                    </Col>
                ) : (
                        <>
                            {favoriteTeam.map((item, key) =>
                                <Col key={key}>
                                    <img alt={item} src={`http://www.pokestadium.com/sprites/xy/${item.name.toLowerCase()}.gif`} />
                                </Col>)
                            }
                        </>
                    )
                }
            </Col>
        </Row>
    )

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile.isLoaded,
        profileContent: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Profile);