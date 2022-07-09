import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup } from 'reactstrap';
import { addItems } from '../../features/item/itemSlice';

export const ItemModal = () => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            "name": name
        }
        dispatch(addItems(newItem));

        // dispatch(addItem(newItem));
        toggle();
    }

    return (
        <div style={{ marginBottom: '2rem' }}>
            {isAuthenticated ? <Button color="dark" onClick={toggle}>Add Item</Button> :
                <h4 className='mb-3 ml-4'>Please Login/Register to manage items</h4>}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='itemName'>Item</Label>
                            <Input type='text' name='itemName' id='itemName' placeholder='Items...' onChange={handleChange} />
                            <Button color="dark" style={{ marginTop: '2rem' }} block>Add</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
