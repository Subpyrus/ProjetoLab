import './App.scss';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition, animated } from 'react-spring/renderprops';
import Layout from "./components/layout/Layout";
import AbsoluteWrapper from './components/layout/AbsoluteWrapper';
import NavigationBar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/Footer";
import Home from './pages/Home'
import PokemonList from "./pages/PokemonList";
import PokemonPage from "./pages/PokemonPage";
import Trivia from "./pages/Trivia";
import Profile from './pages/Profile';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Loading from './components/layout/Loading';
import Error from './components/layout/Error';
import NoMatch from './components/layout/NoMatch';
import ScrollToTop from './components/layout/ScrollToTop';
import { connect } from 'react-redux';


const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ position: 'absolute', opacity: 0, minHeight: "65vh" }}
        enter={{ position: 'static', opacity: 1, minHeight: "65vh", display: 'block' }}
        leave={{ position: 'absolute', opacity: 0, minHeight: "0", display: 'none' }}>
        {location => style => <animated.div style={style}>{children(location)}</animated.div>}
      </Transition>
    )}
  />
)



class App extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      getPokemonSearch: [],
      getPokemon: [],
      getPokemonVideo: [],
      getPokedex: [],
      getTrivia: ['zxzxzxz'],
      loading: false,
      error: null,
      inputValue: 'asdsaasdasdd',
    }
  }

  componentDidMount() {
    /*const LocalStorageState = localStorage.getItem('state');
    console.log(LocalStorageState);
    if (LocalStorageState !== null || LocalStorageState !== undefined) {
      const parsedState = JSON.parse(LocalStorageState)
      this.setState({ ...parsedState });
    }

    const hello = () => {
      console.log(this.state)
      localStorage.clear();
      localStorage.setItem("state", JSON.stringify(this.state))
    }

    console.log(hello())

    window.addEventListener("beforeunload", hello)*/
    this._isMounted = true;
  }

  handleSearchChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      this.getInfoPokemonPage(this.state.inputValue)
      /*this.getPokemonVideo(this.state.inputValue)*/
    }
  }

  handleSearchClick = () => {
    this.getInfoPokemonPage(this.state.inputValue)
    /*this.getPokemonVideo(this.state.inputValue)*/
  }

  getInfoPokemonPage = (event) => {
    this.setState({ loading: true });
    var pokemon;
    if (event.currentTarget === undefined) {
      pokemon = event;
    } else {
      pokemon = event.currentTarget.text.toLowerCase();
    }
    const urls = [
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`/*,
      `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&type=video&maxResults=3&order=relevance&q=${pokemon}&key=AIzaSyAoOgGNUDdI0oGGAQLoJOgomd5NwjoFelE`*/
    ]

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      console.log(data)
      this.setState({ getPokemon: [data], loading: false });
    }

    const handleError = (error) => {
      console.log(error)
      this.setState({ error: error });
    }

    Promise.all(urls.map(url =>
      fetch(url).then(handleResponse))).then(handleData).catch(handleError)
  }

  getPokedex = (region) => {
    this.setState({ loading: true });
    var url = `https://pokeapi.co/api/v2/pokedex/${region}/`

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      this.setState({ getPokedex: data.pokemon_entries, loading: false });
    }

    const handleError = (error) => {
      this.setState({ error: error });
    }

    fetch(url).then(handleResponse)
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

  render() {
    const { error, loading } = this.state;
    const { auth, profile } = this.props;

    console.log(this.state)
    console.log(loading)

    if (!auth.isLoaded && !profile.isLoaded) {
      return (
        <Router>
          <ScrollToTop />
          <AbsoluteWrapper>
            <Layout>
              <Loading />
            </Layout>
          </AbsoluteWrapper>
        </Router>
      )
    } else {
      return (
        <Router>
          <ScrollToTop />
          <NavigationBar getPokedex={this.getPokedex} />
          <AbsoluteWrapper>
            <Layout>
              {loading ? (
                <Loading />
              ) : error ? (
                <Error>{error.message}</Error>
              ) : (
                    <AnimatedRoute>
                      {location => (
                        <Switch location={location}>
                          <Route exact path="/" render={(props) => (<Home {...props} />)} />
                          <Route exact path="/pokemon-list/:generation" render=
                            {(props) => (
                              <PokemonList {...props} functionClick={this.handleSearchClick} functionEnter={this.handleSearchEnter} functionChange={this.handleSearchChange} getPokemon={this.getInfoPokemonPage} pokedexInfo={this.state.getPokedex} getPokedex={this.getPokedex} getPokemonVideo={this.getPokemonVideo} />
                            )} />
                          <Route exact path="/pokemon-search/pokemon-page/:pokemon" render=
                            {(props) => (
                              <PokemonPage {...props} pokemonInfo={this.state.getPokemon} getPokemon={this.getInfoPokemonPage} />
                            )} />
                          <Route exact path="/pokemon-list/:generation/pokemon-page/:pokemon" render=
                            {(props) => (
                              <PokemonPage {...props} pokemonInfo={this.state.getPokemon} getPokemon={this.getInfoPokemonPage} />
                            )} />
                          <Route exact path="/trivia" render=
                            {(props) => (
                              <Trivia {...props} functionTrivia={this.getTriviaQuestions} triviaQuestion={this.state.getTrivia} />
                            )} />
                          <Route exact path="/profile/:username" render={(props) => <Profile {...props} />} />
                          <Route exact path="/sign-up" render={(props) => <SignUp />} />
                          <Route exact path="/sign-in" render={(props) => <SignIn />} />
                          <Route render={(props) => <NoMatch />} />
                        </Switch>
                      )}
                    </AnimatedRoute>
                  )
              }
            </Layout>
            <Footer />
          </AbsoluteWrapper>
        </Router>
      );
    }

  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile.isLoaded
  }
}

export default connect(mapStateToProps)(App)