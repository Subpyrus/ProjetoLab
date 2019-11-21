import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                            console.log(pokedexItem)
                            const pokemon = require('pokemon');
                            let id = `${pokedexItem.entry_number}`;
                            if (id.length !== 3) {
                                if (id.length === 2) {
                                    id = `0${id}`;
                                } else {
                                    id = `00${id}`;
                                }
                            }
                            var pokemonName = pokemon.getName(id);
                            return (
                                <Link key={key} to={`/pokemon-list/${props.match.params.generation}/pokemon-page/${pokemonName.toLocaleLowerCase()}`} onClick={(event) => {
                                    props.getPokemon(event.currentTarget.id);
                                    props.getPokemonVideo(event.currentTarget.id);
                                }}>
                                    <Col key={key} xs='12' md='3' lg='2'>
                                        {id}
                                        {pokemonName}
                                        <img alt={pokemonName} src={`https://serebii.net/sunmoon/pokemon/${id}.png`} />
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