import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

export default class pokemonPageEvChain extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            evolutionChain: '',
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        const { EvChainURL } = this.props
        this.getPokemonEvolutionChain(EvChainURL);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPokemonEvolutionChain = (evolutionChainURL) => {
        var url = evolutionChainURL

        const handleResponse = (response) => {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        const handleData = (data) => {
            this._isMounted = true;
            this.setState({ evolutionChain: data, loading: false });
        }

        const handleError = (error) => {
            this.setState({ error: error });
        }

        fetch(url).then(handleResponse)
            .then(handleData)
            .catch(handleError);
    }

    objectWithoutKey = (object, key) => {
        const { [key]: deletedKey, ...otherKeys } = object;
        return otherKeys;
    }

    getPokemonEvolutionMethodsAndNames = (item, arrayPokemonName, arrayMethodName, arrayMethod) => {
        let pokemon = require('pokemon');
        let url = item.species.url.trim()
        arrayPokemonName.push(pokemon.getName(url.split('/')[6]))
        arrayMethodName.push(item.evolution_details[0].trigger.name)
        const NewEvolutionObject = this.objectWithoutKey(item.evolution_details[0], 'trigger');
        const checkConditions = []

        Object.entries(NewEvolutionObject).forEach(
            (val) => {
                if (val[1] !== null && val[1] !== '' && val[1] !== false) {
                    checkConditions.push(val);
                }
            }
        )
        arrayMethod.push([...checkConditions])
    }

    render() {
        var string = require('lodash/string')
        const { loading, error, evolutionChain } = this.state;
        const { getPokemonInfo } = this.props
        let evolutionMethod = [''];
        let evolutionMethodName = [''];
        var url
        let pokemon = require('pokemon');
        let pokemonName = [];

        if (this._isMounted) {
            url = evolutionChain.chain.species.url.trim()
            pokemonName.push(pokemon.getName(url.split('/')[6]))
            if (evolutionChain.chain.evolves_to[0] !== '') {
                if (evolutionChain.chain.evolves_to.length !== 0) {
                    for (let item of evolutionChain.chain.evolves_to) {
                        this.getPokemonEvolutionMethodsAndNames(item, pokemonName, evolutionMethodName, evolutionMethod)
                    }
                } else {
                    this.getPokemonEvolutionMethodsAndNames(evolutionChain.chain.evolves_to[0], pokemonName, evolutionMethodName, evolutionMethod)
                }

                if (evolutionChain.chain.evolves_to[0].evolves_to.length !== 0) {
                    if (evolutionChain.chain.evolves_to[0].evolves_to.length !== 0) {
                        for (let item of evolutionChain.chain.evolves_to[0].evolves_to) {
                            this.getPokemonEvolutionMethodsAndNames(item, pokemonName, evolutionMethodName, evolutionMethod)
                        }
                    } else {
                        this.getPokemonEvolutionMethodsAndNames(evolutionChain.chain.evolves_to[0].evolves_to[0], pokemonName, evolutionMethodName, evolutionMethod)
                    }
                }
            } else {
                url = evolutionChain.chain.species.url.trim()
                pokemonName.push(pokemon.getName(url.split('/')[6]))
            }
        }

        console.log(evolutionMethod)

        return (
            <Row className='py-4 py-lg-5'>
                <h3 className='col-12 text-center'>Evolution Chain</h3>
                <Col xs='12'>
                    {error ? (
                        <>
                            <p>error</p>
                        </>
                    ) : (
                            <>
                                {loading ? (
                                    <p> loading...</p>
                                ) : (
                                        <Row className='d-flex align-items-center justify-content-center text-center'>
                                            {pokemonName.map((pokeEvName, key) =>
                                                <Col xs='12' sm='4' key={key}>
                                                    <Row>
                                                        <Col xs='12' className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                                            <LazyLoad height={200} once={true}>
                                                                <Link to id={pokeEvName.toLowerCase()} to={`/pokemon-list/national/pokemon-page/${pokeEvName.toLowerCase()}`} onClick={(event) => {
                                                                    getPokemonInfo(event.currentTarget.id);
                                                                }}>
                                                                    <img alt={pokeEvName} src={`http://www.pokestadium.com/sprites/xy/${pokeEvName.toLowerCase()}.gif`} />
                                                                </Link>
                                                                
                                                            </LazyLoad>
                                                        </Col>
                                                        {evolutionMethodName.length > 1 && evolutionMethodName[key] !== '' &&
                                                            <Col xs='12' className='text-center'>
                                                                <p>Method: {string.startCase(`${evolutionMethodName[key]}`)}</p>
                                                                <div>Requirement:
                                                                    {evolutionMethod[key].map((methodSpecifics) =>
                                                                    methodSpecifics.map((methodSpecifics, key) => {
                                                                        if (typeof methodSpecifics === 'object') {
                                                                            return <p className='small' key={key}>{string.startCase(methodSpecifics.name)}</p>
                                                                        } else {
                                                                            return <p className='small' key={key}>{string.startCase(methodSpecifics)}</p>
                                                                        }
                                                                    }))}
                                                                </div>
                                                            </Col>
                                                        }
                                                    </Row>
                                                </Col>
                                            )}
                                        </Row>
                                    )}
                            </>
                        )}
                </Col>
            </Row >
        )
    }
}

