import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddUser = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        age: "",
        description: "",
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const history = useNavigate();

    const onSubmituserForm = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() !== false) {
            axios
                .post(`http://localhost:8080/api/users`, userForm)
                .then((res) => {
                    toast.success("User add successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history("/");
                })
                .catch((err) => console.log(err));
        }
        setValidated(true);
    };

    return (
        <>
            <Col md={5} className="mx-auto">
                <div className="p-3 rounded shadow-sm bg-white">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={onSubmituserForm}
                    >
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={userForm.name}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                                value={userForm.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="text"
                                name="age"
                                placeholder="Enter Age"
                                value={userForm.age}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a age.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                style={{ height: "100px" }}
                                value={userForm.description}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button size="sm" variant="dark" type="submit">
                                Add User
                            </Button>
                            <Button
                                size="sm"
                                variant="link"
                                className="text-info"
                            >
                                <Link to="/">Cancel</Link>
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Col>
        </>
    );
};
