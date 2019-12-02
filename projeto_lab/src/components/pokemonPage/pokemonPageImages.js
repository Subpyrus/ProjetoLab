import React from 'react';
import { Row, Col } from 'reactstrap';

const pokemonPageImages = (props) => {
  var { name } = props;
  name = name.toLowerCase();

  return (
    <Col xs='12' className='py-4 py-lg-5'>
      <Row className='justify-content-center text-center'>
        <Col xs='6' lg='3' className='py-3'>
          <img alt={name} src={`http://www.pokestadium.com/sprites/xy/${name}.gif`} />
        </Col>
        <Col xs='6' lg='3' className='py-3'>
          <img alt={name} src={`http://www.pokestadium.com/sprites/xy/back/${name}.gif`} />
        </Col>
        <Col xs='6' lg='3' className='py-3'>
          <img alt={name} src={`http://www.pokestadium.com/sprites/xy/shiny/${name}.gif`} />
        </Col>
        <Col xs='6' lg='3' className='py-3'>
          <img alt={name} src={`http://www.pokestadium.com/sprites/xy/shiny/back/${name}.gif`} />
        </Col>
      </Row>
    </Col>
  );
}

export default pokemonPageImages;
