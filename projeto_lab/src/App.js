import './App.scss';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
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

  render() {
    const { getPokedex } = this.state;
    const { error, isLoading, profile, profileContent, auth } = this.props;

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
          <NavigationBar getPokedex={this.getPokedex} />
          <AbsoluteWrapper>
            <Layout>
              {isLoading ? (<Loading height={'68vh'} />) :
                error ? (<Error error={this.state.error} />) :
                  (
                    <AnimatedRoute>
                      {location => (
                        <Switch location={location}>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/pokemon-list/:generation" render=
                            {(props) => (
                              <PokemonList {...props} functionClick={this.handleSearchClick} functionEnter={this.handleSearchEnter} functionChange={this.handleSearchChange} getPokemonVideo={this.getPokemonVideo} />
                            )} />
                          <Route exact path="/pokemon-list/:generation/pokemon-page/:pokemon" component={PokemonPage} />
                          <Route exact path="/pokemon-trivia" component={Trivia} />
                          <Route exact path="/pokemon-trainers" component={PokemonTrainers}
                          />
                          <Route exact path="/pokemon-trainers/profile/:username" render={(props) =>
                            <Profile {...props} isLoggedIn={auth.uid} profileContent={profileContent} />}
                          />
                          <Route exact path="/profile/:username" render={(props) =>
                            <Profile {...props} isLoggedIn={auth.uid} profileContent={profileContent} />}
                          />
                          <Route exact path="/sign-up" component={SignUp} />
                          <Route exact path="/sign-in" component={SignIn} />
                          <Route component={NoMatch} />
                        </Switch>
                      )}
                    </AnimatedRoute>)}
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
    error: state.apiCalls.error,
    isLoading: state.apiCalls.isLoading,
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