import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../components/layout/Loading';

class PokemonTrainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    render() {
        const { auth, users, username } = this.props
        var array = require('lodash/array')
        array.remove(users, (item) => {
            return item.username === username;
        });

        if (!auth.uid) {
            return <Redirect to='/sign-in' />
        } else {
            return !users ? (<Loading />) : (
                <>
                    <h1>PokéTrainers</h1>
                    <Col xs='12' className='p-0'>
                        <ListGroup>
                            {users.map((item, key) =>
                                <ListGroupItem key={key}>
                                    <Link to={{
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


export default PokemonTrainers;