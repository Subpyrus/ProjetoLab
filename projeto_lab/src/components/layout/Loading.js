import React from 'react';
import { SpinningCircles } from 'svg-loaders-react'
import { Row } from 'reactstrap';

const Loading = (props) => {
    return (
        <Row style={{height:'68vh'}} className='d-flex justify-content-center align-items-center'>
            <SpinningCircles />
        </Row>
    )
}

export default Loading;