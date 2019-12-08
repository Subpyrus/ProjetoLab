import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPokemonForProfileIQ } from '../store/actions/apiActions'

class PokemonTrainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    render() {
        const { auth, users, profileContent } = this.props
        var array = require('lodash/array')
        array.remove(users, (item) => {
            return item.username === profileContent.username;
        });

        if (!auth.uid) {
            return <Redirect to='/sign-in' />
        } else {
            return (
                <>
                    <h1>PokéTrainers</h1>
                    <Col xs='12' className='p-0'>
                        <ListGroup>
                            {users.map((item, key) =>
                                <ListGroupItem key={key}>
                                    <Link onClick={() => getPokemonForProfileIQ(item.triviaRecord.correctAnswer, item.triviaRecord.wrongAnswers)} to={{
                                        pathname: `/pokemon-trainers/profile/${item.username}`,
                                        state: {
                                            user: item
                                        }
                                    }}>
                                        {item.username}
                                    </Link>
                                </ListGroupItem>
                            )}
                        </ListGroup>
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