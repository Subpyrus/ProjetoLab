import React from 'react';
import { Row, InputGroup, Input } from 'reactstrap';

const Search = (props) => {
    console.log(props.inputEnter)
    return (
        <Row className='justify-content-center mt-4'>
            <InputGroup size="sm">
                <Input type="text" onChange={props.inputChange} onKeyPress={props.inputEnter} />
                <Input
                    type="button"
                    value="Search"
                    onClick={props.inputClick}
                />
            </InputGroup>
        </Row >
    );
}

export default Search;