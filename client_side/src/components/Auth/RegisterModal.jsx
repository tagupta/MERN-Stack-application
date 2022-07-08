import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, Input, Label,
    Form, FormGroup, Col, FormFeedback, FormText, NavLink
} from 'reactstrap';


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

    const toggle = () => {
        setModal(!modal);
        setEmailValid(false);
        setEmailInValid(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        toggle();
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
        }
    }

    return (
        <div>
            {/* <Button color="light" onClick={toggle}>Register</Button> */}
            <NavLink href="#" onClick={toggle}>Register</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register User</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="name" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input id="name" name="name" placeholder="Name" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input id="email" name="email" placeholder="Email"
                                    type="email"
                                    valid={isEmailValid}
                                    onChange={handleEmail}
                                    invalid={isEmailInValid} />
                                {isEmailValid ? <FormFeedback valid>Sweet! Email is valid</FormFeedback> : null}

                                {isEmailInValid ? <FormFeedback invalid>Enter valid Email ID</FormFeedback> : null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input id="password" name="password" placeholder="Password" type="password" />
                            </Col>
                        </FormGroup>
                        <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
                    </Form>

                </ModalBody>
            </Modal>
        </div>
    )
}
