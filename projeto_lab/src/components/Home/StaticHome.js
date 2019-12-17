import React from 'react';
import { Row, Col } from 'reactstrap';

const StaticHome = () => {
    return (
        <Row className='justify-content-between'>
            <h1 className='col-12'>Home</h1>
            <Col xs='12' md='8' lg='7'>
                <p>Hello there fellow pokémon enthusiastic, welcome to PokéFavo! A spot to share your favorite Pokémons and your predilect Pokémon Team and also see other users favorites. If you want to know more things about what we have in this website check out the information bellow, of course if you sign up you'll be able to enjoy all the features! Dont't forget to catch them all!</p>
                <p><span style={{color: '#ffe066'}} className='font-weight-bold'>PokéList</span> - Find all of your favorite pokémon, be it by a specific pokédex or with a certain type.</p>
                <p><span style={{color: '#f24643'}} className='font-weight-bold'>PokéPage</span> - Content of a specific pokémon, their moves, evolution chain, abilities, types, videos etc.</p>
                <p><span style={{color: '#1688b9'}} className='font-weight-bold'>PokéTrivia</span> - A cool little trivia game to test your pokémon knowledge and determine what kind pokémon you would be based in your performance on the trivia.</p>
                <p><span style={{color: '#fa883c'}} className='font-weight-bold'>PokéTrainers </span>- all the pokémon trainers that signed up PokéFavo where you can access their individual profile to check their favorite pokémons, favorite pokémon team etc..</p>
            </Col>
            <Col className='text-center d-flex align-items-center' xs='12' md='4' lg='5'>
                <img className='img-fluid py-2 py-md-0' src='https://i.pinimg.com/originals/0a/08/af/0a08af39768d638d2e4815a3eb955dff.png' alt='PokemonFavoriteTogether' />
            </Col>
        </Row>
    )
}

export default StaticHome
