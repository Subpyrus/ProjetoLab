import React from 'react';
import { Row, InputGroup, Input } from 'reactstrap';

const Search = (props) => {
    return (
        <Row className='justify-content-center mt-4'>
            <InputGroup size="sm">
                <Input type="text" onChange={props.inputChange}/>
            </InputGroup>
        </Row >
    );
}

export default Search;