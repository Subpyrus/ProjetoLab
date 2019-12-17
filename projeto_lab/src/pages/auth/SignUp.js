import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import SelectStyles from '../../components/layout/SelectStyles'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { getSignUpData } from '../../store/actions/apiActions';

const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            selectGender: '',
            selectNationality: '',
            avatar: '',
            reEnterPassword: '',
            game: '',
            region: '',
            showErrors: false,
            errors: {
                username: '',
                email: '',
                password: '',
                reEnterPassword: '',
                selectGender: 'You must choose a gender!',
                selectNationality: 'You must choose a nationality!',
                avatar: 'You must choose an avatar!',
                game: 'You must choose a favorite game!',
                region: 'You must choose a favorite region!'
            }
        }
    }

    componentDidMount() {
        if (!this.props.signUpData) {
            this.props.getSignUpData();
        }
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
        if (this.validateForm(this.state.errors)) {
            let informationForUser = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                gender: this.state.selectGender,
                nationality: this.state.selectNationality,
                avatar: this.state.avatar,
                favoriteGame: this.state.game,
                favoriteRegion: this.state.region
            }
            this.props.signUp(informationForUser)
        } else {
            this.setState({
                showErrors: true
            })
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

    handleSelectChange = (value, action) => {
        let errors = this.state.errors;
        errors[action.name] = '';
        this.setState({ [action.name]: value.value });
    }

    render() {
        var string = require('lodash/string')
        const { errors, selectGender, showErrors } = this.state;
        const { auth, authError, signUpData } = this.props

        const optionsNationality = []
        const optionsGender = [
            { value: 'Female', label: 'Female' },
            { value: 'Male', label: 'Male' }
        ];
        const optionsGame = [];
        const optionsRegion = [];

        for (let item of signUpData[0]) {
            optionsNationality.push({ value: item.name, label: item.name })
        }

        for (let item of signUpData[1].results) {
            optionsGame.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
        }

        for (let item of signUpData[2].results) {
            optionsRegion.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
        }

        const femaleAvatars = ['acetrainerf', 'lady', 'lass', 'idol', 'battlegirl', 'cowgirl']
        const maleAvatars = ['acetrainerm', 'richboy', 'ruinmaniac', 'blackbelt', 'roughneck', 'bugcatcher']

        if (auth.uid) {
            return <Redirect to='/' />
        } else {
            return (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col xs='12' md='10' className='text-center'>
                        <h1>Sign Up</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <FormGroup className='col-12 col-md-6'>
                                    <Input required onChange={this.handleChange} type="email" name="email" id="email" placeholder="email address" />
                                    {errors.email.length > 0 &&
                                        <span className='error'>{errors.email}</span>}
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Input required onChange={this.handleChange} type="text" name="username" id="username" placeholder="username" />
                                    {errors.username.length > 0 &&
                                        <span className='error'>{errors.username}</span>}
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Input required onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
                                    {errors.password.length > 0 &&
                                        <span className='error'>{errors.password}</span>}
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Input required onChange={this.handleChange} type="password" name="reEnterPassword" id="reEnterPassword" placeholder="re-enter password" />
                                    {errors.reEnterPassword.length > 0 &&
                                        <span className='error'>{errors.reEnterPassword}</span>}
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Select required
                                        name='selectGender'
                                        styles={SelectStyles}
                                        value={this.selectGender}
                                        onChange={this.handleSelectChange}
                                        options={optionsGender}
                                        placeholder='select your gender'
                                        isSearchable={false}
                                    />
                                    {showErrors &&
                                        <span className='col-12 error text-center'>{errors.selectGender}</span>
                                    }
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Select required
                                        name='selectNationality'
                                        styles={SelectStyles}
                                        value={this.selectNationality}
                                        onChange={this.handleSelectChange}
                                        options={optionsNationality}
                                        placeholder='select your nationality'
                                        isSearchable={false}
                                    />
                                    {showErrors &&
                                        <span className='col-12 error text-center'>{errors.selectNationality}</span>
                                    }
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Select required
                                        name='game'
                                        styles={SelectStyles}
                                        value={this.game}
                                        onChange={this.handleSelectChange}
                                        options={optionsGame}
                                        placeholder='select your favorite pokémon game'
                                        isSearchable={false}
                                    />
                                    {showErrors &&
                                        <span className='col-12 error text-center'>{errors.game}</span>
                                    }
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6'>
                                    <Select required
                                        name='region'
                                        styles={SelectStyles}
                                        value={this.region}
                                        onChange={this.handleSelectChange}
                                        options={optionsRegion}
                                        placeholder='select your favorite pokémon region'
                                        isSearchable={false}
                                    />
                                    {showErrors &&
                                        <span className='col-12 error text-center'>{errors.region}</span>
                                    }
                                </FormGroup>
                            </Row>
                            <FormGroup className='py-3'>
                                <h4>Avatar</h4>
                                {selectGender === 'Female' ? (
                                    <Row>
                                        {femaleAvatars.map((item, key) =>
                                            <Col className='p-1' sm='4' md='2' key={key} onClick={() => { this.handleAvatarChange(item) }}>
                                                <img alt={item} className={this.state.avatar === item ? 'active-avatar pb-2' : 'avatar pb-2'} src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />
                                            </Col>)}
                                        {showErrors &&
                                            <span className='col-12 error text-center'>{errors.avatar}</span>
                                        }
                                    </Row>
                                ) : selectGender === 'Male' ? (
                                    <Row>
                                        {maleAvatars.map((item, key) =>
                                            <Col className='p-1' sm='4' md='2' key={key} onClick={() => { this.handleAvatarChange(item) }}>
                                                <img alt={item} className={this.state.avatar === item ? 'active-avatar pb-2' : 'avatar pb-2'} src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />
                                            </Col>)}
                                        {showErrors &&
                                            <span className='col-12 error text-center'>{errors.avatar}</span>
                                        }
                                    </Row>
                                ) : (
                                            <Row>
                                                <p className='col-12 text-center'>You must choose your gender first to visualize the available avatars.</p>
                                            </Row>)}
                            </FormGroup>
                            <Col xs='8' md='6' className='mx-auto'>
                                <Button color='warning' block>Submit</Button>
                            </Col>
                            {authError &&
                                <p className='col-12 text-center font-weight-bold'>{authError}</p>
                            }
                        </Form>
                    </Col>
                </Row >
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        getSignUpData: () => dispatch(getSignUpData())
    }
}

const mapStateToProps = (state) => {
    return {
        signUpData: state.apiCalls.apiData.signUpData,
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);