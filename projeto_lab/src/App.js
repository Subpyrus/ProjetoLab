import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition, animated } from 'react-spring/renderprops';
import Layout from "./components/layout/Layout";
import AbsoluteWrapper from './components/layout/AbsoluteWrapper';
import NavigationBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from './pages/Home'
import PokemonList from "./pages/PokemonList";
import PokemonSearch from "./pages/PokemonSearch";
import PokemonPage from "./pages/PokemonPage";
import Trivia from "./pages/Trivia";
import Loading from './components/layout/Loading';
import Error from './components/layout/Error';
import NoMatch from './components/layout/NoMatch';
import ScrollToTop from './components/layout/ScrollToTop'


const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ position: 'absolute', opacity: 0, minHeight: "65vh" }}
        enter={{ position: 'relative', opacity: 1, minHeight: "65vh" }}
        leave={{ position: 'absolute', opacity: 0, minHeight: "0" }}>
        {location => style => <animated.div style={style}>{children(location)}</animated.div>}
      </Transition>
    )}
  />
)

export default class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      getPokemonSearch: [],
      getPokemon: '',
      getPokemonVideo: '',
      getPokedex: [],
      getTrivia: [],
      loading: false,
      error: null,
      inputValue: '',
      isLoggedIn: false
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearchChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      this.getPokemon(this.state.inputValue)
      /*this.getPokemonVideo(this.state.inputValue)*/
    }
  }

  handleSearchClick = () => {
    this.getPokemon(this.state.inputValue)
    /*this.getPokemonVideo(this.state.inputValue)*/
  }

  getPokedex = async () => {
    this.setState({ loading: true });
    var url = `https://pokeapi.co/api/v2/pokedex/national/`

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      console.log(data)
      this.setState({ getPokedex: data.pokemon_entries, loading: false });
    }

    const handleError = (error) => {
      this.setState({ error: error });
    }

    await fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }

  getPokemon = async (pokemon) => {
    this.setState({ loading: true });
    console.log(pokemon)
    var url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    console.log(url)

    // Make the HTTP Api request

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      console.log(typeof data);
      this.setState({ getPokemonSearch: [data], loading: false });
    }

    const handleError = (error) => {
      this.setState({ error: error });
      console.error(error);
    }

    await fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }

  getTriviaQuestions = async (difficulty) => {
    this.setState({ loading: true });
    var url = `https://opentdb.com/api.php?amount=10&category=15&difficulty=${difficulty}&type=multiple`

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      this.setState({ getTrivia: data, loading: false });
      console.log(data);
    }

    const handleError = (error) => {
      this.setState({ error: error, loading: false });
      console.error(error);
    }

    await fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }

  getPokemonVideo = async (pokemon) => {
    this.setState({ loading: true });
    var url = `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&type=video&maxResults=3&order=relevance&q=${pokemon}&key=AIzaSyAoOgGNUDdI0oGGAQLoJOgomd5NwjoFelE`;

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      this.setState({ getPokemonVideo: data, loading: false });
      console.log(data);
    }

    const handleError = (error) => {
      this.setState({ error: error });
      console.error(error);
    }

    await fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }

  render() {
    const { error, loading, isLoggedIn } = this.state;
    let content;

    if (error) {
      content = <Error>{error.message}</Error>
    } else if (loading === true) {
      content = <Loading />
    } else {
      content =
        <AnimatedRoute>
          {location => (
            <Switch location={location}>
              <Route exact path="/" render={(props) => (<Home {...props} />)} />
              <Route exact path="/pokemon-search" render=
                {(props) => (
                  <PokemonSearch {...props} functionClick={this.handleSearchClick} functionEnter={this.handleSearchEnter} functionChange={this.handleSearchChange} pokemonList={this.state.getPokemonSearch} />
                )} />
              <Route exact path="/pokemon-list/:generation" render=
                {(props) => (
                  <PokemonList {...props} getPokemon={this.getPokemon} pokedexInfo={this.state.getPokedex} getPokedex={this.getPokedex} getPokemonVideo={this.getPokemonVideo} />
                )} />
              <Route exact path="/pokemon-search/pokemon-page/:pokemon" render=
                {(props) => (
                  <PokemonPage {...props} pokemonInfo={this.state.getPokemonSearch} pokemonVideos={this.state.getPokemonVideo} getPokemon={this.getPokemon} getPokemonVideo={this.getPokemonVideo} />
                )} />
              <Route exact path="/pokemon-list/:generation/pokemon-page/:pokemon" render=
                {(props) => (
                  <PokemonPage {...props} pokemonInfo={this.state.getPokemonSearch} pokemonVideos={this.state.getPokemonVideo} getPokemon={this.getPokemon} getPokemonVideo={this.getPokemonVideo} />
                )} />
              <Route exact path="/trivia" render=
                {(props) => (
                  <Trivia {...props} functionTrivia={this.getTriviaQuestions} triviaQuestion={this.state.getTrivia} />
                )} />
              <Route render={(props) => <NoMatch />} />
            </Switch>
          )}
        </AnimatedRoute>
    }

    return (
      <Router>
        <ScrollToTop />
        <NavigationBar getPokedex={this.getPokedex} LoggedIn={isLoggedIn} />
        <AbsoluteWrapper>
          <Layout>
            {content}
          </Layout>
          <Footer />
        </AbsoluteWrapper>
      </Router>
    );
  }
}