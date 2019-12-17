import React, { Component } from 'react';
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PokemonPageImages from '../components/pokemonPage/pokemonPageImages';
import PokemonPageMoves from '../components/pokemonPage/pokemonPageMoves';
import PokemonPageGenericInfo from '../components/pokemonPage/pokemonPageGenericInfo';
import PokemonPageEvChain from '../components/pokemonPage/pokemonPageEvChain';
import PokemonPageNextPrevious from '../components/pokemonPage/pokemonPageNextPrevious';
import { addFavoritePokemon, removeFavoritePokemon, addPokemonToTeam, removePokemonFromTeam } from '../store/actions/favoriteActions';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import YouTube from 'react-youtube';

class PokePage extends Component {
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

    _onReady(event) {
        event.target.pauseVideo();
    }

    render() {
        const { auth, removePokemonFromTeam, addPokemonToTeam, removeFavoritePokemon, addFavoritePokemon, pokemonInfo, pokemonEvChainInfo, pokemonVideos, errorPokemonVideos } = this.props;
        const { moves, stats, id } = this.props.pokemonInfo[0];
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

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1,
                slidesToSlide: 1
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1
            },
        };
        
        return (
            <Row className="justify-content-center">
                <Col xs='12' className='pb-4'>
                    <Row>
                        <Col xs='12' lg={auth.uid ? ('6') : ('12')}>
                            <h1 style={{ paddingBottom: '0.80rem' }} className={auth.uid ? ('text-lg-left text-center') : ('text-center')}>
                                <img alt={`${pokemonName}Miniature`} src={`http://www.pokestadium.com/assets/img/sprites/misc/icons/${this.props.match.params.pokemon}.png`} />
                                {pokemonName}
                                <span style={{ fontSize: '55%' }}> {genera[2].genus}</span>
                            </h1>
                        </Col>
                        {auth.uid &&
                            <Col xs='12' lg='6'>
                                <Row className='justify-content-lg-end align-items-md-center justify-content-center h-100'>
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
                                        (<Button className='my-2 my-lg-0 mx-2'
                                            onClick={() => {
                                                removeFavoritePokemon(pokemonName);
                                            }}
                                            color="danger">Remove From Favorites</Button>
                                        ) : profilePokemonFavorites.length === 50 ?
                                            (<Button className='my-2 my-lg-0 mx-2' color="warning" disabled>Your Favorites are Full</Button>) :
                                            (<Button className='my-2 my-lg-0 mx-2'
                                                onClick={() => {
                                                    addFavoritePokemon([pokemonName, stats]);
                                                }}
                                                color="warning">Add to Favorites</Button>
                                            )
                                    }
                                </Row>
                            </Col>
                        }
                        <Col xs='12'>
                            <h6 className={auth.uid ? ('col-12 text-center text-lg-left pt-3 pt-lg-0') : ('col-12 text-center')}>
                                {Array.from(uniqueNames).map((uniqueNameItem, key) => <span key={key} className='p-2'>{uniqueNameItem}</span>)}
                            </h6>
                        </Col>
                    </Row>
                </Col>

                <PokemonPageImages name={pokemonName} />

                <PokemonPageGenericInfo info={pokemonInfo} />

                <Col xs='12' md='6' lg='5' className='py-4 py-lg-5'>
                    <Row>
                        <h3 className='col-12 text-center'>Description</h3>
                        <Col xs='12'>
                            {flavor_text_entries.map((item, key) => {
                                return <React.Fragment key={key}>
                                    {(item.language.name === 'en' && item.version.name === 'ultra-sun') && <p key={key}>{item.flavor_text}</p>}
                                    {(item.language.name === 'en' && item.version.name === 'alpha-sapphire') && <p key={key}>{item.flavor_text}</p>}
                                </React.Fragment>
                            })}
                        </Col>
                    </Row>
                </Col>

                <Col xs='12' md='6' lg='6' className='py-4 py-lg-5 offset-lg-1'>
                    <Row>
                        <h3 className='col-12 text-center'>Stats</h3>
                        {stats.map((statsItem, key) =>
                            <Col key={key} xs='6' sm='6' md='4' lg='2'>
                                <Row className='d-flex text-center align-items-center justify-content-center h-100'>
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


                <Col xs="12" className='mb-4'>
                    <h3 className='col-12 text-center'>Videos</h3>
                    {errorPokemonVideos && <p>{errorPokemonVideos}</p>}
                    {pokemonVideos &&
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            responsive={responsive}
                            infinite={true}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {pokemonVideos.map((videoItem, key) =>
                                <div className='text-center' key={key}>
                                    <YouTube
                                        videoId={videoItem.id.videoId}
                                        opts={{
                                            height: '360',
                                            width: '600',
                                        }}
                                        onReady={this._onReady}
                                    />
                                </div>
                            )}
                        </Carousel>}
                </Col>

                <PokemonPageNextPrevious pokemonId={pokemonInfo[0].id} pokemonName={pokemonName} />
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        pokemonInfo: state.apiCalls.apiData.getPokemon,
        pokemonVideos: state.apiCalls.apiData.getPokemonVideos,
        errorPokemonVideos: state.apiCalls.errorYtData,
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