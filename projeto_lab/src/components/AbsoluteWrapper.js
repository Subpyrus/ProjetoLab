import React from 'react';

const AbsoluteWrapper = ({ children }) => {
    return(
        <div className="position-absolute w-100 d-inline-block">
            {children}
        </div>
    );
}

export default AbsoluteWrapper;