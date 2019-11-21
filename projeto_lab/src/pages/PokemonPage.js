import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Loading from '../components/Loading';
import Slider from "react-slick";
import YouTube from 'react-youtube';

const PokePage = (props) => {
    if (props.pokemonInfo.length === 0 || props.pokemonVideos.items === undefined) {
        props.getPokemon(props.match.params.pokemon.toLocaleLowerCase());
        props.getPokemonVideo(props.match.params.pokemon);
        return (
            <Loading></Loading>
        )
    } else {
        let { name, id, sprites, types, weight, height, stats, abilities, baseExperience } = props.pokemonInfo[0];
        const Gif = require('pokemon-gif');
        let pokemon = require('pokemon');
        let pokemonIds = [];
        var pokemonNextName,
            pokemonPreviousName;

        if (id >= 1) {
            pokemonIds.push(id += 1)
            pokemonNextName = pokemon.getName(`${pokemonIds[0]}`)
        } else if (id <= 808) {
            pokemonIds.push(id -= 1)
            pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
        } else {
            pokemonIds.push(id -= 1)
            pokemonIds.push(id += 2)
            pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
            pokemonNextName = pokemon.getName(`${pokemonIds[1]}`)
        }

        console.log(props.pokemonInfo[0].id)
        console.log(id)
        console.log(pokemonNextName, pokemonPreviousName);

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
                    <Col xs="12">
                        <p>{name}</p>
                        {types.map((typeItem, key) =>
                            <p key={key}>
                                {typeItem.type.name}
                            </p>
                        )}
                        {abilities.map((abilityItem, key) =>
                            <p key={key}>
                                {abilityItem.ability.name}
                            </p>
                        )}
                        <p>Weight: {weight}</p>
                        <p>Height: {height}</p>
                        {stats.map((statsItem, key) =>
                            <div key={key}>
                                <p>{statsItem.stat.name}</p>
                                <p>Base Stat: {statsItem.base_stat}</p>
                                <p>Effort: {statsItem.effort}</p>
                            </div>
                        )}
                    </Col>
                    <Col xs="12">
                        <p></p>
                    </Col>
                    <Col xs="12">
                        <img alt={1} src={sprites.back_default} />
                        <img alt={2} src={sprites.front_default} />
                        <img alt={3} src={sprites.back_shiny} />
                        <img alt={4} src={sprites.front_shiny} />
                        <img alt={5} src={Gif(`${name}`)} />
                    </Col>
                    <Col xs="12">
                        <Slider {...settings}>
                            {props.pokemonVideos.items.map((videoItem, key) =>
                                <div key={key}>
                                    <YouTube
                                        videoId={videoItem.id.videoId}
                                        opts={opts}
                                    />
                                </div>
                            )}
                        </Slider>
                    </Col>
                    <Col xs="12">
                        <Row className="justify-content-between">
                            <Col xs="6" className='text-left'>
                                {props.pokemonInfo[0].id <= 808 && props.pokemonInfo[0].id !== 1 &&
                                    <Link id={pokemonPreviousName.toLocaleLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonPreviousName}`} onClick={(event) => {
                                        props.getPokemon(event.currentTarget.id);
                                        props.getPokemonVideo(event.currentTarget.id);
                                    }}>
                                        <img className='img-fluid' alt={pokemonPreviousName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[0]}.png`} />
                                        <h5>{pokemonPreviousName}</h5>
                                    </Link>
                                }
                            </Col>
                            <Col xs="6" className='text-right'>
                                {props.pokemonInfo[0].id >= 1 && props.pokemonInfo[0].id !== 808 &&
                                    <Link id={pokemonNextName.toLocaleLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonNextName.toLowerCase()}`} onClick={(event) => {
                                        props.getPokemon(event.currentTarget.id);
                                        props.getPokemonVideo(event.currentTarget.id);
                                    }}>
                                        {props.pokemonInfo[0].id >= 1 ?
                                        <img className='img-fluid' alt={pokemonNextName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[0]}.png`} /> : <img className='img-fluid' alt={pokemonNextName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[1].toLocaleLowerCase()}.png`} /> }
                                        <h5>{pokemonNextName}</h5>
                                    </Link>
                                }
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default PokePage;

