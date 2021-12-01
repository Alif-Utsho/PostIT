import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Registration extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        errors: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    handleSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('/api/register', this.state);
        console.log(res);
    }

    render() {
        return (
            <div>
                <section className="vh-100 bg-success">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body p-4 p-sm-5  text-center">

                                        <Link className="alert alert-danger col-12 btn fs-2 fw-bold" to="/" style={{ fontFamily: "Yeseva One" }}>
                                            <i className="fas fa-link"></i>
                                            PostIT!!
                                        </Link>

                                        <h4 className="mt-5 mb-3">Sign up</h4>

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="name" name="name" onChange={this.onChange} value={this.state.name} className="form-control form-control-lg" placeholder="Name" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="phone" name="phone" onChange={this.onChange} value={this.state.phone} className="form-control form-control-lg" placeholder="Phone" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="email" name="email" onChange={this.onChange} value={this.state.email} className="form-control form-control-lg" placeholder="E-mail" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} className="form-control form-control-lg" placeholder="Password" />
                                            </div>


                                            <button className="btn btn-primary btn-block col-12 btn-lg" type="submit">Submit</button>

                                        </form>

                                        <hr className="my-4" />

                                        <a href="/login" className="btn btn-success col-12">Login here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Registration