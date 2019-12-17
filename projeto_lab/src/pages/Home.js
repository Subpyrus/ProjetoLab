import React from 'react';
import { connect } from 'react-redux';
import StaticHome from '../components/Home/StaticHome';
import UserHome from '../components/Home/UserHome';

const Home = (props) => {
    let { auth } = props
    return !auth.uid ? (<StaticHome />) : (<UserHome />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Home)