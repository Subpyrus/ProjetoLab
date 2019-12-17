import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input, CustomInput } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            rememberMe: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { auth } = this.props

        if (auth.uid) {
            return <Redirect to='/' />
        }

        return (
            <Row className='d-flex justify-content-center align-items-center' >
                <Col xs='10' lg='8' className='text-center'>
                    <h1>Sign In</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="type your e-mail" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="type your password" />
                        </FormGroup>
                        <FormGroup>
                            <CustomInput checked={this.state.rememberMe} onChange={(event) => this.setState({
                                [event.target.id]: !this.state.rememberMe
                            })} type="checkbox" id="rememberMe" label="Remember me" />
                        </FormGroup>
                        <FormGroup className='col-12 col-md-8 d-flex justify-content-center mx-auto'>
                            <Button color='warning' block>Sign In</Button>
                        </FormGroup>
                        <Row className='py-3'>
                            <Col xs='12' md='6'>
                                <p>Forgot your password? <Link to='/sign-in/recover-password' className='basicLink'>Click here</Link></p>
                            </Col>
                            <Col xs='12' md='6'>
                                <p color='#1688b9' disabled>Need an account? <Link to='/sign-up' className='basicLink'>Sign Up</Link></p>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
