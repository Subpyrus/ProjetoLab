import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition, animated } from 'react-spring/renderprops';
import Layout from "./components/layout/Layout";
import AbsoluteWrapper from './components/layout/AbsoluteWrapper';
import NavigationBar from "./components/layout/navbar/Navbar";
import Home from './pages/Home'
import PokemonList from "./pages/PokemonList";
import PokemonPage from "./pages/PokemonPage";
import PokemonTrainers from './pages/PokemonTrainers';
import Trivia from "./pages/PokemonTrivia";
import Profile from './pages/Profile';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import RecoverPassword from './pages/auth/RecoverPassword';
import Loading from './components/layout/Loading';
import Error from './components/layout/Error';
import NoMatch from './components/layout/NoMatch';
import ScrollToTop from './components/layout/ScrollToTop';
import { connect } from 'react-redux';
import AlertComponent from './components/layout/Alert';

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

class App extends Component {

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { errorApi, isLoading, profile, profileContent, auth, authNotifications } = this.props;

    if (!profile) {
      return (
        <Router>
          <AbsoluteWrapper>
            <Layout>
              <Loading height={'90vh'} />
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
              {authNotifications &&
                <AlertComponent message={authNotifications[0]} typeAlert={authNotifications[1]} />}
              {isLoading ? (<Loading height={'65vh'} />) :
                errorApi ? (<Error error={errorApi} />) :
                  (
                    <AnimatedRoute>
                      {location => (
                        <Switch location={location}>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/pokemon-list/:search" component={PokemonList} />
                          <Route exact path="/pokemon-list/:search/pokemon-page/:pokemon" component={PokemonPage} />
                          <Route exact path="/pokemon-trivia" component={Trivia} />
                          <Route exact path="/pokemon-trainers" render={(props) =>
                            <PokemonTrainers {...props} auth={auth.uid} profileContent={profileContent} />}
                          />
                          />
                          <Route exact path="/pokemon-trainers/profile/:username" render={(props) =>
                            <Profile {...props} isLoggedIn={auth.uid} profileContent={profileContent} />}
                          />
                          <Route exact path="/profile/:username" render={(props) =>
                            <Profile {...props} isLoggedIn={auth.uid} profileContent={profileContent} />}
                          />
                          <Route exact path="/sign-up" component={SignUp} />
                          <Route exact path="/sign-in" component={SignIn} />
                          <Route exact path="/sign-in/recover-password" component={RecoverPassword} />
                          <Route component={NoMatch} />
                        </Switch>
                      )}
                    </AnimatedRoute>)}
            </Layout>
          </AbsoluteWrapper>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    errorApi: state.apiCalls.error,
    isLoading: state.apiCalls.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    auth: state.firebase.auth,
    authNotifications: state.auth.actionAuthFeedback,
    profile: state.firebase.profile.isLoaded,
    profileContent: state.firebase.profile
  }
}

export default connect(mapStateToProps)(App)