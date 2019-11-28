import React, { Component } from 'react';
import { Row, Col, Table, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import LoadingComponents from '../layout/LoadingComponents';
import Error from '../layout/Error'

class pokemonPageMoves extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            move: '',
            error: '',
            loading: true
        }
    }

    getMove = (move) => {
        var url = `https://pokeapi.co/api/v2/move/${move.currentTarget.className}/`

        const handleResponse = (response) => {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        const handleData = (data) => {
            console.log(data)
            this.setState({ move: data, loading: false });
        }

        const handleError = (error) => {
            this.setState({ error: error });
        }

        fetch(url).then(handleResponse)
            .then(handleData)
            .catch(handleError);
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
        const { move } = this.state;
        const { pokemonMoves, method, generation, moves } = this.props;

        return (
            <>
                <Table dark responsive hover>
                    <thead>
                        <tr>
                            {method === 'level-up' &&
                                <th>Level</th>
                            }
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonMoves.map((moveItem, firstKey) =>
                            moveItem.version_group_details.map((moveDetailsItem, secondKey) =>
                                moveDetailsItem.version_group.name === `${generation}` && moveDetailsItem.move_learn_method.name === `${method}` &&
                                <tr className={moveItem.move.name} onClick={(event) => { this.toggle(); this.getMove(event); }} key={secondKey}>
                                    {method === 'level-up' ? (
                                        <>
                                            <td className={moveItem.move.name}>{moveDetailsItem.level_learned_at}</td>
                                            <td className={moveItem.move.name}>{string.startCase(moveItem.move.name)}</td>
                                        </>
                                    ) : (
                                            <>
                                                <td className={moveItem.move.name}>{string.startCase(moveItem.move.name)}</td>
                                            </>
                                        )}
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    {this.state.loading ? (<LoadingComponents />) : this.state.error ? (<Error />) : (
                        <>
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
                        </>
                    )}
                </Modal>
            </>
        )
    }
}

export default pokemonPageMoves