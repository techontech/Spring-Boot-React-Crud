import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Table } from "react-bootstrap";
import Moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
        return () => {};
    }, []);

    const fetchUsers = async () => {
        setIsLoaded(true);
        await axios
            .get(`http://localhost:8080/api/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(error);
            })
            .then(function () {
                setIsLoaded(false);
            });
    };

    const deleteUser = (id) => {
        if (window.confirm("are you sure")) {
            setIsLoaded(true);
            axios
                .delete(`http://localhost:8080/api/users/${id}`)
                .then((res) => {
                    fetchUsers();
                    toast.success("User delete successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsLoaded(false);
                })
                .catch((err) => console.log(err));
        }
    };

    const history = useNavigate();

    const editUser = (id) => {
        history(`/user/edit/${id}`);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Col md={12} className="mx-auto">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Card>
                        <Card.Header>
                            <div className="d-flex justify-content-between">
                                Users
                                <Button size="sm" variant="link">
                                    <Link to="/user/add">Add User</Link>
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Age</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.age}</td>
                                                <td>{user.description}</td>
                                                <td>
                                                    {Moment(
                                                        user.created_at
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    {user.updated_at
                                                        ? Moment(
                                                              user.updated_at
                                                          ).format("DD-MM-YYYY")
                                                        : "-"}
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="dark"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="dark"
                                                        size="sm"
                                                        onClick={() =>
                                                            editUser(user.id)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        );
    }
};
