import React from 'react'
import { Row, InputGroup, Input, InputGroupButtonDropdown } from 'reactstrap';

const Trivia = (props) => {
    return (
        <Row className='justify-content-center mt-4'>
            <InputGroup size="sm">
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle caret>
                        Dificuldade
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Easy</DropdownItem>
                        <DropdownItem>Medium</DropdownItem>
                        <DropdownItem>Hard</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input
                    type="button"
                    value="Generate Trivia"
                    onClick={props.inputClick}
                />
            </InputGroup>
        </Row >
    )
}

export default Trivia;