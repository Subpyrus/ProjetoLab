import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import Loading from '../components/layout/Loading';
import PokemonPageImages from '../components/pokemonPage/pokemonPageImages';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux'
import Slider from "react-slick";
import YouTube from 'react-youtube';

const PokePage = (props) => {
    if (props.pokemonInfo.length === 0 /*|| props.pokemonVideos.items === undefined*/) {
        props.getPokemon(props.match.params.pokemon.toLocaleLowerCase());
        /*props.getPokemonVideo(props.match.params.pokemon);*/
        return (
            <Loading></Loading>
        )
    } else {
        let { name, id, sprites, types, weight, height, stats, abilities, baseExperience } = props.pokemonInfo[0];
        const Gif = require('pokemon-gif');
        let pokemon = require('pokemon');
        let currentPokemonName = pokemon.getName(props.pokemonInfo[0].id)
        let pokemonIds = [];
        var pokemonNextName,
            pokemonPreviousName;

        if (id === 1) {
            pokemonIds.push(id += 1)
            pokemonNextName = pokemon.getName(`${pokemonIds[0]}`)
        } else if (id === 808) {
            pokemonIds.push(id -= 1)
            pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
        } else {
            pokemonIds.push(id -= 1)
            pokemonIds.push(id += 2)
            pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
            pokemonNextName = pokemon.getName(`${pokemonIds[1]}`)
        }

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        const opts = {
            height: '390',
            width: '640',
        };

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs='12'>
                        <Row>
                            <Col className='col-12 col-md-6 col-lg-8 pb-5'>
                                <h1 className='d-inline mr-md-3'>
                                    {pokemon.getName(props.pokemonInfo[0].id)}

                                </h1>
                                {types.map((typeItem, key) =>
                                    <div className={`typeIcon type-${typeItem.type.name}`} key={key}>
                                        {typeItem.type.name}
                                    </div>
                                )}
                            </Col>
                            <Col className='text-right' xs='12' md='3' lg='2'>
                                <Button value={pokemon.getName(props.pokemonInfo[0].id)}>Add to Favorites</Button>
                            </Col>
                            <Col className='text-right' xs='12' md='3' lg='2'>
                                <Button>Add to Team</Button>
                            </Col>

                        </Row>
                    </Col>
                    <PokemonPageImages name={currentPokemonName} />
                    <Col xs='12'>
                        <Row>
                            <h3 className='col-12 text-center'>Info</h3>
                        </Row>
                    </Col>
                    <Col xs='12'>
                        <Row>
                            <h3 className='col-12 text-center'>Stats</h3>
                            <Table borderless className='text-center'>
                                <thead>
                                    <tr>
                                        {stats.map((statsItem, key) =>
                                            <th key={key}>{statsItem.stat.name}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        {stats.map((statsItem, key) =>
                                            <td key={key}>{statsItem.base_stat}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col xs='12'>
                        <Row>
                            <h3 className='col-12 text-center'>Evolutions</h3>
                        </Row>
                    </Col>
                    <Col xs='12'>
                        <Row>
                            <h3 className='col-12 text-center'>Moves</h3>
                        </Row>
                    </Col>

                    <Col xs='12'>

                        {abilities.map((abilityItem, key) =>
                            <p key={key}>
                                {abilityItem.ability.name}
                            </p>
                        )}
                        <p>Weight: {weight}kg</p>
                        <p>Height: {height}m</p>

                    </Col>
                    <Col xs="12">
                        {/*<Slider {...settings}>
                            {props.pokemonVideos.items.map((videoItem, key) =>
                                <div key={key}>
                                    <YouTube
                                        videoId={videoItem.id.videoId}
                                        opts={opts}
                                    />
                                </div>
                            )}
                            </Slider>*/}
                    </Col>
                    <Col xs="12">
                        <Row className="justify-content-between">
                            <Col xs="6" className='text-left'>
                                {props.pokemonInfo[0].id <= 808 && props.pokemonInfo[0].id !== 1 &&
                                    <div>
                                        <img className='img-fluid' alt={pokemonPreviousName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[0]}.png`} />
                                        <Link className='basicLink' id={pokemonPreviousName.toLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonPreviousName}`} onClick={(event) => {
                                            props.getPokemon(event.currentTarget.id);
                                            props.getPokemonVideo(event.currentTarget.id);
                                        }}>
                                            <h5>{pokemonPreviousName}</h5>
                                        </Link>
                                    </div>
                                }
                            </Col>
                            <Col xs="6" className='text-right'>
                                {props.pokemonInfo[0].id >= 1 && props.pokemonInfo[0].id !== 808 &&
                                    <div>
                                        {props.pokemonInfo[0].id === 1 ?
                                            <img className='img-fluid' alt={pokemonNextName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[0]}.png`} /> : <img className='img-fluid' alt={pokemonNextName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[1]}.png`} />}
                                        <Link id={pokemonNextName.toLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonNextName.toLowerCase()}`} onClick={(event) => {
                                            props.getPokemon(event.currentTarget.id);
                                            props.getPokemonVideo(event.currentTarget.id);
                                        }}>
                                            <h5>{pokemonNextName}</h5>
                                        </Link>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container >
        )
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (favorite) => dispatch(createFavorite(favorite))
    }
}*/

export default PokePage;

