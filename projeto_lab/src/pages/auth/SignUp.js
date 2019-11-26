import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);


class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            reEnterPassword: '',
            errors: {
                username: '',
                email: '',
                password: '',
                reEnterPassword: ''
            }
        }
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {
            let informationForUser = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
            this.props.signUp(informationForUser)
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                if (validEmailRegex.test(value)) {
                    errors.email = '';
                } else {
                    errors.email = 'Email is not valid.';
                }
                break;
            case 'username':
                if (value.length < 5) {
                    errors.username = 'Username must be 5 characters long.';
                } else {
                    errors.username = '';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    errors.password = 'Password must be 8 characters long.';
                } else {
                    errors.password = '';
                }
                break;
            case 'reEnterPassword':
                if (value !== this.state.password) {
                    errors.reEnterPassword = 'Passwords must the same.';
                } else {
                    errors.reEnterPassword = '';
                }
                break;
            default:
                break;
        }

        this.setState({
            [event.target.id]: event.target.value,
            errors, [name]: value
        })
    }

    render() {
        const { errors } = this.state;
        const { auth, authError } = this.props

        if (auth.uid) {
            return <Redirect to='/' />
        }

        console.log(errors)

        return (
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs='10' lg='8' className='text-center'>
                    <h1>Sign Up</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="email address" />
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="text" name="username" id="username" placeholder="username" />
                            {errors.username.length > 0 &&
                                <span className='error'>{errors.username}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="password" name="reEnterPassword" id="reEnterPassword" placeholder="re-enter password" />
                            {errors.reEnterPassword.length > 0 &&
                                <span className='error'>{errors.reEnterPassword}</span>}
                        </FormGroup>
                        <Button block>Submit</Button>
                        {authError ? <p>{authError}</p> : null}
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);