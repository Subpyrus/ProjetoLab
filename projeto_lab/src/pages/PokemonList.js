import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LazyLoad from 'react-lazyload';

class PokemonList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            allPokedexEntries: this.props.pokedexInfo,
            currentIndex: 1,
            resultsPerPage: 24,
            items: [],
            dropdownOpen: false,
            dropDownValue: 'national',
            getPokedexNames: []
        }
    }

    getPokedexNames = () => {
        var url = `https://pokeapi.co/api/v2/pokedex/`
    
        const handleResponse = (response) => {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }
    
        const handleData = (data) => {
          this.setState({ getPokedexNames: data.results});
        }
    
        const handleError = (error) => {
          this.setState({ error: error });
        }
    
        fetch(url).then(handleResponse)
          .then(handleData)
          .catch(handleError);
    }

    getPokedex = (region) => {
        var url = `https://pokeapi.co/api/v2/pokedex/${region}/`
    
        const handleResponse = (response) => {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }
    
        const handleData = (data) => {
            this._isMounted = true;
            const { allPokedexEntries, resultsPerPage } = this.state;
            const indexOfLastResults = 1 * resultsPerPage;
            const indexOfFirstResults = indexOfLastResults - resultsPerPage;
            const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);

            this.setState({ items:currentResults, currentIndex: 1, allPokedexEntries: data.pokemon_entries, dropDownValue: region});
        }
    
        const handleError = (error) => {
          this.setState({ error: error });
        }
    
        fetch(url).then(handleResponse)
          .then(handleData)
          .catch(handleError);
    }

    componentDidMount() {
        this._isMounted = true;
        const { allPokedexEntries, currentIndex, resultsPerPage } = this.state;
        const indexOfLastResults = currentIndex * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);
        if (this._isMounted) {
            this.getPokedexNames()
            this.setState({
                items: currentResults
            });
        }
    }

    componentDidUpdate() {
        console.log(this.state.allPokedexEntries)
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

    toggle = (event) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue = (e) => {
        this.getPokedex(e.currentTarget.textContent)
    }

    render() {
        var props = this.props
        return (
            <>
                <div className="row">
                    <h1 className='col-6'>PokéList</h1>
                    <Dropdown className='col-1 offset-4' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{this.state.dropDownValue}</DropdownToggle>
                        <DropdownMenu>
                        {this.state.getPokedexNames.map((pokedexItem, key) => 
                            <DropdownItem onClick={this.changeValue}>{pokedexItem.name}</DropdownItem>
                        )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <InfiniteScroll
                    className='row col-12'
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {this.state.items.map((pokedexItem, key) => {
                        const pokemon = require('pokemon');
                        var url = pokedexItem.pokemon_species.url.trim();
                        console.log(url)
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