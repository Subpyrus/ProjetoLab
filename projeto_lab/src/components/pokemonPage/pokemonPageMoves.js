import React, { Component } from 'react';
import { Row, Col, Table, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Loading from '../layout/Loading';
import Error from '../layout/Error';

class pokemonPageMoves extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            move: '',
            isLoading: false,
            error: ''
        }
    }

    getSpecificMove = (move) => {
        this.setState({ isLoading: true })
        var url = `https://pokeapi.co/api/v2/move/${move}/`

        fetch(url)
            .then(async (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then(async (data) => this.setState({ isLoading: false, move: data }))
            .catch((error) => this.setState({ isLoading: false, error: error }))

    }

    conditionMove = (firstName, firstString, firstCondition) => {
        return firstName !== firstCondition &&
            <>
                {firstCondition !== 0 ? (
                    <Col  xs='6'>
                        <h5>{firstString}:</h5>
                        <p>{firstName}</p>
                    </Col>
                ) : (
                        <Col  className='py-2' xs='12' sm='6'>
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
        const { isLoading, error, move } = this.state
        const { pokemonMoves, method } = this.props;

        var orderedMovesArray = [];
        for (var itemMove of pokemonMoves) {
            for (let itemMoveSpecifics of itemMove.version_group_details) {
                (itemMoveSpecifics.version_group.name === `sun-moon` && itemMoveSpecifics.move_learn_method.name === `${method}`) &&
                    orderedMovesArray.push({ name: itemMove.move.name, level_learned_at: itemMoveSpecifics.level_learned_at })
            }
            method === 'level-up' && orderedMovesArray.sort((a, b) => a.level_learned_at - b.level_learned_at)
        }

        if (move) {
            var conditions = [
                [move.meta.crit_rate, 'Crit Chance', 0],
                [move.meta.flinch_chance, 'Flinch Chance', 0],
                [move.priority, 'Priority', 0],
                [move.meta.stat_chance, 'Status Chance', 0],
                [move.meta.max_hits, 'Max Hits', null],
                [move.meta.max_turns, 'Max Turns', null],
                [move.meta.min_hits, 'Min Hits', null],
                [move.meta.min_turns, 'Min Turns', null],
                [move.meta.drain, 'Drain Amount', 0],
                [move.meta.healing, 'Healing Amount', 0]
            ]
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
                        {orderedMovesArray.length ? (orderedMovesArray.map((moveItem, key) =>
                            <tr key={key} onClick={() => { this.toggle(); this.getSpecificMove(moveItem.name); }}>
                                {method === 'level-up' ? (
                                    <>
                                        <td>{moveItem.level_learned_at}</td>
                                        <td>{string.startCase(moveItem.name)}</td>
                                    </>
                                ) : (
                                        <td>{string.startCase(moveItem.name)}</td>
                                    )}
                            </tr>
                        )) : (<tr><td>There weren't found any moves that this pokémon can learn by this method</td></tr>)}
                    </tbody>
                </Table>

                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        {isLoading ? (<Loading height='25vh' />) : error ? (<Error error={error} />) :
                            (move &&
                                <Row className='justify-content-center text-center'>
                                    <h3 className='col-12'>{move.names[2].name}</h3>
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
                                            {conditions.map((item,key) => <React.Fragment key={key}> {this.conditionMove(item[0], item[1], item[2])}</React.Fragment>)}
                                        </Row>
                                    </Col>
                                </Row>
                            )
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color='warning' className="mx-auto w-50" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default pokemonPageMoves