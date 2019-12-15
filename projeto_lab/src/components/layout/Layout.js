import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = (props) => {
    return (
    <Container className='pb-4 pb-lg-5'>
        <Row className="justify-content-center" style={{minHeight:'70vh'}}>
            <Col xs="11" sm='12'>
                {props.children}
            </Col>
        </Row>
    </Container>
  )
}

export default Layout;