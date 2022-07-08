import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Spinner } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItems } from '../../features/item/itemSlice';
import { fetchItems } from '../../features/item/itemSlice';
import './ShoppingList.css';
import { ItemModal } from '../ItemModal/ItemModal';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const itemsStore = useSelector(state => state.item);

    useEffect(() => {
        dispatch(fetchItems());
        // eslint-disable-next-line 
    }, [])

    return (
        <Container >
            <ItemModal />
            <ListGroup>
                <div className="shopping-list">
                    {itemsStore.loading ?
                        <Spinner animation="border" />
                        : null}
                    {!itemsStore.loading && itemsStore.error ? <h5>Error: {itemsStore.error}</h5> : null}
                    {!itemsStore.loading && itemsStore.items.length ?
                        itemsStore.items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="item">
                                <ListGroupItem>
                                    <Button className='remove-btn' color='danger' size='sm' onClick={() => dispatch(deleteItems(_id))}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))
                        : null
                    }
                </div>
            </ListGroup>
        </Container>
    );

}

export default ShoppingList;