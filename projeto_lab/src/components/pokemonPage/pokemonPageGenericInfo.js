import React from 'react'
import { Row, Col } from 'reactstrap';

const pokemonPageGenericInfo = (props) => {
    var string = require('lodash/string')
    let { types, weight, height, abilities } = props.info[0];
    const { egg_groups } = props.info[1];

    var newWeight = `${weight}`.slice(0, -1);
    var newHeight = `${height}`.slice(0, -1);

    return (
        <Col xs='12' className='pb-4'>
            <Row className='d-flex justify-content-center align-items-center text-center'>
                <h3 className='col-12 text-center'>General Info</h3>
                <Col xs='6' md='6' lg='3'>
                    <h4>Type(s)</h4>
                    {types.map((typeItem, key) =>
                        <Col xs='12' key={key}>
                            <Col xs='12' className={`text-center typeIcon type-${typeItem.type.name}`} key={key}>
                                {typeItem.type.name}
                            </Col>
                        </Col>
                    )}
                </Col>
                <Col xs='6' md='6' lg='3'>
                    <h4>Abilities</h4>
                    {abilities.map((abilityItem, key) =>
                        <p key={key}>
                            {string.startCase(abilityItem.ability.name)}
                        </p>
                    )}
                </Col>
                <Col xs='6' md='6' lg='3'>
                    <h4>Egg Groups</h4>
                    {egg_groups.map((eggItem, key) =>
                        <p key={key}>{string.startCase(eggItem.name)}</p>
                    )}
                </Col>
                <Col xs='6' md='6' lg='3'>
                    <h4>Others</h4>
                    <p>Weight: {newWeight}kg</p>
                    <p>Height: {newHeight}m</p>
                </Col>
            </Row>
        </Col>
    )
}

export default pokemonPageGenericInfo;
