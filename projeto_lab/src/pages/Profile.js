import React from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = (props) => {
    const { profileUsername, profileTeam, profileFavorites, profileQuizzRecord } = props

    return (
        <Row>
            <Col xs='12'>
                <h3>{profileUsername}</h3>
            </Col>
            <Col xs='12' md='6'></Col>
            <Col xs='12' md='6'></Col>
            <Col xs='12' md='6'></Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        profileUsername: state.firebase.profile.username,
        profileTeam: state.firebase.favoriteTeam,
        profileFavorites: state.firebase.favoritePokemons,
        profileQuizzRecord: state.firebase.quizzRecord
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);