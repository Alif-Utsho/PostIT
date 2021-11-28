import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'

import CreatePost from '../Pages/Users/Post/CreatePost';


export default class Navbar extends Component {
    state = {
        modalShow: false
    }

    handleShow = () => {
        this.setState({ modalShow: true })
    }
    handleClose = () => {
        this.setState({ modalShow: false })
    }

    signout() {
        axios.get('/api/signout')
            .then((res) => {
                this.props.history.push('/')
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
    }
    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-light alert-primary shadow-sm">
                    <div className="container-lg">
                        <Link className="navbar-brand fw-bolder" to="/" style={{ fontFamily: "Yeseva One" }}><i className="fas fa-link"></i> PostIT!!</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/newsfeed"><i className="fas fa-home fs-5 px-2"></i> <span className="d-lg-none ms-2 fw-normal">Newsfeed</span></Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link border-0 active bg-transparent" onClick={this.handleShow} ><i className="far fa-plus-square fs-5 px-2 ps-lg-5"></i> <span className="d-lg-none ms-2">Create post</span></button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link border-0 active bg-transparent" to="/friend"><i className="fas fa-user-friends fs-5 px-2 ps-lg-5"></i> <span className="d-lg-none ms-2">Friends</span> </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link active" to="/findfriend"><i className="fas fa-search fs-5 px-2 ps-lg-5"></i> <span className="d-lg-none ms-2 fw-normal">Search </span></Link>
                                </li>

                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">

                                <div className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle active" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user-tag text-dark fs-6 px-2"><span className="fs-6 ms-2">ALiF</span></i>
                                    </Link>
                                    <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/profile"><i className="fas fa-address-card me-2"></i>Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/friend"><i className="fas fa-user-friends me-2"></i>Friends</Link></li>
                                        {/* <li><Link className="dropdown-item" to="#"><i className="fas fa-user-lock me-2 text-danger"></i>Block list</Link></li> */}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={this.signout}><i className="fas fa-sign-out-alt text-danger me-2"></i>Logout</button></li>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* crete post modal */}
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreatePost reload={this.props.reload} hideModal={this.handleClose} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
