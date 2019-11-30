import React from 'react'
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

const Profile = (props) => {
    console.log(props);
    const { profileUsername, profileTeam, profileFavorites, profileQuizzRecord } = props

    return (
        <Row>
            <Col xs='12'>
                <h1>{profileUsername}</h1>

            </Col>
            <Col xs='12'>
                <img />
                <p>Gender: Male</p>
                <p>Favorite City:</p>
                <p>Favorite Gen:</p>
            </Col>
            <Col xs='12' md='6'>
                <h3>Favorite Pokémons</h3>
                {profileFavorites.length === 0 ? (
                    <Col xs='12'>
                        <p>You don't have any favorite pokémons yet! Search for your favorites in the PokéList!</p>
                    </Col>
                ) : (
                        <>
                            {profileFavorites.map((item, key) =>
                                <Col key={key}>
                                    <img />
                                </Col>)
                            }
                        </>
                    )
                }
            </Col>
            <Col xs='12' md='6'>
                <h3>Favorite Pokémon Team</h3>
                {profileTeam.length === 0 ? (
                    <Col xs='12'>
                        <p>You don't have any favorite pokémons yet! Search for your favorites in the PokéList!</p>
                    </Col>
                ) : (
                        <>
                            {profileTeam.map((item, key) =>
                                <Col key={key}>
                                    <img />
                                </Col>)
                            }
                        </>
                    )
                }
            </Col>
            <Col xs='12' md='6'>
                <h3>Inner IQ Pokémon</h3>
                {profileQuizzRecord.length === 0 ? (
                    <Col xs='12'>
                        <p>You haven't tried to play a PokéQuizz yet! If you do it he'll be able to calculate your pokémon intelligence! </p>
                    </Col>
                ) : (
                        <>
                            {profileQuizzRecord.map((item, key) =>
                                <Col key={key}>

                                </Col>
                            )}
                        </>
                    )
                }
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        profileUsername: state.firebase.profile.username,
        profileFavorites: state.firebase.profile.favoritePokemons,
        profileTeam: state.firebase.profile.favoriteTeam,
        profileQuizzRecord: state.firebase.profile.quizzRecord,
        profileAvatar: ''
    }
}

export default connect(mapStateToProps)(Profile);