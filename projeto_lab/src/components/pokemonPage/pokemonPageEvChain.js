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

        console.log(evolutionChain);

        return (
            <Row>
                <h3 className='col-12 text-center'>Description</h3>
                <Col xs='12'>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                            <div></div>
                        )}
                </Col>
            </Row>
        )
    }
}
