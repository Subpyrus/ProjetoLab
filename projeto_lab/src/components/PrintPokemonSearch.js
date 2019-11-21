import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';

const PrintPokemonSearch = (props) => {

    let id = `${props.pokemonList[0].id}`
    if(id.length !== 3){
        if(id.length === 2){
            id = `0${id}`
        } else {
            id = `00${id}`
        }
    }

    return (
        <div style={{ marginTop: '3rem', marginBottom: '3rem' }} >
            <ListGroup>
                {props.pokemonList.map((item, key) =>
                    <Link key={key} to={{
                        pathname: `/pokemon-list/pokemon-page/${item.name}`
                    }}>
                        <ListGroupItem>
                            <Row>
                                <div className='col-12 col-md-4'>
                                    <img alt={item.name} src={`https://serebii.net/sunmoon/pokemon/${id}.png`} />
                                </div>
                                <h4 className='col'></h4>
                                <h3 className='col-12 col-md-8'>{item.name.toUpperCase()}</h3>
                            </Row>
                        </ListGroupItem>
                    </Link>
                )}
            </ListGroup>
        </div>
    );

}

export default PrintPokemonSearch;