import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';

const PrintPokemonSearch = (props) => {
    console.log(props)
    const { id } = props.pokemonList[0][0]
    let pokemon = require('pokemon');
    let pokemonName = pokemon.getName(id)
    
    return (
        <div style={{ marginTop: '3rem', marginBottom: '3rem' }} >
            <ListGroup>
                {props.pokemonList.map((item, key) =>
                    <Link className='basicLink' key={key} to={{
                        pathname: `/pokemon-search/pokemon-page/${item[0].name}`
                    }}>
                        <ListGroupItem>
                            <Row>
                                <div className='col-12 col-md-4'>
                                    <img alt={item.name} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                </div>
                                <h3 className='col-12 col-md-8'>{pokemonName}</h3>
                            </Row>
                        </ListGroupItem>
                    </Link>
                )}
            </ListGroup>
        </div>
    );

}

export default PrintPokemonSearch;