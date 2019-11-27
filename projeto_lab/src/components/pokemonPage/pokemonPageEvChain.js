import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

export default class pokemonPageEvChain extends Component {
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

    getPokemonEvolutionChain = (evolutionChainURL) => {
        var url = evolutionChainURL

        const handleResponse = (response) => {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        const handleData = (data) => {
            console.log(data)
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

        let evolutionContent;
        let pokemonName = [];
        let evolutionMethod = [];
        let evolutionMethodName = [];
        var url
        let pokemon = require('pokemon');

        if (evolutionChain.chain.evolves_to.lenght > 1) {
            url = evolutionChain.chain.species.url.trim()
            pokemonName.push(pokemon.getName(url.split('/')[6]))
            evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolution_details.trigger.name)
            Object.values(evolutionChain.chain.evolves_to[0].evolution_details.trigger).forEach(
                (val) => val != null && val != '' && val != false && (evolutionMethod.push(val))
            );
            if (evolutionChain.chain.evolves_to[0].evolves_to.lenght > 1) {
                url = evolutionChain.chain.evolves_to.species.url.trim()
                pokemonName.push(pokemon.getName(url.split('/')[6]))
                evolutionMethodName.push(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details.trigger.name)
                Object.values(evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details.trigger).forEach(
                    (val) => val != null && val != '' && val != false && (evolutionMethod.push(val))
                );
            }
        } else {
            url = evolutionChain.chain.species.url.trim()
            pokemonName.push(pokemon.getName(url.split('/')[6]))
        }

        console.log(evolutionChain);

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
                                                    <img src={`https://img.pokemondb.net/sprites/x-y/normal/${pokeEvName.toLowerCase()}.png`} alt={`${pokeEvName.toLowerCase()}-chain`} />
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
