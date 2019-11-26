import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Loading from '../components/layout/Loading';
import PokemonPageImages from '../components/pokemonPage/pokemonPageImages';
import PokemonPageMoves from '../components/pokemonPage/pokemonPageMoves';
import PokemonPageGenericInfo from '../components/pokemonPage/pokemonPageGenericInfo';
import PokemonPageEvChain from '../components/pokemonPage/pokemonPageEvChain';
/*import LazyLoad from 'react-lazyload';
import Slider from "react-slick";
import YouTube from 'react-youtube';*/

class PokePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            generation: '',
            modal: false,
            evolutionChain: [],
            activeTab: '1',
        }
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
            this.setState({ evolutionChain: data });
        }

        const handleError = (error) => {
            this.setState({ error: error });
        }

        fetch(url).then(handleResponse)
            .then(handleData)
            .catch(handleError);
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
        const { auth } = this.props;

        if (props.pokemonInfo.length === 0) {
            props.getPokemon(props.match.params.pokemon);
            return (
                <Loading></Loading>
            )
        } else {
            let { id, moves, stats } = props.pokemonInfo[0][0];
            let { genera, names, flavor_text_entries, evolution_chain } = props.pokemonInfo[0][1];



            let pokemon = require('pokemon');
            let pokemonName = pokemon.getName(props.pokemonInfo[0][0].id)
            let pokemonIds = [];
            var pokemonNextName,
                pokemonPreviousName;
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

            if (id === 1) {
                pokemonIds.push(id += 1)
                pokemonNextName = pokemon.getName(`${pokemonIds[0]}`)
            } else if (id === 808) {
                pokemonIds.push(id -= 1)
                pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
            } else {
                pokemonIds.push(id -= 1)
                pokemonIds.push(id += 2)
                pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
                pokemonNextName = pokemon.getName(`${pokemonIds[1]}`)
            }

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
                <Container>
                    <Row className="justify-content-center">

                        <Col xs='12' className='pb-4'>
                            <Row>
                                <Col xs='12' lg='8'>
                                    <h1>
                                        <img alt={`${pokemon.getName(props.pokemonInfo[0][0].id)}Miniature`} src={`http://www.pokestadium.com/assets/img/sprites/misc/icons/${props.match.params.pokemon}.png`} />
                                        {pokemon.getName(props.pokemonInfo[0][0].id)}
                                        <span style={{ fontSize: '55%' }}> {genera[2].genus}</span>
                                    </h1>
                                </Col>
                                {auth.uid &&
                                    <Col xs='12' lg='4'>
                                        <Row className='d-flex justify-content-end'>
                                            <Button>Add to Favorites</Button>
                                            <Button>Add to Team</Button>
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

                        <Col xs='12' className='pb-4'>
                            <Row>
                                <h3 className='col-12 text-center'>Description</h3>
                                <Col xs='12'>
                                    {Array.from(descriptions).map((descriptionItem, key) =>
                                        <p key={key}>{descriptionItem}{generations[key]}{generations[key += 1]}</p>
                                    )}
                                </Col>
                            </Row>
                        </Col>

                        <Col xs='12' className='pb-4'>
                            <Row>
                                <h3 className='col-12 text-center'>Stats</h3>
                                <Table borderless className='text-center'>
                                    <thead>
                                        <tr>
                                            {stats.map((statsItem, key) =>
                                                <th key={key}>{statsItem.stat.name}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            {stats.map((statsItem, key) =>
                                                <td key={key}>{statsItem.base_stat}</td>
                                            )}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                        </Col>

                        <PokemonPageEvChain EvChainURL={evolution_chain.url} />

                        <Col xs='12'>
                            <h3 className='col-12 text-center'>Moves</h3>
                            <div>
                                <Nav pills className='d-flex justify-content-center'>
                                    <NavItem className='col-12 col-md-3 p-0'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Level-Up Moves
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className='col-12 col-md-3 p-0'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            TMs/HMs Moves
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className='col-12 col-md-3 p-0'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            Egg Moves
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className='col-12 col-md-3 p-0'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '4' })}
                                            onClick={() => { this.toggle('4'); }}
                                        >
                                            Tutor Moves
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={'gold-silver'} method={'level-up'} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={'gold-silver'} method={'machine'} />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={'gold-silver'} method={'egg'} />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <PokemonPageMoves getMoveInfo={this.getMove} pokemonMoves={moves} generation={'gold-silver'} method={'tutor'} />
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
                        <Col xs="12">
                            <Row className="justify-content-between align-items-center">
                                <Col xs="12" md='6' className='text-left'>
                                    {props.pokemonInfo[0].id <= 808 && props.pokemonInfo[0].id !== 1 &&
                                        <Row className='justify-content-between align-items-center'>
                                            <Col xs='2'>

                                            </Col>
                                            <Col xs='10'>
                                                <img className='img-fluid' alt={pokemonPreviousName} src={`http://www.pokestadium.com/sprites/xy/${pokemonPreviousName.toLowerCase()}.gif`} />
                                                <Link className='basicLink' id={pokemonPreviousName.toLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonPreviousName}`} onClick={(event) => {
                                                    props.getPokemon(event.currentTarget.id);
                                                }}>
                                                    {pokemonPreviousName}
                                                </Link>
                                            </Col>
                                        </Row>
                                    }
                                </Col>
                                <Col xs="12" md="6" lg="2" className='text-right'>
                                    {props.pokemonInfo[0].id >= 1 && props.pokemonInfo[0].id !== 808 &&
                                        <Link className='basicLink' id={pokemonNextName.toLowerCase()} to={`/pokemon-list/pokemon-page/${pokemonNextName.toLowerCase()}`} onClick={(event) => {
                                            props.getPokemon(event.currentTarget.id);
                                        }}>
                                            <Row className='justify-content-between align-items-center'>
                                                <Col xs='10' className='text-right'>
                                                    <img className='img-fluid' alt={pokemonNextName} src={`http://www.pokestadium.com/sprites/xy/${pokemonNextName.toLowerCase()}.gif`} />
                                                    <p className='d-inline d-md-block text-center'>
                                                        {pokemonNextName}
                                                    </p>
                                                </Col>
                                                <Col xs='2'>

                                                </Col>
                                            </Row>
                                        </Link>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container >
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (favorite) => dispatch(createFavorite(favorite))
    }
}

<Button color="danger" onClick={this.toggle}>Test</Button>
    <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>*/

export default connect(mapStateToProps)(PokePage);