import React, { useEffect, useRef } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition , TransitionGroup } from 'react-transition-group';
import {useSelector,useDispatch} from 'react-redux';
import {getItem, addItem, deleteItem} from '../../features/item/itemSlice';
import './ShoppingList.css';
import {ItemModal} from '../ItemModal/ItemModal';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const itemsStore = useSelector(state => state.item.items);
    const ref = useRef();

    // useEffect(() => {
    //   dispatch(getItem());
    // },[])

    const _removeItem = (id) => {
        dispatch(deleteItem(id));
    }

    return (
        <Container >
            <ItemModal/>
            {/* <Button color='dark' style={{marginBottom: '2rem'}} onClick={_addItems}>Add items</Button> */}
            <ListGroup>
                <TransitionGroup className="shopping-list" ref={ref}>
                    {itemsStore.map( ({id,name}) => (
                        <CSSTransition key={id} timeout={500} classNames="item">
                            <ListGroupItem>
                                <Button className='remove-btn' color='danger' size='sm' onClick={(e) =>_removeItem(id)}>
                                    &times;
                                </Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
  
}

export default ShoppingList;