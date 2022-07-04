import React, { useState,useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import {addItem} from '../../features/item/itemSlice';

export const ItemModal = () => {
    const [modal,setModal] = useState(false);
    const [name,setName] = useState('');
    const dispatch = useDispatch();

    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem(name));
        toggle();
    }

    return (
        <div style={{marginBottom: '2rem'}}>
            <Button color="dark" onClick={toggle}>Add Item</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='itemName'>Item</Label>
                            <Input type='text' name='itemName' id='itemName' placeholder='Items...' onChange={handleChange}/>
                            <Button color="dark" style={{marginTop: '2rem'}} block>Add</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
