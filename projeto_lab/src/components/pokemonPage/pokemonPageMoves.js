import React, { Component } from 'react';
import { Table, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
        console.log(move)
        console.log(move.currentTarget.className)
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

    conditionMove = (condition) => {

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { move } = this.state;
        const { pokemonMoves, method, generation, moves } = this.props;

        let tableContent;
        let tableHeader;
        switch (method) {
            case 'level-up':
                tableHeader =
                    <>
                        <th>Level</th>
                        <th>Name</th>
                    </>
                tableContent =
                    <>
                        {pokemonMoves.map((moveItem, firstKey) =>
                            moveItem.version_group_details.map((moveDetailsItem, secondKey) =>
                                moveDetailsItem.version_group.name === `${generation}` && moveDetailsItem.move_learn_method.name === `${method}` &&
                                <tr className={moveItem.move.name} onClick={(event) => { this.toggle(); this.getMove(event); }} key={secondKey}>
                                    <td className={moveItem.move.name}>{moveDetailsItem.level_learned_at}</td>
                                    <td className={moveItem.move.name}>{moveItem.move.name}</td>
                                </tr>
                            )
                        )}
                    </>
                break;
            default:
                tableHeader =
                    <>
                        <th>Name</th>
                    </>
                tableContent =
                    <>
                        {pokemonMoves.map((moveItem, firstKey) =>
                            moveItem.version_group_details.map((moveDetailsItem, secondKey) =>
                                moveDetailsItem.version_group.name === `${generation}` && moveDetailsItem.move_learn_method.name === `${method}` &&
                                <tr className={moveItem.move.name} onClick={(event) => { this.toggle(); this.getMove(event); }} key={secondKey}>
                                    <td className={moveItem.move.name}>{moveItem.move.name}</td>
                                </tr>
                            )
                        )}
                    </>
                break;
        }

        return (
            <>
                <Table dark>
                    <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </Table>
                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    {this.state.loading ? (
                        <>
                            <p>loading...</p>
                        </>
                    ) : (
                            <>
                                <ModalHeader className='text-center' toggle={this.toggle}>{move.names[2].name}</ModalHeader>
                                <ModalBody>
                                    <Table hover responsive size="sm">
                                        <tbody>
                                            <tr>
                                                <td colSpan="2">{move.flavor_text_entries[2].flavor_text}</td>
                                            </tr>
                                            <tr>
                                                <td>Power: {move.power}</td>
                                                <td>Type: {move.type.name}</td>
                                            </tr>
                                            <tr>
                                                <td>PP: {move.pp}</td>
                                                <td>Accuracy: {move.accuracy}</td>
                                                <td>Attack Type: {move.damage_class.name}</td>
                                            </tr>
                                            {move.meta.crit_rate !== 0 && move.meta.flinch_chance !== 0 &&
                                                <tr>
                                                    <td>Crit Chance: {move.meta.crit_rate}</td>
                                                    <td>Flinch Chance: {move.meta.flinch_chance}</td>

                                                </tr>
                                            }
                                            {move.meta.stat_chance !== 0 && move.priority !== 0 &&
                                                <tr>
                                                    <td>Status Chance: {move.meta.stat_chance}</td>
                                                    <td>Priority: {move.priority}</td>
                                                </tr>
                                            }
                                            {move.meta.max_hits !== 0 && move.meta.max_turns !== 0 &&
                                                <tr>
                                                    <td>{move.meta.max_hits}</td>
                                                    <td>{move.meta.max_turns}</td>
                                                </tr>
                                            }

                                            <tr>
                                                <td>{move.meta.min_hits}</td>
                                                <td>{move.meta.min_turns}</td>
                                            </tr>
                                            <tr>
                                                <td>{move.meta.drain}</td>
                                                <td>{move.meta.healing}</td>
                                            </tr>
                                            <tr>
                                                <td>{move.meta.ailment.name}</td>
                                                <td>{move.meta.ailment_chance}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary mx-auto w-50" onClick={this.toggle}>Close</Button>{' '}
                                </ModalFooter>
                            </>
                        )}
                </Modal>
            </>
        )
    }

}

export default pokemonPageMoves