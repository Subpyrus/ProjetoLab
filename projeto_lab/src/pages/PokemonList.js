import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchPokemon from '../components/pokemonList/SearchPokemon';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LazyLoad from 'react-lazyload';

class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPokedexEntries: this.props.pokedexInfo,
            currentIndex: 1,
            resultsPerPage: 24,
            items: [],
            dropdownOpen: false,
            dropdownOpen2: false,
            dropDownValue: 'national',
            typeSearch: 'Region',
            Regions: [],
            Types: [],
            dropDownList: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const { allPokedexEntries, currentIndex, resultsPerPage } = this.state;
        const indexOfLastResults = currentIndex * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);
        this.getPokedexNames()
        this.getTypes()
        this.setState({
            items: currentResults
        });
    }

    componentDidUpdate() {
        console.log("ola")
    }

    getPokedexNames = () => {
        var url = `https://pokeapi.co/api/v2/pokedex/`
    
        const handleResponse = (response) => {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }

        const handleData = (data) => {
          this.setState({Regions:data.results,dropDownList:data.results}) ;
        }

        const handleError = (error) => {
          this.setState({ error: error });
        }

        fetch(url).then(handleResponse)
          .then(handleData)
          .catch(handleError);
    }

    getTypes = () => {
        var url = `https://pokeapi.co/api/v2/type/`
    
        const handleResponse = (response) => {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }
    
        const handleData = (data) => {
            this.setState({Types:data.results});
        }
    
        const handleError = (error) => {
          this.setState({ error: error });
        }
    
        fetch(url).then(handleResponse)
          .then(handleData)
          .catch(handleError);
    }

    getPokedex = (param,param2) => {
        if(param2 === 'Region') {
            var url = `https://pokeapi.co/api/v2/pokedex/${param}/`
        
            const handleResponse = (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
        
            const handleData = (data) => {
                this._isMounted = true;
                const { resultsPerPage } = this.state;
                const indexOfLastResults = 1 * resultsPerPage;
                const indexOfFirstResults = indexOfLastResults - resultsPerPage;
                const currentResults = data.pokemon_entries.slice(indexOfFirstResults, indexOfLastResults);
                this.setState({items:currentResults,currentIndex:1, allPokedexEntries: data.pokemon_entries , dropDownValue:param, dropDownList:this.state.Regions})
            }
        
            const handleError = (error) => {
                this.setState({ error: error });
            }
            fetch(url).then(handleResponse).then(handleData).catch(handleError);

        }else if(param2 === 'Type') {
            var url = `https://pokeapi.co/api/v2/type/${param}/`
        
            const handleResponse = (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
        
            const handleData = (data) => {
                const { resultsPerPage } = this.state;
                const indexOfLastResults = 1 * resultsPerPage;
                const indexOfFirstResults = indexOfLastResults - resultsPerPage;
                const currentResults = data.pokemon.slice(indexOfFirstResults, indexOfLastResults);
                this.setState({items:currentResults,currentIndex:1, allPokedexEntries: data.pokemon , dropDownValue:param, dropDownList:this.state.Types})
            }
        
            const handleError = (error) => {
                this.setState({ error: error });
            }
            fetch(url).then(handleResponse).then(handleData).catch(handleError);
        }
    }

    fetchMoreData = () => {
        var { allPokedexEntries, currentIndex, resultsPerPage } = this.state;
        currentIndex = currentIndex += 1;
        const indexOfLastResults = currentIndex * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = allPokedexEntries.slice(indexOfFirstResults, indexOfLastResults);        
        this.setState({
            items: this.state.items.concat(currentResults),
            currentIndex: currentIndex
        });
    };


    // Dropdown Menu Search
    toggle = (event) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggle2 = (event) => {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2
        });
    }



    changeValue = (e) => {
        this.getPokedex(e.currentTarget.textContent,this.state.typeSearch)
    }
    changeTypeSearch = (e) => {
        if(e.currentTarget.textContent === 'Region') {
            this.getPokedex('nacional','Region')
            this.setState({typeSearch: 'Region', dropDownList: this.state.Regions, dropDownValue: 'national'})
        }else if(e.currentTarget.textContent == 'Type') {
            this.getPokedex('normal','Type')
            this.setState({typeSearch: 'Type', dropDownList: this.state.Types, dropDownValue: 'normal'})
        }
    }

    
    
    
    //Search
    handleSearchChange = (event) => {
        if(event.target.value != "") {
            this.getInfoPokemonPage(event.target.value);
        }else {
            this.getPokedex(this.state.dropDownValue,this.state.typeSearch);
        }
    }
    
    getInfoPokemonPage = (event) => {
        var pokemon;
        var pokemonSearched = [];
        if (event === undefined) {
            pokemon = event;
        } else {
            pokemon = event.toLowerCase();
            this.state.allPokedexEntries.map((pokedexItem, key) => {
                if(pokedexItem.pokemon_species.name.startsWith(pokemon)) {
                    pokemonSearched.push(pokedexItem)
                }
            })
            const { resultsPerPage } = this.state;
            const indexOfLastResults = 1 * resultsPerPage;
            const indexOfFirstResults = indexOfLastResults - resultsPerPage;
            const currentResults = pokemonSearched.slice(indexOfFirstResults, indexOfLastResults);
            this.setState({ items:currentResults, currentIndex: 1, allPokedexEntries: pokemonSearched});
        }
    }

    //Render
    render() {
        var props = this.props
        return (
            <>
                <div className="row">
                    <h1 className='col-4'>PokéList</h1>
                    <SearchPokemon className='col-3' inputChange={this.handleSearchChange} />
                    <Dropdown className='col-1 offset-1' isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                        <DropdownToggle caret>{this.state.typeSearch}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.changeTypeSearch}>Region</DropdownItem>
                            <DropdownItem onClick={this.changeTypeSearch}>Type</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className='col-1 offset-1' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{this.state.dropDownValue}</DropdownToggle>
                        <DropdownMenu>
                        {this.state.dropDownList.map((pokedexItem, key) => 
                            <DropdownItem key={key} onClick={this.changeValue}>{pokedexItem.name}</DropdownItem>
                        )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <InfiniteScroll
                    className='row col-12'
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                >
                    {this.state.items.map((pokedexItem, key) => {
                        const pokemon = require('pokemon');
                        if(this.state.typeSearch == "Region") {
                            var url = pokedexItem.pokemon_species.url.trim();
                            var pokemonName = pokemon.getName(url.split('/')[6]);
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
                        }else if(this.state.typeSearch == "Type") {
                            var url = pokedexItem.pokemon.url.trim();
                            var pokemonName = pokemon.getName(url.split('/')[6]);
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
                        }
                    })}
                </InfiniteScroll>            
            </>
        )
    }
}

export default PokemonList;