import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditPost from './EditPost'
import ReactList from './ReactList'

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
                res.data.reacts.filter(react => react.user_id === this.state.authId).length > 0 &&
                    this.setState({ liked: true })
            })
            .catch(e => console.log(e))
    }

    likeClick = e => {
        
        !this.state.liked ? (
            axios.post('/api/like', { post_id: this.props.post.id })
                .then(res => this.reload())
                .catch(e => console.log(e))
        ) : (

            axios.put('/api/unlike', { post_id: this.props.post.id })
                .then(res => this.reload())
                .catch(e => console.log(e))
        )
        this.setState({
            liked: !this.state.liked
        })

    }

    deletePost = post_id => {
        axios.put('/api/deletepost', { id: post_id })
            .then(res => {
                this.props.reload()
            })
            .catch(e => console.log(e))
    }

    editPost = ({ desc, id }) => {
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

    reactModalShowHandler = (reactList) => {
        if (reactList) this.showReactModal = reactList.handleShow
    }

    reactClick = () => {
        this.showReactModal()
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { post, user } = this.props
        const { reacts, authId } = this.state

        const d = new Date()
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var postStr = ''
        const postY = post.created_at.slice(0, 4)
        const postM = post.created_at.slice(5, 7)
        let postD = post.created_at.slice(8, 10)
        var postT = post.created_at.slice(11, 16)

        const postH = postT.slice(0, 2)
        const postMin = postT.slice(3, 5)

        if (parseInt(postH) + 6 >= 24) {
            postD = (parseInt(postD) + 1).toString()
            postT = (parseInt(postH) - 18).toString().concat(':').concat(postMin).concat(' AM')
        }
        else if (parseInt(postH) + 6 > 12) {
            postT = (parseInt(postH) - 6).toString().concat(':').concat(postMin).concat(' PM')
        }
        else postT = (parseInt(postH) + 6).toString().concat(':').concat(postMin).concat(' AM')


        if (d.getDate().toString() === postD && d.getFullYear().toString() === postY) {
            postStr = postT
        }
        else if (d.getDate().toString() === (parseInt(postD) + 1).toString() && d.getFullYear().toString() === postY) {
            postStr = 'Yesterday'.concat(' at ').concat(postT)
        }
        else if (d.getFullYear().toString() === postY) {
            postStr = postD.concat(' ').concat(month[postM - 1]).concat(' at ').concat(postT)
        }
        else if (d.getFullYear().toString() !== postY) {
            postStr = (month[postM - 1]).concat(' ').concat(postY) //.concat(' at ').concat(postT)
        }


        return (

            <div className="rounded my-3 bg-white border-2 border-start border-primary shadow-sm">
                <div className="card-body pb-0">
                    <div className="d-flex mb-2">
                        <i className="fas rounded-circle fa-user me-2 fs-6 my-auto alert p-2 alert-success"></i>
                        <div>
                            <Link to={`/profile/${user.id}`} className="text-decoration-none text-dark">
                                <h6 className="card-title fs-6 fw-bold">{user.name}</h6>
                            </Link>
                            <h6 className="card-subtitle text-muted" style={{ fontSize: '14px' }}>
                                {postStr}
                                {post.created_at !== post.updated_at && ` • updated`}
                            </h6>
                        </div>
                        <div className="ms-auto">
                            <button className="bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h text-secondary"></i></button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {
                                    (user.id === authId) ?
                                        <div>
                                            <li><button className="dropdown-item" onClick={this.editClick}><i className="fas fa-pen"></i>  Edit post</button></li>

                                            <li><button onClick={() => this.deletePost(post.id)} className="dropdown-item text-danger"><i className="fas fa-trash-alt"></i> Delete post</button></li>
                                        </div> :

                                        <li><button className="dropdown-item" href="#"><i className="fas fa-bug"></i> Report to admin</button></li>
                                }
                            </ul>
                        </div>

                    </div>
                    <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark" style={{ cursor: 'default'}}>
                        <p className="card-text mb-3">{post.desc}</p>
                    </Link>
                    <p className="mb-0">
                        <span onClick={this.reactClick} style={{ cursor: 'pointer' }}>
                            {reacts && reacts.length > 0 && <i className="far fa-heart me-1 text-danger" ></i>}
                            {reacts && reacts.length > 0 && reacts.length}
                        </span>
                    </p>
                    <hr className="col-12 mb-1" />
                    <div className="d-flex col-md-10 mx-auto justify-content-between">
                        <div className={this.state.liked ? "btn btn-sm text-danger fw-bold" : "btn btn-sm"} onClick={this.likeClick}><i className={this.state.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} ></i>Love</div>
                        <div className="btn btn-sm"><i className="far fa-comment me-1"></i>Comment</div>
                        <div className="btn btn-sm"><i className="far fa-share-square me-1"></i>Share</div>
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

                <ReactList
                    reacts={reacts ? reacts : []}
                    ref={this.reactModalShowHandler}
                    key={`react${post.id}`}
                    reload={this.props.reload}
                    reloadPost={this.reload.bind(this)}
                />
            </div>
        )
    }
}

