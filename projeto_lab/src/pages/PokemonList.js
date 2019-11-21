import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const PokemonList = (props) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="12">
                    <Row className="justify-content-center">
                    </Row>
                </Col>
                <Col xs="12">
                    <Row>
                        {props.pokedexInfo.map((pokedexItem, key) => {
                            const pokemon = require('pokemon');
                            let id = `${pokedexItem.entry_number}`;
                            var pokemonName = pokemon.getName(id);
                            return (
                                <Link key={key} to={`/pokemon-list/${props.match.params.generation}/pokemon-page/${pokemonName.toLocaleLowerCase()}`} onClick={(event) => {
                                    props.getPokemon(event.currentTarget.id);
                                    props.getPokemonVideo(event.currentTarget.id);
                                }}>
                                    <Col key={key} xs='12' md='3' lg='2'>
                                        {id}
                                        {pokemonName}
                                        <LazyLoad height={200} once={`true`} >
                                            <img alt={pokemonName} src={`https://serebii.net/sunmoon/pokemon/${id}.png`} />
                                        </LazyLoad>
                                    </Col>
                                </Link>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default PokemonList;