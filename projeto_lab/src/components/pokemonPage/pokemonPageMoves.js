import React, { Component } from 'react';
import { Row, Col, Table, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getSpecificMove } from '../../store/actions/apiActions'

class pokemonPageMoves extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
        }
    }

    conditionMove = (firstName, firstString, firstCondition) => {
        return firstName !== firstCondition &&
            <>
                {firstCondition !== 0 ? (
                    <Col xs='6'>
                        <h5>{firstString}:</h5>
                        <p>{firstName}</p>
                    </Col>
                ) : (
                        <Col className='py-2' xs='12' sm='6'>
                            <h5>{firstString}:</h5>
                            <p>{firstName}%</p>
                        </Col>
                    )
                }
            </>


    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        var string = require('lodash/string')
        const { pokemonMoves, method, move } = this.props;
        var orderedMovesArray = [];
        for (var itemMove of pokemonMoves) {
            for (let itemMoveSpecifics of itemMove.version_group_details) {
                itemMoveSpecifics.version_group.name === `sun-moon` && itemMoveSpecifics.move_learn_method.name === `${method}` && orderedMovesArray.push({name: itemMove.move.name, level_learned_at: itemMoveSpecifics.level_learned_at})
            }
            method === 'level-up' && orderedMovesArray.sort((a, b) => a.level_learned_at - b.level_learned_at)
        }

        return (
            <>
                <Table className='text-center' dark responsive hover>
                    <thead>
                        <tr>
                            {method === 'level-up' &&
                                <th>Level</th>
                            }
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedMovesArray.map((moveItem, key) =>
                            <tr key={key} onClick={() => { this.toggle(); this.getMove(moveItem.move.name); }}>
                                {method === 'level-up' ? (
                                    <>
                                        <td className={moveItem.name}>{moveItem.level_learned_at}</td>
                                        <td className={moveItem.name}>{string.startCase(moveItem.name)}</td>
                                    </>
                                ) : (
                                        <>
                                            <td className={moveItem.name}>{string.startCase(moveItem.name)}</td>
                                        </>
                                    )}
                            </tr>
                        )}
                    </tbody>
                </Table>
                {move &&
                    <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}></ModalHeader>
                        <ModalBody>
                            <Row className='justify-content-center text-center'>
                                <h4 className='col-12'>{move.names[2].name}</h4>
                                <p className='col-12 py-2'>{move.flavor_text_entries[2].flavor_text}
                                </p>
                                <Col className='py-2' xs='12' sm='6'>
                                    <h5 className='col-12'>Power:</h5>
                                    {move.power === null ? (<p>None</p>) : (<p>{move.power}</p>)}
                                </Col>
                                <Col className='py-2' xs='12' sm='6'>
                                    <Row>
                                        <h5 className='col-12'>Type:</h5>
                                        <Col xs='4' className={`mx-auto text-center typeIcon type-${move.type.name}`}>
                                            {move.type.name}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='py-2' xs='12' sm='4'>
                                    <h5>PP:</h5>
                                    <p>{move.pp}</p>
                                </Col>
                                <Col className='py-2' xs='12' sm='4'>
                                    <h5>Accuracy:</h5>
                                    {move.accuracy === null ? (<p>100</p>) : (<p>{move.accuracy}</p>)}
                                </Col>
                                <Col className='py-2' xs='12' sm='4'>
                                    <h5>Move Type:</h5>
                                    <p>{string.startCase(move.damage_class.name)}</p>
                                </Col>
                                <Col xs='12'>
                                    <Row className='justify-content-center'>
                                        {this.conditionMove(move.meta.crit_rate, 'Crit Chance', 0)}
                                        {this.conditionMove(move.meta.flinch_chance, 'Flinch Chance', 0)}
                                        {this.conditionMove(move.priority, 'Priority', 0)}
                                        {this.conditionMove(move.meta.stat_chance, 'Status Chance', 0)}
                                        {this.conditionMove(move.meta.max_hits, 'Max Hits', null)}
                                        {this.conditionMove(move.meta.max_turns, 'Max Turns', null)}
                                        {this.conditionMove(move.meta.min_hits, 'Min Hits', null)}
                                        {this.conditionMove(move.meta.min_turns, 'Min Turns', null)}
                                        {this.conditionMove(move.meta.drain, 'Drain Amount', 0)}
                                        {this.conditionMove(move.meta.healing, 'Healing Amount', 0)}
                                    </Row>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary mx-auto w-50" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        move: state.apiCalls.apiData.getMove
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSpecificMove: (move) => dispatch(getSpecificMove(move))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pokemonPageMoves)