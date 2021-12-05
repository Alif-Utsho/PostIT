import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Login extends Component {

    state = {
        email: '',
        password: '',
        hasError: false,
        errors: {}
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { email, password } = this.state
        let errors = {}

        if (!email) {
            this.setState({ hasError: true })
            errors["email"] = "Please provide an Email";
        }
        if (!password) {
            this.setState({ hasError: true })
            errors["password"] = "Please provide a Password";
        }

        this.setState({ errors: errors })



        if (!this.state.hasError) {
            axios.post('/api/login', this.state)
                .then(res => {
                    localStorage.setItem('token', res.data.token.token)

                    console.log(res.data)
                    if (res.data.user.type === 'admin') {
                        window.location.pathname = "/dashboard"
                    }
                    else if (res.data.user.type === 'users') {
                        window.location.pathname = "/newsfeed"
                    }
                })
                .catch(e => console.log(e))
        }
    }
    render() {
        const { errors } = this.state
        return (
            <div>
                <section className="vh-100 bg-success">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body p-4 p-sm-5  text-center">


                                        <Link className="alert alert-danger col-12 btn fs-2 fw-bold" to="/" style={{ fontFamily: "Yeseva One" }}>
                                            <i className="fas fa-link"></i> PostIT!!
                                        </Link>

                                        <h4 className="mt-3 mb-3">Sign in</h4>

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="email" name="email" onChange={this.onChange} value={this.state.email} className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="E-mail" />
                                                {
                                                    errors.email &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.email}
                                                    </div>
                                                }

                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} className={errors.password ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Password" />
                                                {
                                                    errors.password &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.password}
                                                    </div>
                                                }
                                            </div>


                                            <button className="btn btn-primary btn-block col-12 btn-lg" type="submit">Login</button>

                                        </form>

                                        <hr className="my-4" />

                                        <a href="/registration" className="btn btn-success col-12">Create an Account</a>
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

export default Login