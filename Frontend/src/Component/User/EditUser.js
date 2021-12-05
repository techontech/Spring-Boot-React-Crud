import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EditUser = () => {
    const [userForm, setUserForm] = useState({
        id: "",
        name: "",
        email: "",
        age: "",
        description: "",
        created_at: "",
    });

    const [validated, setValidated] = useState(false);

    const history = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        fetchUser();
        return () => {};
    }, []);

    const handleChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const fetchUser = async () => {
        await axios
            .get(`http://localhost:8080/api/users/${id}`)
            .then((res) => {
                setUserForm({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    description: res.data.description,
                    age: res.data.age,
                    created_at: res.data.created_at,
                });
            })
            .catch((err) => console.log(err));
    };

    const onSubmituserForm = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() !== false) {
            axios
                .put(`http://localhost:8080/api/users/${id}`, userForm)
                .then((res) => {
                    toast.success("User update successfully!", {
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
                                Update User
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
