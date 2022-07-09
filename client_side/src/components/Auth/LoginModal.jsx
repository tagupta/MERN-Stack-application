import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, Input, Label,
    Form, FormGroup, Col, FormFeedback, NavLink, Alert
} from 'reactstrap';
import { clear_error } from '../../features/error/errorSlice';
import { loginUser } from '../../features/auth/authSlice';

export const LoginModal = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isEmailValid, setEmailValid] = useState(false);
    const [isEmailInValid, setEmailInValid] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const error = useSelector(state => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            setMessage(error.msg);
            setAlertVisible(true);
            window.setTimeout(() => {
                setAlertVisible(false)
            }, 3000);
        }
        else {
            setMessage(null);
        }
    }, [error]);

    useEffect(() => {
        if (isAuthenticated && modal) {
            toggle();
        }
        // eslint-disable-next-line 
    }, [isAuthenticated])

    const toggle = () => {
        dispatch(clear_error());
        setEmailValid(false);
        setEmailInValid(false);
        setModal(!modal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid) {
            //Action
            const setUser = {
                email,
                password
            }
            dispatch(loginUser(setUser));
            // toggle();
        }
        else {
            setModal(true);
            setMessage("Check all the fields before proceeding");
            setAlertVisible(true);
            window.setTimeout(() => {
                setAlertVisible(false)
            }, 3000);
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
            <NavLink href="#" onClick={toggle}>Login</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    {message ? <Alert color='danger' isOpen={alertVisible}>{message}</Alert> : null}
                    <Form inline onSubmit={handleSubmit}>
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
                        <Button color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
