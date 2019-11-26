import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from 'react-lazyload';

class PokemonList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            allPokedexEntries: this.props.pokedexInfo,
            currentIndex: 1,
            resultsPerPage: 24,
            items: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const { allPokedexEntries, currentIndex, resultsPerPage } = this.state;
        const indexOfLastResults = currentIndex * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);
        if (this._isMounted) {
            this.setState({
                items: currentResults
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    fetchMoreData = () => {
        var { allPokedexEntries, currentIndex, resultsPerPage } = this.state;
        currentIndex = currentIndex += 1;
        const indexOfLastResults = currentIndex * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);
        if (this._isMounted) {
            if (!this._isMounted) return false
                this.setState({
                items: this.state.items.concat(currentResults),
                currentIndex: currentIndex
            });
        }
    };

    render() {
        var props = this.props
        return (
            <>
                <h1 className='col-12'>PokéList</h1>
                <InfiniteScroll
                    className='row col-12'
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {this.state.items.map((pokedexItem, key) => {
                        const pokemon = require('pokemon');
                        var pokemonName = pokemon.getName(pokedexItem.entry_number);
                        return (
                            <Col key={key} className='py-md-2' xs='12' sm='6' md='4' lg='2'>
                                <Link to={`/pokemon-list/${props.match.params.generation}/pokemon-page/${pokemonName.toLocaleLowerCase()}`} onClick={props.getPokemon}>
                                    <div>
                                        <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                            <LazyLoad height={200} once={true}>
                                                <img alt={pokemonName} src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemonName.toLowerCase()}.png`} />
                                            </LazyLoad>
                                        </div>
                                        <h5 className='text-center'>{pokemonName}</h5>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })}
                </InfiniteScroll>
            </>
        )
    }
}

export default PokemonList;