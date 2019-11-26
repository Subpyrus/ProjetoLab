import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const pokemonPageMoves = (props) =>
    <Table dark>
        <thead>
            <tr>
                <th>Level</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {props.pokemonMoves.map((moveItem, firstKey) =>
                moveItem.version_group_details.map((moveDetailsItem, secondKey) =>
                    moveDetailsItem.version_group.name === `${props.generation}` && moveDetailsItem.move_learn_method.name === `${props.method}` &&
                    <tr key={secondKey}>
                        <td>{moveDetailsItem.level_learned_at}</td>
                        <td>{moveItem.move.name}</td>
                    </tr>
                )

            )}
        </tbody>
    </Table>



export default pokemonPageMoves

