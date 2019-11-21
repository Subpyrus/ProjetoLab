import React from 'react';
import { Row, Col } from 'reactstrap';

const pokemonPageImages = (props) => {
  const { name } = props

  return (
    <Col xs='12' className='pb-5'>
      <Row className='justify-content-center text-center'>
        <Col xs='12' md='6' lg='3'>
          <img alt={5} src={`http://www.pokestadium.com/sprites/xy/${name.toLowerCase()}.gif`} />
        </Col>
        <Col xs='12' md='6' lg='3'>
          <img alt={5} src={`http://www.pokestadium.com/sprites/xy/back/${name.toLowerCase()}.gif`} />
        </Col>
        <Col xs='12' md='6' lg='3'>
          <img alt={5} src={`http://www.pokestadium.com/sprites/xy/shiny/${name.toLowerCase()}.gif`} />
        </Col>
        <Col xs='12' md='6' lg='3'>
          <img alt={5} src={`http://www.pokestadium.com/sprites/xy/shiny/back/${name.toLowerCase()}.gif`} />
        </Col>
      </Row>
    </Col>
  );
}

export default pokemonPageImages;
