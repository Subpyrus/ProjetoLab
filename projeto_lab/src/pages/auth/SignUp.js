import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input, CustomInput } from 'reactstrap';
import Select from 'react-select';
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
            selectedGender: 'select your gender',
            selectedNationality: 'select your nationality',
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
                gender: this.state.selectedGender,
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
        this.setState({ selectGender: event.value });
    }

    handleNationalityChange = (event) => {
        this.setState({ selectNationality: event.value });
    }

    render() {
        const { errors, gender } = this.state;
        const { auth, authError, countriesData } = this.props

        const optionsNationality = []
        const optionsGender = [
            { value: 'Female', label: 'Female' },
            { value: 'Male', label: 'Male' }
        ];

        for (let item in countriesData) {
            optionsNationality.push({ value: item.name, label: item.name })
        }

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? 'red' : 'white',
                backgroundColor: state.isSelected ? 'yellow' : 'blue',
                padding: 10,
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        }

        console.log(optionsNationality)

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
                            <FormGroup className='col-12 col-md-6'>
                                <Select
                                    styles={customStyles}
                                    value={this.selectedGender}
                                    onChange={this.handleGenderChange}
                                    options={optionsGender}
                                />
                            </FormGroup>
                            <FormGroup className='col-12 col-md-6'>
                                <Select
                                    styles={customStyles}
                                    value={this.selectedNationality}
                                    onChange={this.handleNationalityChange}
                                    options={optionsNationality}
                                />
                            </FormGroup>
                        </Row>
                        <FormGroup className='py-3'>
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
                                        <span className='error text-center'>{errors.avatar}</span>
                                    </Row>
                                )}
                        </FormGroup>
                        <Col xs='8' md='6' className='mx-auto'>
                            <Button color='warning' block>Submit</Button>
                        </Col>
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