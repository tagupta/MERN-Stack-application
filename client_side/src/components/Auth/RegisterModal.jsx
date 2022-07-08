import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, Input, Label,
    Form, FormGroup, Col, FormFeedback, FormText, NavLink, Alert
} from 'reactstrap';
import { registerUser } from '../../features/auth/authSlice';
import { clear_error } from '../../features/error/errorSlice';

export const RegisterModal = () => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isEmailValid, setEmailValid] = useState(false);
    const [isEmailInValid, setEmailInValid] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const error = useSelector(state => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setMessage(error.msg);
        }
        else {
            setMessage(null);
        }
    }, [error]);

    const toggle = () => {
        setEmailValid(false);
        setEmailInValid(false);
        setModal(!modal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid) {
            //Action
            const newUser = {
                name,
                email,
                password
            };

            dispatch(registerUser(newUser));
            // toggle();
        }
        else {
            setModal(true);
        }
    }

    const handleEmail = (e) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!validRegex.test(e.target.value)) { //e.target.value.match(validRegex)
            setEmailInValid(true);
            setEmailValid(false);
        }
        else {
            setEmailValid(true);
            setEmailInValid(false);
            setEmail(e.target.value);
        }
    }

    return (
        <div>
            <NavLink href="#" onClick={toggle}>Register</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register User</ModalHeader>
                <ModalBody>
                    {message ? <Alert color='danger'>{message}</Alert> : null}
                    <Form inline onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label for="name" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input id="name" name="name" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input id="email" name="email" placeholder="Email"
                                    type="email"
                                    onChange={handleEmail}
                                    valid={isEmailValid}
                                    invalid={isEmailInValid} />
                                {isEmailValid ? <FormFeedback valid={isEmailValid}>Sweet! Email is valid</FormFeedback> : null}

                                {isEmailInValid ? <FormFeedback >Enter valid Email ID</FormFeedback> : null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input id="password" name="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
