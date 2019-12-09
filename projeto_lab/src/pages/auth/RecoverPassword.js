import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

class RecoverPassword extends Component {
    constructor() {
        this.state = {
            email: '',
            errors: {
                email: ''
            }
        }
    }

    handleSubmit = () => {
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {

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
    }

    render() {
        return (
            <Row className='d-flex justify-content-center align-items-center' >
                <Col xs='10' lg='8' className='text-center'>
                    <h1>Recover Password</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="type your e-mail" />
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Button color='warning' block>Submit</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default RecoverPassword;