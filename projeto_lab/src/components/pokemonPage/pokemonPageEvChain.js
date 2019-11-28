import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
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

    render() {
        var string = require('lodash/string')
        const { loading, error, evolutionChain } = this.state;
        let pokemonName = [];
        let evolutionMethod = [''];
        let evolutionMethodName = [''];
        var url
        let pokemon = require('pokemon');

        console.log(this._isMounted)
        console.log(evolutionChain);

        if (this._isMounted) {
            url = evolutionChain.chain.species.url.trim()
            pokemonName.push(pokemon.getName(url.split('/')[6]))
            if (evolutionChain.chain.evolves_to[0] !== '') {
                if (evolutionChain.chain.evolves_to.length !== 0) {
                    url = evolutionChain.chain.species.url.trim()
                    for (let item of evolutionChain.chain.evolves_to) {
                        url = item.species.url.trim()
                        pokemonName.push(pokemon.getName(url.split('/')[6]))
                        evolutionMethodName.push(item.evolution_details[0].trigger.name)
                        const NewEvolutionObject = this.objectWithoutKey(item.evolution_details[0], 'trigger');

                        Object.values(NewEvolutionObject).forEach(
                            (val) => {
                                if (val !== null && val !== '' && val !== false) {
                                    console.log(val)
                                    console.log(typeof val === 'object')
                                    if (typeof val === 'object') {
                                        console.log("olá")
                                        evolutionMethod.push(val.name);
                                    } else {
                                        evolutionMethod.push(val);
                                    }
                                }
                            }
                        )
                    }
                } else {
                    evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolution_details[0].trigger.name)
                    const NewEvolutionObject = this.objectWithoutKey(evolutionChain.chain.evolves_to[0].evolution_details[0], 'trigger');

                    Object.values(NewEvolutionObject).forEach(
                        (val) => {
                            if (val !== null && val !== '' && val !== false) {
                                console.log(val)
                                console.log(typeof val === 'object')
                                if (typeof val === 'object') {
                                    console.log("olá")
                                    evolutionMethod.push(val.name);
                                } else {
                                    evolutionMethod.push(val);
                                }
                            }
                        }
                    )
                }

                if (evolutionChain.chain.evolves_to.length !== 0) {
                    if (evolutionChain.chain.evolves_to[0].evolves_to.length !== 0) {
                        url = evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.trim()
                        pokemonName.push(pokemon.getName(url.split('/')[6]))
                        evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name)

                        const NewerEvolutionObject = this.objectWithoutKey(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0], 'trigger');

                        Object.values(NewerEvolutionObject).forEach(
                            (val) => {
                                if (val !== null && val !== '' && val !== false) {
                                    console.log(val)
                                    console.log(typeof val === 'object')
                                    if (typeof val === 'object') {
                                        console.log("olá")
                                        evolutionMethod.push(val.name);
                                    } else {
                                        evolutionMethod.push(val);
                                    }
                                }
                            }
                        )
                    }
                }

            } else {
                url = evolutionChain.chain.species.url.trim()
                pokemonName.push(pokemon.getName(url.split('/')[6]))
            }
        }

        console.log(pokemonName)
        console.log(evolutionMethodName);
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
                                        <Row>
                                            {pokemonName.map((pokeEvName, key) =>
                                                <Col xs='12' sm='4' key={key}>
                                                    <Row className='d-flex align-items-center justify-content-center'>
                                                        <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                                            <LazyLoad height={200} once={true}>
                                                                <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokeEvName.toLowerCase()}.gif`} />
                                                            </LazyLoad>
                                                        </div>
                                                        {evolutionMethodName.length > 1 && evolutionMethodName[key] !== '' &&
                                                            <Col xs='12' className='text-center'>
                                                                <p>Method: {string.startCase(`${evolutionMethodName[key]}`)}</p>
                                                                <p>Requirement: {evolutionMethod[key]}</p>
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

