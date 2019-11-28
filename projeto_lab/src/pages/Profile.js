import React from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = (props) => {
    console.log(props);
    const { profileUsername, state, profileTeam, profileFavorites, profileQuizzRecord } = props

    console.log(state)

    return (
        <Row>
            <Col xs='12'>
                <h1>{profileUsername}</h1>

            </Col>
            {/*<Col className='position-static position-md-fixed' xs='12' md='4'>
                <img />
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
                <h3>Favorite Team</h3>
                {profileTeam.map((item, key) =>
                    <Col key={key}>

                    </Col>
                )}
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
            </Col>*/}
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.firebase,
        profileUsername: state.firebase.profile.username,
        profileFavorites: state.firebase.favoritePokemons,
        profileTeam: state.firebase.favoriteTeam,
        profileQuizzRecord: state.firebase.quizzRecord,
        profileAvatar: ''
    }
}

export default connect(mapStateToProps)(Profile);