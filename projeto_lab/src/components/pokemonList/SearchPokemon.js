import React from 'react';
import { Row, InputGroup, Input } from 'reactstrap';

const Search = (props) => {
    return (
        <Row className='justify-content-center'>
            <InputGroup size="sm">
                <Input type="text" onChange={props.inputChange}/>
            </InputGroup>
        </Row >
    );
}

export default Search;