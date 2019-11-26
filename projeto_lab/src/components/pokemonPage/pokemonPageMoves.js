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
                                <tr class={moveItem.move.name} onClick={(event) => { this.toggle(); this.getMove(event); }} key={secondKey}>
                                    <td class={moveItem.move.name}>{moveDetailsItem.level_learned_at}</td>
                                    <td class={moveItem.move.name}>{moveItem.move.name}</td>
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
                                <tr class={moveItem.move.name} onClick={(event) => { this.toggle(); this.getMove(event); }} key={secondKey}>
                                    <td class={moveItem.move.name}>{moveItem.move.name}</td>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    {this.state.loading ? (
                        <>
                            <p>loading...</p>
                        </>
                    ) : (
                            <>
                                <ModalHeader toggle={this.toggle}>{move.names[2].name}</ModalHeader>
                                <ModalBody>
                                    <p>{move.flavor_text_entries[2].flavor_text}</p>
                                    <p>{move.effect_entries[0].short_effect}</p>
                                    <p>{move.power}</p>
                                    <p>{move.pp}</p>
                                    <p>{move.damage_class.name}</p>
                                    <p>{move.type.name}</p>
                                    <p>{move.target.name}</p>
                                    <p>{move.priority}</p>
                                    <p>{move.priority}</p>
                                    <p>{move.effect_chance}</p>
                                    <p>{move.effect_changes}</p>
                                    <p>{move.meta.crit_rate}</p>
                                    <p>{move.meta.drain}</p>
                                    <p>{move.meta.flinch_chance}</p>
                                    <p>{move.meta.healing}</p>
                                    <p>{move.meta.max_hits}</p>
                                    <p>{move.meta.max_turns}</p>
                                    <p>{move.meta.min_hits}</p>
                                    <p>{move.meta.min_turns}</p>
                                    <p>{move.meta.stat_chance}</p>
                                    <p>{move.meta.ailment.name}</p>
                                    <p>{move.meta.ailment_chance}</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
                                </ModalFooter>
                            </>
                        )}
                </Modal>
            </>
        )
    }

}

export default pokemonPageMoves