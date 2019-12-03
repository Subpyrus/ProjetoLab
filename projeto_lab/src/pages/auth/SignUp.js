import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input, CustomInput } from 'reactstrap';
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
            gender: 'female',
            avatar: '',
            reEnterPassword: '',
            errors: {
                username: '',
                email: '',
                password: '',
                reEnterPassword: '',
                gender: '',
                avatar: 'You must choose an avatar before you continue!'
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
                password: this.state.password,
                gender: this.state.gender,
                avatar: this.state.avatar
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

    handleAvatarChange = (event) => {
        let errors = this.state.errors;
        errors.avatar = '';
        this.setState({
            avatar: event
        })
    }

    handleGenderChange = (event) => {
        this.setState({
            gender: event.target.id
        });
    }

    render() {
        const { errors, gender } = this.state;
        const { auth, authError } = this.props

        const femaleAvatars = ['acetrainerf', 'lady', 'lass', 'idol', 'battlegirl', 'cowgirl']
        const maleAvatars = ['acetrainerm', 'richboy', 'ruinmaniac', 'blackbelt', 'roughneck', 'bugcatcher']

        if (auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs='12' md='10' className='text-center'>
                    <h1>Sign Up</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <FormGroup className='col-12 col-md-6'>
                                <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="email address" />
                                {errors.email.length > 0 &&
                                    <span className='error'>{errors.email}</span>}
                            </FormGroup>
                            <FormGroup className='col-12 col-md-6'>
                                <Input onChange={this.handleChange} type="text" name="username" id="username" placeholder="username" />
                                {errors.username.length > 0 &&
                                    <span className='error'>{errors.username}</span>}
                            </FormGroup>
                            <FormGroup className='col-12 col-md-6'>
                                <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
                                {errors.password.length > 0 &&
                                    <span className='error'>{errors.password}</span>}
                            </FormGroup>
                            <FormGroup className='col-12 col-md-6'>
                                <Input onChange={this.handleChange} type="password" name="reEnterPassword" id="reEnterPassword" placeholder="re-enter password" />
                                {errors.reEnterPassword.length > 0 &&
                                    <span className='error'>{errors.reEnterPassword}</span>}
                            </FormGroup>
                        </Row>
                        <FormGroup>
                            <h3 className='pt-2'>Gender</h3>
                            <div>
                                <CustomInput checked={this.state.gender === "female"}
                                    onChange={this.handleGenderChange} type="radio" id="female" name="female" label="Female" inline />
                                <CustomInput checked={this.state.gender === "male"}
                                    onChange={this.handleGenderChange} type="radio" id="male" name="male" label="Male" inline />
                            </div>
                        </FormGroup>
                        <FormGroup className='pb-3'>
                            <h4>Avatar</h4>
                            {gender === 'female' ? (
                                <Row>
                                    {femaleAvatars.map((item, key) =>
                                        <Col className='p-1' sm='4' md='2' key={key} onClick={() => { this.handleAvatarChange(item) }}>
                                            <img alt={item} className={this.state.avatar === item ? 'active-avatar pb-2' : 'avatar pb-2'} src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />

                                        </Col>

                                    )}
                                    <span className='error'>{errors.avatar}</span>
                                </Row>
                            ) : (
                                    <Row>
                                        {maleAvatars.map((item, key) =>
                                            <Col className='p-1' sm='4' md='2' key={key} onClick={() => { this.handleAvatarChange(item) }}>
                                                <img alt={item} className={this.state.avatar === item ? 'active-avatar pb-2' : 'avatar pb-2'} src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />

                                            </Col>

                                        )}
                                        <span className='error'>{errors.avatar}</span>
                                    </Row>
                                )}
                        </FormGroup>

                        <Button block>Submit</Button>
                        {authError ? <p>{authError}</p> : null}
                    </Form>
                </Col>
            </Row >
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