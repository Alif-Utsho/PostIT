import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export default class Reports extends Component {

    state = {
        reload: false
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('/api/reports')
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { reports } = this.state
        console.log(this.state)
        return (
            <div>
                <div className="d-flex">
                    <div className="col-3">
                        <Sidebar />

                    </div>
                    <div className="w-100">
                        <div className="bg-primary">
                            <Navbar tittle="Post lists" reload={this.reload.bind(this)} />
                        </div>

                        <div className="table-responsive m-3" style={{ height: '620px' }}>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th scope="col" className="col-2">Reporter</th>
                                        <th scope="col">Post content</th>
                                        <th scope="col">Report description</th>
                                        <th scope="col" className="text-center">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reports && reports.map((report, index) => {
                                            return (

                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td> {report.user.name} </td>
                                                    <td> {report.post.desc} </td>
                                                    <td> {report.desc} </td>
                                                    <td className="text-center"> <Link to={`/posts/${report.post.id}`} className="btn btn-sm text-decoration-none btn-primary">View Post</Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
