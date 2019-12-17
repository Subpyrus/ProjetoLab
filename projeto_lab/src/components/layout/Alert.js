import React from 'react';
import { Alert } from 'reactstrap';
import { removeNotification } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const AlertComponent = (props) => {
    const { message, typeAlert, removeNotification } = props

    setTimeout(() => {
        removeNotification();
    }, 4000)

    return (
        <Alert color={typeAlert} className='text-center font-weight-bold'>
            {message}
        </Alert>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification: (pokemon) => dispatch(removeNotification(pokemon)),
    }
}

export default connect(null, mapDispatchToProps)(AlertComponent);
