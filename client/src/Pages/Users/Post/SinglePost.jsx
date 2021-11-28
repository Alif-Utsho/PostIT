import axios from 'axios';
import React, { Component } from 'react';
import Navbar from '../../../Components/Navbar'
import Post from './Post';

class SinglePost extends Component {

    state = {
        reload: false
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get(`/api/post/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({
            reload: true
        })
    }
    render() {
        const { post } = this.state
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />
                {
                    post ?
                        Object.keys(post).length > 0 ?
                            <div className="col-12 p-1 col-md-6 mx-auto">
                                <div>
                                    <Post post={post} user={post.user} reload={this.reload.bind(this)} key={post.id} />
                                </div>
                                <div>
                                    Comment box
                                </div>
                                <div>
                                    Comments here
                                </div>
                            </div> :
                            <div className="d-flex justify-content-center mt-5">
                                <div className="alert alert-danger col-6 text-center fs-1">No Post found</div>
                            </div> :
                        <div className="d-flex justify-content-center mt-5 py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default SinglePost;