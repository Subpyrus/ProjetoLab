import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class PokemonTrainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    render() {
        const { auth, users } = this.props
        console.log(users)

        if (!auth.uid) {
            return <Redirect to='/sign-in' />
        } else if (!users) {
            return (
                <>
                    <p>Loading...</p>
                </>
            )
        } else {
            return (
                <>
                    <h1>PokéTrainers</h1>
                    <Col xs='12' className='p-0'>
                        <ListGroup>
                            {users.map((item, key) =>
                                <ListGroupItem key={key}>
                                    <Link to={`/pokemon-trainers/profile/${item.username}`}>{item.username}</Link>
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
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'users' }])
)(PokemonTrainers)