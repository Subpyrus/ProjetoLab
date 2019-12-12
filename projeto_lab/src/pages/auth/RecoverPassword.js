import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { recoverPassword } from '../../store/actions/authActions'

class RecoverPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            visible: true,
            errors: {
                email: ''
            }
        }
    }

    onDismiss = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => console.log(val.length > 0 && (valid = false))
        );
        return valid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { recoverPassword } = this.props;
        if (this.validateForm(this.state.errors)) {
            recoverPassword(this.state.email);
            if (!this.state.visible) {
                this.onDismiss();
            }
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const { value } = event.target;
        let errors = this.state.errors;
        if (validEmailRegex.test(value)) {
            errors.email = '';
        } else {
            errors.email = 'Email is not valid.';
        }
        this.setState({ email: value })
    }

    render() {
        const { errors, visible } = this.state
        const { feedbackMessage } = this.props
        return (
            <Row className='d-flex justify-content-center align-items-center' >
                <Col xs='10' lg='7' className='text-center'>
                    <h1>Recover Password</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="type your e-mail" />
                            {errors.email && <span className='error'>{errors.email}</span>}
                            {feedbackMessage &&
                                feedbackMessage === "Reset password email sent. Go check your inbox." ?
                                (<Alert color='success' isOpen={visible} toggle={this.onDismiss} className='my-3'>{feedbackMessage}</Alert>) :
                                (<Alert color='danger' isOpen={visible} toggle={this.onDismiss} className='my-3'>{feedbackMessage}</Alert>)}
                        </FormGroup>
                        <FormGroup className='d-flex justify-content-center pt-2'>
                            <Button color='warning w-50' block>Submit</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feedbackMessage: state.auth.recoverPasswordMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recoverPassword: (email) => dispatch(recoverPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);