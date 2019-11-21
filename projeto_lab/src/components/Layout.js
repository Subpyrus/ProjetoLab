import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = (props) => {
    return (
    <Container>
        <Row className="justify-content-center" style={{minHeight:'70vh'}}>
            <Col xs="12">
                {props.children}
            </Col>
        </Row>
    </Container>
  )
}

export default Layout;