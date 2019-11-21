import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Loading = (props) => {
    return (
        <Container style={{ minHeight: "68vh" }}>
            <Row className='d-flex justify-content-center align-items-center'>
                <p>Loading</p>
            </Row>
        </Container>
    )
}

export default Loading;