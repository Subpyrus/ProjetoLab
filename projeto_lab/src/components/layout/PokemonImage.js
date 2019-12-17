import React from 'react'
import LazyLoad from 'react-lazyload';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const PokemonImage = (props) => {
    const { pokemonName, img, pokedexSearch, functionPokemon, functionVideo, lg } = props
    if(pokemonName !== undefined) {
        return (
            <Col className='py-md-2' sm='6' md='4' lg={lg}>
                <Link className='h-100 containerLink' to={`/pokemon-list/${pokedexSearch}/pokemon-page/${pokemonName.toLowerCase()}`} onClick={() => {
                    functionPokemon(pokemonName.toLowerCase());
                    functionVideo(pokemonName.toLowerCase())
                }
                }>
                    <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                        <LazyLoad height={200} once={true}>
                            <img alt={pokemonName} src={img} />
                        </LazyLoad>
                    </div>
                    <h5 className='text-center'>{pokemonName}</h5>
                </Link>
            </Col>
        )
    }else {
        return (<></>)
    }
    
}

export default PokemonImage
