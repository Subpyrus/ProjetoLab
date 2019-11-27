import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

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
            console.log(data)
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

    render() {
        const { loading, error, evolutionChain } = this.state;
        let pokemonName = [];
        let evolutionMethod = [];
        let evolutionMethodName = [];
        var url
        let pokemon = require('pokemon');

        console.log(this._isMounted)

        /*if (this._isMounted) {
            console.log(evolutionChain);
            console.log(evolutionChain.chain.evolution_details.length > 1)
            if (evolutionChain.chain.evolves_to[0] !== '') {
                console.log("olá")
                url = evolutionChain.chain.species.url.trim()
                pokemonName.push(pokemon.getName(url.split('/')[6]))
                evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolution_details.trigger.name)

                Object.values(evolutionChain.chain.evolves_to[0].evolution_details[0].trigger).forEach(
                    (val) => {
                        if (val !== null && val !== '' && val !== false) {
                            console.log(val)
                        }
                    }
                )
                if (evolutionChain.chain.evolves_to[0].evolves_to[0] !== '') {
                    url = evolutionChain.chain.evolves_to.species.url.trim()
                    pokemonName.push(pokemon.getName(url.split('/')[6]))
                    evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details.trigger.name)
                    Object.values(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details.trigger).forEach(
                        (val) => val !== null && val !== '' && val !== false && evolutionMethod.push(val)
                    );
                }
            } else {
                url = evolutionChain.chain.species.url.trim()
                pokemonName.push(pokemon.getName(url.split('/')[6]))
            }
        }*/

        return (
            <Row>
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
                                        <>
                                            {pokemonName.map((pokeEvName, key) =>
                                                <div key={key}>
                                                    <img src={`http://www.pokestadium.com/sprites/xy/${pokeEvName.toLowerCase()}.gif`} alt={`${pokeEvName.toLowerCase()}-chain`} />
                                                    {evolutionMethodName.length > 1 &&
                                                        <>
                                                            <p>{evolutionMethodName[key]}</p>
                                                            <p>{evolutionMethod[key]}</p>
                                                        </>
                                                    }
                                                </div>
                                            )}
                                        </>
                                    )}
                            </>
                        )}
                </Col>
            </Row >
        )
    }
}
