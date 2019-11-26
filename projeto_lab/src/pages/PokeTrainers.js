import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PokeTrainers = (props) => {

    const { auth } = props

    if (!auth.uid) {
        return <Redirect to='/sign-in' />
    }

    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PokeTrainers)
