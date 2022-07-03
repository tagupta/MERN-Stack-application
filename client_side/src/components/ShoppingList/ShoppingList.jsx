import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition , TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import './ShoppingList.css';

class ShoppingList extends Component {
    state = {
        items : [
            {
                id: uuid(),
                name: 'Eggs'
            },
            {
                id: uuid(),
                name: 'Bananas'
            },
            {
                id: uuid(),
                name: 'Chocolates'
            },
            {
                id: uuid(),
                name: 'Milk'
            },
        ],
    }
    

    addItems = (event) =>{
        event.preventDefault();
        const name = prompt("Enter the item's name");
        if(name){
            this.setState( state => ({
                items : [...state.items , {id: uuid(), name}] 
            }));
        }
    }

    removeItem = (id) => {
        this.setState(state => ({
            items: state.items.filter(item => item.id !== id)
        }))

    }

    render() {
        const {items} = this.state;
        
        return (
            <Container>
                <Button color='dark' style={{marginBottom: '2rem'}} onClick={this.addItems}>Add items</Button>
                <ListGroup>
                   <TransitionGroup className="shopping-list">
                        {items.map( ({id,name}) => (
                            <CSSTransition key={id} timeout={500} classNames="item">
                                <ListGroupItem>
                                    <Button className='remove-btn' color='danger' size='sm' onClick={this.removeItem.bind(this,id)}>
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
}

export default ShoppingList;
// {items.map(item => <ListGroupItem key={item.id}>{item.id} : {item.name}</ListGroupItem>)}