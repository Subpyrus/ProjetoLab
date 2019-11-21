import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <Container>
            <Row className="mt-4 p-2 justify-content-center">
                <Col xs="12">
                    <p className="text-center small">pokémon footer</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;