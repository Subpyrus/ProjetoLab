import React from 'react';
import SearchPokemon from '../components/SearchPokemon';
import PrintPokemonSearch from '../components/PrintPokemonSearch';
import { Container, Row, Col } from 'reactstrap';

const PokemonSearch = (props) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="6">
                    <h1 className='col-12'>PokéSearch</h1>
                    <p className='col-12'>
                        In this page you're supposed to search some pokémon
                            </p>
                    <SearchPokemon className='col-12' inputEnter={props.functionEnter} inputClick={props.functionClick} inputChange={props.functionChange} />
                    {props.pokemonList.length > 0 &&
                        <Col xs="12">
                            <PrintPokemonSearch pokemonList={props.pokemonList} />
                        </Col>
                    }
                </Col>

            </Row>
        </Container>
    )
}

export default PokemonSearch;