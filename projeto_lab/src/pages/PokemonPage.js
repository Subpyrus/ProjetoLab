import React, { PureComponent } from 'react';
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PokemonPageImages from '../components/pokemonPage/pokemonPageImages';
import PokemonPageMoves from '../components/pokemonPage/pokemonPageMoves';
import PokemonPageGenericInfo from '../components/pokemonPage/pokemonPageGenericInfo';
import PokemonPageEvChain from '../components/pokemonPage/pokemonPageEvChain';
import PokemonPageNextPrevious from '../components/pokemonPage/pokemonPageNextPrevious';
import { addFavoritePokemon, removeFavoritePokemon, addPokemonToTeam, removePokemonFromTeam } from '../store/actions/favoriteActions';
/*import LazyLoad from 'react-lazyload';
import Slider from "react-slick";
import YouTube from 'react-youtube';*/

class PokePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        };
    }

    render() {
        const { auth, removePokemonFromTeam, addPokemonToTeam, removeFavoritePokemon, addFavoritePokemon, pokemonInfo, pokemonEvChainInfo } = this.props;
        const { moves, stats, id } = this.props.pokemonInfo[0];
        console.log(moves)
        const { genera, names, flavor_text_entries } = this.props.pokemonInfo[1];
        var string = require('lodash/string')
        let pokemon = require('pokemon');
        let pokemonName = pokemon.getName(id)
        var uniqueNames = new Set();

        for (let item of names) {
            item.language.name !== "en" && item.name !== pokemonName &&
                uniqueNames.add(item.name);
        }

        if (auth.uid) {
            var { profilePokemonTeam, profilePokemonFavorites } = this.props;
            var foundPokemonTeam = profilePokemonTeam.find(pokemon => pokemon.name === pokemonName);
            var foundPokemonFavorites = profilePokemonFavorites.find(pokemon => pokemon.name === pokemonName);
        }

        return (
            <Row className="justify-content-center">
                <Col xs='12' className='pb-4'>
                    <Row>
                        <Col xs='12' lg={auth.uid ? ('6') : ('12')}>
                            <h1 style={{paddingBottom: '0.80rem'}} className={auth.uid ? ('text-lg-left text-center') : ('text-center')}>
                                <img alt={`${pokemonName}Miniature`} src={`http://www.pokestadium.com/assets/img/sprites/misc/icons/${this.props.match.params.pokemon}.png`} />
                                {pokemonName}
                                <span style={{ fontSize: '55%' }}> {genera[2].genus}</span>
                            </h1>
                        </Col>
                        {auth.uid &&
                            <Col xs='12'>
                                <Row className='justify-content-lg-end justify-content-center'>
                                    {foundPokemonTeam !== undefined ?
                                        (<Button className='my-2 my-lg-0 mx-2' onClick={() => {
                                            removePokemonFromTeam(pokemonName);
                                        }} color="danger">Remove From Favorite Team</Button>) : profilePokemonTeam.length === 6 ?
                                            (<Button className='my-2 my-lg-0 mx-2' color="warning" disabled>Your Favorite Team is Full</Button>) :
                                            (<Button className='my-2 my-lg-0 mx-2' onClick={() => {
                                                addPokemonToTeam([pokemonName, stats]);
                                            }} color="warning">Add to Favorite Team</Button>)
                                    }
                                    {foundPokemonFavorites !== undefined ?
                                        (<Button className='my-2 my-lg-0 mx-2' onClick={() => {
                                            removeFavoritePokemon(pokemonName);
                                        }} color="danger">Remove From Favorites</Button>
                                        ) : profilePokemonFavorites.length === 50 ?
                                            (<Button className='my-2 my-lg-0 mx-2' color="warning" disabled>Your Favorites are Full</Button>) :
                                            (<Button className='my-2 my-lg-0 mx-2' onClick={() => {
                                                addFavoritePokemon([pokemonName, stats]);
                                            }} color="warning">Add to Favorites</Button>
                                            )
                                    }
                                </Row>
                            </Col>
                        }
                        <Col xs='12'>
                            <h6 className={auth.uid ? ('col-12 text-center text-md-left') : ('col-12 text-center')}>
                                {Array.from(uniqueNames).map((uniqueNameItem, key) => <span key={key} className='p-2'>{uniqueNameItem}</span>)}
                            </h6>
                        </Col>
                    </Row>
                </Col>

                <PokemonPageImages name={pokemonName} />

                <PokemonPageGenericInfo info={pokemonInfo} />

                <Col xs='12' md='6' className='py-4 py-lg-5'>
                    <Row>
                        <h3 className='col-12 text-center'>Description</h3>
                        <Col xs='12'>
                            <p>{flavor_text_entries[1].flavor_text}</p>
                        </Col>
                    </Row>
                </Col>

                <Col xs='12' md='6' className='py-4 py-lg-5'>
                    <Row>
                        <h3 className='col-12 text-center'>Stats</h3>
                        {stats.map((statsItem, key) =>
                            <Col key={key} xs='6' sm='6' md='4' lg='2'>
                                <Row className='d-flex text-center align-items-center justify-content-center'>
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

                <PokemonPageEvChain evChainData={pokemonEvChainInfo} />

                <Col xs='12' className='py-4 py-lg-5'>
                    <h3 className='col-12 text-center'>Moves</h3>
                    <div className='col-12 col-sm-11 col-md-10 col-lg-9 mx-sm-auto'>
                        <Nav pills justified fill className='nav nav-justified'>
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
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <PokemonPageMoves pokemonMoves={moves} method={'level-up'} />
                            </TabPane>
                            <TabPane tabId="2">
                                <PokemonPageMoves pokemonMoves={moves} method={'machine'} />
                            </TabPane>
                            <TabPane tabId="3">
                                <PokemonPageMoves pokemonMoves={moves} method={'egg'} />
                            </TabPane>
                            <TabPane tabId="4">
                                <PokemonPageMoves pokemonMoves={moves} method={'tutor'} />
                            </TabPane>
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

                <PokemonPageNextPrevious pokemonId={pokemonInfo[0].id} pokemonName={pokemonName} />
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        pokemonInfo: state.apiCalls.apiData.getPokemon,
        pokemonEvChainInfo: state.apiCalls.apiData.getEvChain,
        profilePokemonTeam: state.firebase.profile.favoriteTeam,
        profilePokemonFavorites: state.firebase.profile.favoritePokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavoritePokemon: (pokemon) => dispatch(addFavoritePokemon(pokemon)),
        removeFavoritePokemon: (pokemon) => dispatch(removeFavoritePokemon(pokemon)),
        addPokemonToTeam: (pokemon) => dispatch(addPokemonToTeam(pokemon)),
        removePokemonFromTeam: (pokemon) => dispatch(removePokemonFromTeam(pokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);