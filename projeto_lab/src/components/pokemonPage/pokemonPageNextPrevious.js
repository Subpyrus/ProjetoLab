import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getInfoPokemonPage, getYoutubeVideo } from '../../store/actions/apiActions';

const pokemonPageNextPrevious = (props) => {
    let { pokemonId, getInfoPokemonPage, getYoutubeVideo } = props;
    let pokemon = require('pokemon');
    let pokemonIds = [];
    var pokemonNextName,
        pokemonPreviousName;

    if (pokemonId === 1) {
        pokemonIds.push(pokemonId += 1)
        pokemonNextName = pokemon.getName(`${pokemonIds[0]}`)
    } else if (pokemonId === 808) {
        pokemonIds.push(pokemonId -= 1)
        pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
    } else {
        pokemonIds.push(pokemonId -= 1)
        pokemonIds.push(pokemonId += 2)
        pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
        pokemonNextName = pokemon.getName(`${pokemonIds[1]}`)
    }

    return (
        <Col xs="12" className='mt-5'>
            <Row className="justify-content-between align-items-center">
                <Col xs="12" sm='6' className='py-2 py-sm-0'>
                    {props.pokemonId <= 808 && props.pokemonId !== 1 &&
                        <Row className='d-flex align-items-center justify-content-center justify-content-md-start'>
                            <Link className='basicLink' id={pokemonPreviousName.toLowerCase()} to={`/pokemon-list/national/pokemon-page/${pokemonPreviousName}`} onClick={(event) => {
                                getInfoPokemonPage(event.currentTarget.id);
                                getYoutubeVideo(event.currentTarget.id)
                            }}>
                                <Col xs='12'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                        <img alt={pokemonPreviousName} src={`http://www.pokestadium.com/sprites/xy/${pokemonPreviousName.toLowerCase()}.gif`} />
                                    </div>
                                    <div className='d-inline text-center'>
                                        <i className="w-100 fas fa-arrow-left"></i>
                                        <p>
                                            {pokemonPreviousName}
                                        </p>
                                    </div>
                                </Col>
                            </Link>
                        </Row>
                    }
                </Col>
                <Col xs="12" sm="6" lg="2" className='py-2 py-sm-0'>
                    {props.pokemonId >= 1 && props.pokemonId !== 808 &&
                        <Row className='d-flex align-items-center justify-content-center justify-content-md-end'>
                            <Link className='basicLink' id={pokemonNextName.toLowerCase()} to={`/pokemon-list/national/pokemon-page/${pokemonNextName.toLowerCase()}`} onClick={(event) => {
                                getInfoPokemonPage(event.currentTarget.id);
                                getYoutubeVideo(event.currentTarget.id)
                            }}>
                                <Col xs='12'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                        <img alt={pokemonNextName} src={`http://www.pokestadium.com/sprites/xy/${pokemonNextName.toLowerCase()}.gif`} />
                                    </div>
                                    <div className='d-inline text-center'>
                                        <i className="w-100 fas fa-arrow-right"></i>
                                        <p>
                                            {pokemonNextName}
                                        </p>
                                    </div>
                                </Col>
                            </Link>
                        </Row>
                    }
                </Col>
            </Row>
        </Col >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon))
    }
}

export default connect(null, mapDispatchToProps)(pokemonPageNextPrevious);