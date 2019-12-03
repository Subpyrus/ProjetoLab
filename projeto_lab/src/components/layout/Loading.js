import React from 'react';
import { SpinningCircles } from 'svg-loaders-react'
import { Row } from 'reactstrap';

const Loading = (props) => {
    return (
        <Row style={{height:`${props.height}`}} className='d-flex justify-content-center align-items-center'>
            <SpinningCircles />
        </Row>
    )
}

export default Loading;