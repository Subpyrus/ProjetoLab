import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
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
        console.log(this.props)
        const { authError, auth } = this.props

        if(auth.uid){
            return <Redirect to='/' />
        }

        return (
            <Row className='d-flex justify-content-center align-items-center' >
                <Col xs='10' lg='8' className='text-center'>
                    <h1>Sign In</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Button block>Submit</Button>
                        </FormGroup>
                        <p>Need an account? <Link to='/sign-up' className='basicLink'>Sign Up</Link></p>
                        <div>
                            {authError ? <p>{authError}</p> : null}
                        </div>
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
