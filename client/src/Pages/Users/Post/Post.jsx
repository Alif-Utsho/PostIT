import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditPost from './EditPost'

export default class Post extends Component {

    state = {
        liked: false,
        // reacts: []
        // reactCount
        reload: false
    }

    componentDidMount() {
        this.fetchData()
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get(`/api/reacts/${this.props.post.id}`)
            .then(res => {
                this.setState({ ...res.data })
                res.data.reacts.filter(react => react.user_id === 2).length > 0 &&
                    this.setState({ liked: true })
            })
            .catch(e => console.log(e))
    }

    likeClick = e => {
        this.setState({ 
            liked: !this.state.liked
        })
        !this.state.liked ? (
            axios.post('/api/like', { post_id: this.props.post.id, user_id: 2 })
                .then(res => this.reload())
                .catch(e => console.log(e))
        ) : (

            axios.put('/api/unlike', { post_id: this.props.post.id, user_id: 2 })
                .then(res => this.reload())
                .catch(e => console.log(e))
        )

    }

    deletePost = post_id => {
        axios.put('/api/deletepost', { id: post_id })
            .then(res => {
                this.props.reload()
            })
            .catch(e => console.log(e))
    }

    editPost = ({desc, id}) => {
        axios.put('/api/editpost', { desc, id })
            .then(res => {
                this.props.reload()
            })
            .catch(e => console.log(e))

        this.setState({ newPost: '' })
    }

    modalShowHandler = (editPost) => {
        if (editPost) this.showModal = editPost.handleShow
    }

    editClick = () => {
        this.showModal()
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { post, user } = this.props
        const { reacts } = this.state
        const d = new Date()
        const m = d.getMonth() + 1;
        const date = d.getFullYear() + '-' + m + '-' + d.getDate();

        return (

            <div className="rounded my-3 bg-white border-2 border-start border-primary shadow-sm">
                <div className="card-body pb-0">
                    <div className="d-flex mb-2">
                        <i className="fas rounded-circle fa-user me-2 fs-5 my-auto alert p-2 alert-success"></i>
                        <div>
                            <Link to={`/profile/${user.id}`} className="text-decoration-none text-dark">
                                <h5 className="card-title fs-6 fw-bold">{user.name}</h5>
                            </Link>
                            <h6 className="card-subtitle text-muted">{post.created_at.slice(11, 16)}{date === post.created_at.slice(0, 10) ? '' : ','.concat(' ', post.created_at.slice(0, 10))} {post.created_at !== post.updated_at && '• updated'} </h6>
                        </div>
                        <div className="ms-auto">
                            <button className="bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h text-secondary"></i></button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {
                                    user.id === 2 ?
                                        <div>
                                            <li><button className="dropdown-item" onClick={this.editClick}><i className="fas fa-pen"></i>  Edit post</button></li>

                                            <li><button onClick={() => this.deletePost(post.id)} className="dropdown-item text-danger"><i className="fas fa-trash-alt"></i> Delete post</button></li>
                                        </div> :

                                        <li><button className="dropdown-item" href="#"><i className="fas fa-bug"></i> Report to admin</button></li>
                                }
                            </ul>
                        </div>

                    </div>
                    <p className="card-text fs-5">{post.desc}</p>
                    <p> <span>{reacts && reacts.length > 0 && reacts.length + ' Loved' }</span> </p>
                    <hr className="col-12 mb-1 col-md-8" />
                    <div className="d-flex col-11 col-md-7">
                        <div className={this.state.liked ? "btn btn-sm col-4 text-danger fw-bold" : "btn btn-sm col-4"} onClick={this.likeClick}><i className={this.state.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} ></i>Love</div> <div className="vr"></div>
                        <div className="btn btn-sm col-6"><i className="far fa-comment me-1"></i>Comment</div> <div className="vr"></div>
                        <div className="btn btn-sm col-4"><i className="far fa-share-square me-1"></i>Share</div>
                    </div>
                </div>

                {/* edit post modal */}
                <EditPost
                    post={post}
                    editPost={this.editPost}
                    ref={this.modalShowHandler}
                    reload={this.props.reload}
                    key={post.id}
                />
            </div>
        )
    }
}

