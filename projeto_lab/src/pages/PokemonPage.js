import React, { PureComponent } from 'react';
import { Row, Col, Table, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Loading from '../components/layout/Loading';
import PokemonPageImages from '../components/pokemonPage/pokemonPageImages';
import PokemonPageMoves from '../components/pokemonPage/pokemonPageMoves';
import PokemonPageGenericInfo from '../components/pokemonPage/pokemonPageGenericInfo';
import PokemonPageEvChain from '../components/pokemonPage/pokemonPageEvChain';
import PokemonPageNextPrevious from '../components/pokemonPage/pokemonPageNextPrevious';
import { addFavoritePokemon, removeFavoritePokemon, addPokemonToTeam, removePokemonToTeam } from '../store/actions/favoriteActions';
/*import LazyLoad from 'react-lazyload';
import Slider from "react-slick";
import YouTube from 'react-youtube';*/

class PokePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            generation: 'crystal',
            modal: false,
            evolutionChain: [],
            activeTab: '1',
        }
    }

    /*componentDidMount() {
        if (this.props.pokemonInfo.length === 0) {
            this.props.getPokemon(props.match.params.pokemon);
        }
        this.props.getPokemonEvolutionChain(this.props[1].evolution_chain);
    }*/


    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        };
    }

    render() {
        const props = this.props;
        const { auth, profileTeam, profileFavorites } = this.props;

        if (props.pokemonInfo.length === 0) {
            props.getPokemon(props.match.params.pokemon);
            return (
                <Loading></Loading>
            )
        } else {
            var string = require('lodash/string')
            const { generation } = this.state
            let { moves, stats } = props.pokemonInfo[0][0];
            const { genera, names, flavor_text_entries, evolution_chain } = props.pokemonInfo[0][1];

            let pokemon = require('pokemon');
            let pokemonName = pokemon.getName(props.pokemonInfo[0][0].id)
            var descriptions = new Set();
            var uniqueNames = new Set();
            var generations = []

            flavor_text_entries.map((descriptionItem) => {
                if (descriptionItem.language.name === 'en') {
                    descriptions.add(descriptionItem.flavor_text);
                    generations.push(descriptionItem.version.name)
                }
            })

            names.map((nameItem) => {
                nameItem.language.name !== "en" && nameItem.name !== pokemonName &&
                    uniqueNames.add(nameItem.name);
            })

            /*
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };
        
            const opts = {
                height: '390',
                width: '640',
            };*/

            return (
                <Row className="justify-content-center">

                    <Col xs='12' className='pb-4'>
                        <Row>
                            <Col xs='12' lg='8'>
                                <h1>
                                    <img alt={`${pokemonName}Miniature`} src={`http://www.pokestadium.com/assets/img/sprites/misc/icons/${props.match.params.pokemon}.png`} />
                                    {pokemonName}
                                    <span style={{ fontSize: '55%' }}> {genera[2].genus}</span>
                                </h1>
                            </Col>
                            {auth.uid &&
                                <Col xs='12' lg='4'>
                                    <Row className='d-flex justify-content-end'>
                                    </Row>
                                </Col>
                            }
                            <Col xs='12' lg='6' className='justify-content-center'>
                                <div className='d-block d-md-flex justify-content-md-between'>
                                    {Array.from(uniqueNames).map((uniqueNameItem, key) =>
                                        <h6 className='text-center' key={key}>
                                            {uniqueNameItem}
                                        </h6>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <PokemonPageImages name={pokemonName} />

                    <PokemonPageGenericInfo info={props.pokemonInfo} />

                    <Col xs='12' className='py-4 py-lg-5'>
                        <Row>
                            <h3 className='col-12 text-center'>Description</h3>
                            <Col xs='12'>
                                {Array.from(descriptions).map((descriptionItem, key) =>
                                    <p key={key}>{descriptionItem}{generations[key]}{generations[key += 1]}</p>
                                )}
                            </Col>
                        </Row>
                    </Col>

                    <Col xs='12' className='py-4 py-lg-5'>
                        <Row>
                            <h3 className='col-12 text-center'>Stats</h3>
                            {stats.map((statsItem, key) =>
                                <Col key={key} xs='6' sm='6' md='4' lg='2'>
                                    <Row className='d-flex text-center justify-content-center'>
                                        <Col xs='12'>
                                            <h5>{string.startCase(statsItem.stat.name)}</h5>
                                        </Col>
                                        <Col xs='12'>
                                            <p>{string.startCase(statsItem.base_stat)}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>

                    <PokemonPageEvChain EvChainURL={evolution_chain.url} />

                    <Col xs='12' className='py-4 py-lg-5'>
                        <h3 className='col-12 text-center'>Moves</h3>
                        <div>
                            <Nav style={{}} pills justified fill className='nav nav-justified'>
                                <NavItem className='p-0'>
                                    <NavLink style={{ borderRadius: '0' }}
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Level-Up Moves
                                        </NavLink>
                                </NavItem>
                                <NavItem className='p-0'>
                                    <NavLink style={{ borderRadius: '0' }}
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        TMs/HMs Moves
                                        </NavLink>
                                </NavItem>
                                {generation !== 'gold-silver' && generation !== 'crystal' && generation !== 'red-blue' && generation !== 'yellow' &&
                                    <>
                                        <NavItem className='p-0'>
                                            <NavLink style={{ borderRadius: '0' }}
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggle('3'); }}
                                            >
                                                Egg Moves
                                        </NavLink>
                                        </NavItem>
                                        <NavItem className='p-0'>
                                            <NavLink style={{ borderRadius: '0' }}
                                                className={classnames({ active: this.state.activeTab === '4' })}
                                                onClick={() => { this.toggle('4'); }}
                                            >
                                                Tutor Moves
                                        </NavLink>
                                        </NavItem>
                                    </>
                                }
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={generation} method={'level-up'} />
                                </TabPane>
                                <TabPane tabId="2">
                                    <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={generation} method={'machine'} />
                                </TabPane>
                                {generation !== 'gold-silver' && generation !== 'crystal' && generation !== 'red-blue' && generation !== 'yellow' &&
                                    <>
                                        <TabPane tabId="3">
                                            <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={generation} method={'egg'} />
                                        </TabPane>
                                        <TabPane tabId="4">
                                            <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={generation} method={'tutor'} />
                                        </TabPane>
                                    </>
                                }
                            </TabContent>
                        </div>
                    </Col>

                    <Col xs="12">
                        <h3 className='col-12 text-center'>Videos</h3>
                        {/*<Slider {...settings}>
                            {props.pokemonVideos.items.map((videoItem, key) =>
                                <div key={key}>
                                    <YouTube
                                        videoId={videoItem.id.videoId}
                                        opts={opts}
                                    />
                                </div>
                            )}
                            </Slider>*/}
                    </Col>

                    <PokemonPageNextPrevious pokemonId={props.pokemonInfo[0][0].id} pokemonName={pokemonName} getPokemonInfo={props.getPokemon} />
                </Row>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profileTeam: state.firebase.favoriteTeam,
        profileFavorites: state.firebase.favoritePokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavoritePokemon: (pokemon) => dispatch(addFavoritePokemon(pokemon)),
        removeFavoritePokemon: (pokemon) => dispatch(removeFavoritePokemon(pokemon)),
        addPokemonToTeam: (pokemon) => dispatch(addPokemonToTeam(pokemon)),
        removePokemonToTeam: (pokemon) => dispatch(removePokemonToTeam(pokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);