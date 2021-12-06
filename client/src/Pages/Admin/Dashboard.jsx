import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Dashboard extends Component {

    state = {
        reload: false,
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData();
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get('/api/countAll')
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true, showToast: true })
    }


    render() {
        const { users, posts, reacts, comments, reports } = this.state
        return (
            <div>
                <div className="d-flex">
                    <div className="col-3">
                        <Sidebar />

                    </div>
                    <div>
                        <div className="bg-primary">
                            <Navbar tittle="Admin Dashboard" reload={this.reload.bind(this)} />
                        </div>
                        <div className="row p-4 justify-content-center" style={{ width: "1160px" }}>

                            <div className="card col-4 m-2" style={{ width: '24rem', height: '9rem' }}>
                                <Link to="/users" className="text-decoration-none my-auto" >
                                    <div className="card-body d-flex">
                                        <div className="my-auto">
                                            <h1 className="fw-bold text-dark"> {users - 1 || 0} </h1>
                                            <h5 className="text-muted"> Users </h5>
                                        </div>
                                        <p className="ms-auto my-auto">
                                            <i className="display-2 text-muted opacity-25 fas fa-users"></i>
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="card col-4 m-2" style={{ width: '24rem', height: '9rem' }}>
                                <Link to="/posts" className="text-decoration-none my-auto" >
                                    <div className="card-body d-flex">
                                        <div className="my-auto">
                                            <h1 className="fw-bold text-dark"> {posts || 0} </h1>
                                            <h5 className="text-muted"> Posts </h5>
                                        </div>
                                        <p className="ms-auto my-auto">
                                            <i className="display-2 text-muted opacity-25 fas fa-copy"></i>
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="card col-4 m-2" style={{ width: '24rem', height: '9rem' }}>
                                <div className="card-body d-flex">
                                    <div className="my-auto">
                                        <h1 className="fw-bold text-dark">{comments || 0}</h1>
                                        <h5 className="text-muted"> Comments </h5>
                                    </div>
                                    <p className="ms-auto my-auto">
                                        <i className="display-2 text-muted opacity-25 fas fa-comment-alt"></i>
                                    </p>
                                </div>
                            </div>

                            <div className="card col-4 m-2" style={{ width: '24rem', height: '9rem' }}>
                                <div className="card-body d-flex">
                                    <div className="my-auto">
                                        <h1 className="fw-bold text-dark">{reacts || 0}</h1>
                                        <h5 className="text-muted"> Reacts </h5>
                                    </div>
                                    <p className="ms-auto my-auto">
                                        <i className="display-2 text-muted opacity-25 fas fa-heart"></i>
                                    </p>
                                </div>
                            </div>

                            <div className="card col-4 m-2" style={{ width: '24rem', height: '9rem' }}>
                                <Link to="/reports" className="text-decoration-none my-auto" >
                                    <div className="card-body d-flex">
                                        <div className="my-auto">
                                            <h1 className="fw-bold text-dark">{ reports || 0}</h1>
                                            <h5 className="text-muted"> Reports </h5>
                                        </div>
                                        <p className="ms-auto my-auto">
                                            <i className="display-2 text-muted opacity-25 fas fa-file-alt"></i>
                                        </p>
                                    </div>
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
