import React, { Component } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPokemonForProfileIQ } from '../store/actions/apiActions'

class PokemonTrainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: false,
            allUsers: [],
            users: [],
            auth: [],
            profileContent: []
        }
    }

    handleSearchChange = (event) => {
        const { value } = event.target;
        if (value !== "") {
            var trainer = value;
            var trainerSearched = [];
            for (let user of this.state.allUsers) {
                if (user.username.startsWith(trainer) || user.username.includes(trainer)) {
                    trainerSearched.push(user)
                }
            }
            this.setState({ users: trainerSearched});
        } else {
            const { allUsers } = this.state
            this.setState({ users: allUsers });
        }
    }

    render() {

        if(this.state.ready === false) {
            const { auth, users, profileContent } = this.props
            var array = require('lodash/array')
            array.remove(users, (item) => {
                return item.username === profileContent.username;
            });
            this.setState({allUsers: users, users: users, ready: true, profileContent: profileContent, auth: auth})
        }   
        
        if ((!this.state.auth.uid) && (this.state.ready === true)) {
            return <Redirect to='/sign-in' />
        } else {
            console.log(this.state.users)
            return (
                <>
                    <h1>PokéTrainers</h1>
                    <Col className='col-12 col-md-6 col-lg-3 px-2 py-2 py-md-0'>
                        <FormGroup className='m-0'>
                            <Input type="text" placeholder='search pokémon trainer' onChange={this.handleSearchChange} />
                        </FormGroup>
                    </Col>
                    <Col xs='12' className='p-0'>
                        {this.state.users.map((item, key) =>
                            <Col xs='12' key={key}>
                                <Link onClick={() => getPokemonForProfileIQ(item.triviaRecord.correctAnswer, item.triviaRecord.wrongAnswers)} to={{
                                    pathname: `/pokemon-trainers/profile/${item.username}`,
                                    state: {
                                        user: item
                                    }
                                }}>
                                    <Row className='text-center d-flex align-items-md-center'>
                                        <Col xs='12' md='3' className='d-flex justify-content-center'>
                                            <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} /></Col>
                                        <Col xs='12' md='4' className='py-2 py-md-0'>
                                            {item.username}
                                        </Col>
                                        <Col xs='6' md='2' className='py-2 py-md-0'>{item.gender}</Col>
                                        <Col xs='6' md='2' className='py-2 py-md-0'>{item.nationality}</Col>

                                    </Row>
                                </Link>
                                <hr className='my-3' />
                            </Col>
                        )}
                    </Col>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profileContent: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonForProfileIQ: (pokemon) => dispatch(getPokemonForProfileIQ(pokemon))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonTrainers));