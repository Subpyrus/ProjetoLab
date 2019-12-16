import React from 'react';

const Error = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.error.error}</h1>
        </div>
    )
}

export default Error;