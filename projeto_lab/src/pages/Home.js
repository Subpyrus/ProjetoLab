import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import Loading from '../components/layout/Loading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Home = (props) => {

    var array = require('lodash/array')
    let { auth, notifications, profileContent } = props
    var recentFriends = array.takeRight(profileContent.friends, 5);

    notifications = array.takeRight(notifications, 5)
    console.log(array.takeRight(notifications, 5))

    if (!auth.uid) {
        return (
            <Col xs='12'>
                <h1>Home</h1>
                <Row>
                    <p className='col-6'>PokémonFavo is a cool website</p>
                    <div className='col-6'>PokémonFavo is a cool website</div>
                    <p>Features</p>
                    <div>Build your own list of favorite Pokémons up to 25 entries!</div>
                    <div>Build your own ultimate Pokémon team!</div>
                    <div>Play our Pokémon Quizz and find out if you're intelligent like a Slowpoke or a Alakazam!</div>
                    <div>Check others PokémonFavo users profiles and add them as friends!</div>
                </Row>
            </Col>
        )
    } else {
        return (
            <Col xs='12'>
                <h1>Home</h1>
                {notifications ? (
                    <Row>
                        <Col xs='12' md='7' className='p-0'>
                            <h3 className='col-12 col-md-8'>All Users Activity</h3>
                            <Col xs='12' md='8'>
                                {notifications.map((item, key) => {
                                    if (item.user !== profileContent.username) {
                                        return (
                                            <div key={key}>
                                                <p>{item.content}</p>
                                                <p>{item.user}</p>
                                                <p>{moment(item.time.toDate()).fromNow()}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </Col>
                        </Col>
                        <Col xs='12' md='5' className='p-0'>
                            <h3 className='col-12'>Your Recent Activity</h3>
                            <Col xs='12'>
                                {notifications.map((item, key) => {
                                    if (item.user === profileContent.username) {
                                        return (
                                            <div key={key}>
                                                <p>{item.content}</p>
                                                <p>{item.user}</p>
                                                <p>{moment(item.time.toDate()).fromNow()}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </Col>
                            <h3 className='col-12'>Recent Friends</h3>
                            <Col xs='12'>
                                {!recentFriends ? (
                                    <p>You don't have any friends in your list, check out the <Link to='/pokemon-trainers'>PokéTrainers</Link> to add fellow Pokémon Trainers.</p>) :
                                    (recentFriends.map((item, key) =>
                                        <Link key={key} to={`pokemon-trainers/profile/${item.name}`}>
                                            <p>{item.name}</p>
                                            <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} />
                                        </Link>
                                    ))}
                            </Col>
                        </Col>
                    </Row>) : (<Loading height='68vh' />)
                }
            </Col >
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

export default compose(
    firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc'] }
    ]),
    connect(mapStateToProps)
)(Home)