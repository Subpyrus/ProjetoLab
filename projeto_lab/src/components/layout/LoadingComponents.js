import React from 'react';
import { SpinningCircles } from 'svg-loaders-react'
import { Row } from 'reactstrap';

const LoadingComponents = (props) => {
    return (
        <Row style={{height:'50vh'}} className='d-flex justify-content-center align-items-center'>
            <SpinningCircles />
        </Row>
    )
}

export default LoadingComponents;