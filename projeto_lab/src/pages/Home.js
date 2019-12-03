import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';

const Home = (props) => {

    const { notifications, isLoggedIn } = props

    console.log(props.notifications)
    console.log(isLoggedIn);

    return (
        <Col xs='12'>
            <h1>Home</h1>
            {isLoggedIn ? (
                <Row>
                    <Col xs='12' md='7' className='p-0'>
                        <h3 className='col-12 col-md-8'>All Users Activity</h3>
                        <Col xs='12' md='8'>
                            {notifications.map((item, key) =>
                                <div key={key}>
                                    <p>{item.content}</p>
                                    <p>{item.user}</p>
                                    <p>{moment(item.time.toDate()).fromNow()}</p>
                                </div>
                            )}
                        </Col>
                    </Col>
                    <Col xs='12' md='5' className='p-0'>
                        <h3 className='col-12'>Your Recent Activity</h3>
                        <Col xs='12'>

                        </Col>
                        <h3 className='col-12'>Friends</h3>
                        <Col xs='12'>

                        </Col>
                    </Col>
                </Row>
            ) : (
                    <Row>
                        <p className='col-6'>PokémonFavo is a cool website</p>
                        <div className='col-6'>PokémonFavo is a cool website</div>
                        <p>Features</p>
                        <div>Build your own list of favorite Pokémons up to 25 entries!</div>
                        <div>Build your own ultimate Pokémon team!</div>
                        <div>Play our Pokémon Quizz and find out if you're intelligent like a Slowpoke or a Alakazam!</div>
                        <div>Check others PokémonFavo users profiles and add them as friends!</div>
                    </Row>)}
        </Col >
    )
}

export default Home