import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import Loading from '../components/layout/Loading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getUserAndPokemonForProfileIQ } from '../store/actions/apiActions'

const Home = (props) => {
    var array = require('lodash/array')
    let { auth, notifications, profileContent, getUserAndPokemonForProfileIQ } = props
    var recentFriends = array.takeRight(profileContent.friends, 6);

    if (!auth.uid) {
        return (
            <Row className='justify-content-between'>
                <h1 className='col-12'>Home</h1>
                <Col xs='12' md='8' lg='7'>
                    <p>Hello there fellow pokémon enthusiastic, welcome to PokéFavo! A spot to share your favorite Pokémons and your predilect Pokémon Team and also see other users favorites. If you want to know more things about what we have in this website check out the information bellow, of course if you sign up you'll be able to enjoy all the features! Dont't forget to catch them all!</p>
                    <p><span className='font-weight-bold'>PokéList</span> - Find all of your favorite pokémon, be it by a specific pokédex or with a certain type.</p>
                    <p><span className='font-weight-bold'>PokéPage</span> - Content of a specific pokémon, their moves, evolution chain, abilities, types, videos etc.</p>
                    <p><span className='font-weight-bold'>PokéTrivia</span> - A cool little trivia game to test your pokémon knowledge and determine what kind pokémon you would be based in your performance on the trivia.</p>
                    <p><span className='font-weight-bold'>PokéTrainers </span>- all the pokémon trainers that signed up PokéFavo where you can access their individual profile to check their favorite pokémons, favorite pokémon team etc..</p>
                </Col>
                <Col className='text-center d-flex align-items-center' xs='12' md='4' lg='5'>
                    <img className='img-fluid py-2 py-md-0' src='https://i.pinimg.com/originals/0a/08/af/0a08af39768d638d2e4815a3eb955dff.png' alt='PokemonFavoriteTogether' />
                </Col>
            </Row>
        )
    } else {
        return (
            <>
                <h1>Home</h1>
                {notifications ? (
                    <Row>
                        <Col xs='12' md='8' className='px-0 pb-5'>
                            <h3 className='col-12'>All Users Activity</h3>
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
                                                {item.content}
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
                        <Col xs='12' md='4'>
                            <Row>
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
                    </Row>) : (<Loading height='68vh' />)
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
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user))
    }
}

export default compose(
    firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc'], limit: 5 }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(Home)