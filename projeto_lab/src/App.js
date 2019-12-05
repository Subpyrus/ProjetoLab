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
import PokemonTrainers from './pages/PokemonTrainers';
import Trivia from "./pages/PokemonTrivia";
import Profile from './pages/Profile';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Loading from './components/layout/Loading';
import Error from './components/layout/Error';
import NoMatch from './components/layout/NoMatch';
import ScrollToTop from './components/layout/ScrollToTop';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

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
      getCountries: [],
      loading: false,
      error: null,
      inputValue: '',
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

  getCountriesInfo = () => {
    this.setState({ loading: true });
    var url = `https://restcountries.eu/rest/v2/region/europe?fields=name`

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      this.setState({ getCountries : data, loading: false });
    }

    const handleError = (error) => {
      this.setState({ error: error });
    }

    fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }

  render() {
    const { error, loading } = this.state;
    const { profile } = this.props;

    if (!profile) {
      return (
        <Router>
          <AbsoluteWrapper>
            <Layout>
              <Loading height={'100vh'} />
            </Layout>
          </AbsoluteWrapper>
        </Router>
      )
    } else {
      return (
        <Router>
          <ScrollToTop />
          <NavigationBar nationality={this.getCountriesInfo} getPokedex={this.getPokedex} />
          <AbsoluteWrapper>
            <Layout>
              {loading ? (<Loading height={'68vh'} />) :
                error ? (<Error error={this.state.error} />) :
                  (
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
                          <Route exact path="/pokemon-trivia" render={(props) => (<Trivia {...props} />)} />
                          <Route exact path="/pokemon-trainers" render={(props) =>
                            <PokemonTrainers auth={this.props.auth} username={this.props.profileContent.username} users={this.props.users} />}
                          />
                          <Route exact path="/pokemon-trainers/profile/:username" render={(props) =>
                            <Profile {...props} isLoggedIn={this.props.isLoggedIn} profileContent={this.props.profileContent} />}
                          />
                          <Route exact path="/profile/:username" render={(props) =>
                            <Profile {...props} profileContent={this.props.profileContent} isLoggedIn={this.props.isLoggedIn} />}
                          />
                          <Route exact path="/sign-up" render={(props) => <SignUp countriesData={this.state.getCountries} />} />
                          <Route exact path="/sign-in" render={(props) => <SignIn />} />
                          <Route render={(props) => <NoMatch />} />
                        </Switch>
                      )}
                    </AnimatedRoute>
                  )}
            </Layout>
            <Footer />
          </AbsoluteWrapper>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    auth: state.firebase.auth,
    authError: state.authError,
    profile: state.firebase.profile.isLoaded,
    profileContent: state.firebase.profile,
    users: state.firestore.ordered.users
  }
}

export default compose(
  firestoreConnect([
    { collection: 'users' }
  ]),
  connect(mapStateToProps)
)(App)