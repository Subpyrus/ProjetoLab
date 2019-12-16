import React, { Component } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from 'react-lazyload';
import Select from 'react-select';
import { connect } from 'react-redux';
import Loading from '../components/layout/Loading';
import { getInfoPokemonPage } from '../store/actions/apiActions';

class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPokedexEntries: this.props.pokedexEntries,
            searchPokemon: '',
            currentIndex: 1,
            resultsPerPage: 24,
            items: [],
            typeSearch: 'Region',
            selectValue: 'National',
            selectList: this.props.regions,
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {
        const { allPokedexEntries } = this.state
        this.setState({
            items: this.calculatePage(allPokedexEntries, 1)
        });
    }

    calculatePage = (caculateResults, index) => {
        const { resultsPerPage } = this.state;
        const indexOfLastResults = index * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = caculateResults.slice(indexOfFirstResults, indexOfLastResults);
        return currentResults
    }

    getPokedex = (param, param2) => {
        this.setState({ isLoading: true })
        var url, pokemonData, defineSelectList;
        param2 === 'Region' ? (url = `https://pokeapi.co/api/v2/pokedex/${param}/`) : (url = `https://pokeapi.co/api/v2/type/${param}/`);

        const handleData = (data) => {
            param2 === 'Region' ? (pokemonData = data.pokemon_entries) : (pokemonData = data.pokemon);
            param2 === 'Region' ? (defineSelectList = this.props.regions) : (defineSelectList = this.props.types);
            this.setState({ items: this.calculatePage(pokemonData, 1), currentIndex: 1, allPokedexEntries: pokemonData, selectValue: param, selectList: defineSelectList, isLoading: false })
        }

        const handleError = (error) => {
            this.setState({ error: error.message, isLoading: false });
        }

        fetch(url).then(async (response) => {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            })
        }).then(handleData).catch(handleError);
    }

    fetchMoreData = () => {
        var { currentIndex, allPokedexEntries } = this.state;
        currentIndex = currentIndex += 1;
        this.setState({
            items: this.state.items.concat(this.calculatePage(allPokedexEntries, currentIndex)),
            currentIndex: currentIndex
        });
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        if (value !== "") {
            var pokemon;
            var pokemonSearched = [];
            pokemon = value.toLowerCase();
            for (let pokedexItem of this.state.allPokedexEntries) {
                if (pokedexItem.pokemon_species.name.startsWith(pokemon) || pokedexItem.pokemon_species.name.includes(pokemon)) {
                    pokemonSearched.push(pokedexItem)
                }
            }
            this.setState({ items: this.calculatePage(pokemonSearched, 1), currentIndex: 1, searchPokemon: pokemonSearched });
        } else {
            const { allPokedexEntries } = this.state
            this.setState({ items: this.calculatePage(allPokedexEntries, 1), currentIndex: 1, searchPokemon: '' });
        }
    }


    handleSelectChange = (value, action) => {
        if (action.name === 'typeSearch') {
            if (value.value === 'Region') {
                this.getPokedex('national', 'Region')
                this.setState({ [action.name]: value.value, selectList: this.props.regions, selectValue: 'national' })
            } else {
                this.getPokedex('normal', 'Type')
                this.setState({ [action.name]: value.value, selectList: this.props.types, selectValue: 'normal' })
            }
        } else {
            this.getPokedex(value.value, this.state.typeSearch)
            this.setState({ [action.name]: value.value })
        }
    }

    //Render
    render() {
        const pokemon = require('pokemon');
        const { items, typeSearch, selectValue, isLoading } = this.state;
        const { getInfoPokemonPage, match } = this.props
        var string = require('lodash/string');
        let optionsSelectSpecifics = []

        for (let item of this.state.selectList) {
            optionsSelectSpecifics.push({ value: item.name, label: string.startCase(item.name) })
        }

        const customStyles = {
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: '#ebebd3' };
            },
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? '#f24643' : '#ffe066',
                backgroundColor: state.isSelected ? '#ffe066' : '#f24643',
                "&:hover": {
                    backgroundColor: "#1688b9",
                    fontWeight: 'bold',
                    color: "#ebebd3"
                }
            }),
            menu: (provided) => ({
                ...provided,
                borderRadius: 0,
                marginTop: 0,
            }),
            menuList: (provided) => ({
                ...provided,
                backgroundColor: '#f24643',
                color: '#ffe066',
                padding: 0
            }),
            control: (provided, state) => ({
                ...provided,
                color: '#ffe066',
                border: '1px solid #ffe066',
                borderRadius: 3,
                backgroundColor: state.isFocused ? '#f24643' : '#1688b9',
                boxShadow: state.isFocused ? null : null,
                "&:hover": {
                    borderColor: "ffe066"
                }
            }),
            dropdownIndicator: (provided, state) => ({
                ...provided,
                color: '#ffe066'
            }),
            placeholder: (provided, state) => ({
                ...provided,
                color: state.isFocused ? '#ffe066' : '#ebebd3',
                fontWeight: state.isFocused ? 'bold' : 'normal',
            }),
        }

        return (
            <>
                <Row className='align-items-md-center justify-content-between'>
                    <h1 className='col-12 col-lg-4'>PokéList</h1>

                    <Col className='col-12 col-md-6 col-lg-3 px-2 py-2 py-md-0'>
                        <FormGroup className='m-0'>
                            <Input type="text" placeholder='search pokémon name' onChange={this.handleSearchChange} />
                        </FormGroup>
                    </Col>

                    <Select
                        className='col-12 col-md-6 col-lg-2 px-2 py-2 py-md-0'
                        name='typeSearch'
                        value={{ value: typeSearch, label: string.startCase(typeSearch) }}
                        styles={customStyles}
                        onChange={this.handleSelectChange}
                        options={[{ label: 'Region', value: 'Region' }, { label: 'Type', value: 'Type' }]}
                        placeholder='Region'
                        isSearchable={false}
                    />

                    <Select
                        className='col-12 col-md-6 col-lg-2 px-2 py-2 py-md-0'
                        name='selectValue'
                        styles={customStyles}
                        value={{ value: selectValue, label: string.startCase(selectValue) }}
                        onChange={this.handleSelectChange}
                        options={optionsSelectSpecifics}
                        isSearchable={false}
                    />
                </Row>
                {isLoading ? (<Loading />) :
                    (<InfiniteScroll
                        className='row col-12'
                        dataLength={items.length}
                        next={this.fetchMoreData}
                        hasMore={true}>
                        {items.map((pokedexItem, key) => {
                            var img, url, pokemonName, pokeNumber;
                            if (typeSearch === "Region" && pokedexItem.pokemon_species !== undefined) {
                                url = pokedexItem.pokemon_species.url.trim();
                                pokeNumber = url.split('/')[6]
                                pokemonName = pokemon.getName(pokeNumber);
                            } else if (typeSearch === "Type" && pokedexItem.pokemon !== undefined) {
                                url = pokedexItem.pokemon.url.trim();
                                pokeNumber = url.split('/')[6]
                                if (pokeNumber < 10000) {
                                    pokemonName = pokemon.getName(pokeNumber);
                                }
                            } else {
                                return <Loading />
                            }

                            if (pokemonName > 722) {
                                img = `https://serebii.net/sunmoon/pokemon/${pokemonName}.png`
                            } else {
                                img = `https://img.pokemondb.net/sprites/x-y/normal/${pokemonName.toLowerCase()}.png`
                            }

                            return (
                                <Col key={key} className='py-md-2' xs='12' sm='6' md='4' lg='2'>
                                    <Link className='h-100 containerLink' to={`/pokemon-list/${match.params.search}/pokemon-page/${pokemonName.toLowerCase()}`} onClick={() => getInfoPokemonPage(pokemonName.toLowerCase())}>
                                        <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                                            <LazyLoad height={200} once={true}>
                                                <img alt={pokemonName} src={img} />
                                            </LazyLoad>
                                        </div>
                                        <h5 className='text-center'>{pokemonName}</h5>
                                    </Link>
                                </Col>
                            )
                        })}
                    </InfiniteScroll>)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pokedexEntries: state.apiCalls.apiData.getPokedex,
        regions: state.apiCalls.apiData.getPokedexDropdowns.regions,
        types: state.apiCalls.apiData.getPokedexDropdowns.types
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        /*getPokedexChangeValue: (param, secondParam) => dispatch(getPokedexChangeValue(param, secondParam))*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);