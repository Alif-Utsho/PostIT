import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../../Components/Navbar'
import Post from '../Post/Post'
import UnfriendBtn from '../../../Components/ConButtons/UnfriendBtn'
import CancelBtn from '../../../Components/ConButtons/CancelBtn'
import ConfirmBtn from '../../../Components/ConButtons/ConfirmBtn'
import AddBtn from '../../../Components/ConButtons/AddBtn'

export default class Profile extends Component {

    // Searched profile
    state = {
        // user
        // request
        // sent
        // friends
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
        axios.get(`/api/profile/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
        axios.get('/api/connection')
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { user, request, sent, friends } = this.state
        const authId = 2
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />

                {user ?
                    <div>

                        <div className="container">
                            <div className="d-flex justify-content-center text-center text-md-start">
                                <div className="col-md-8 shadow-sm col-12 mt-3 bg-white p-3 border-primary border-3 border-top rounded-top">
                                    <div className="d-md-flex">
                                        <i className="fas fa-user fs-1 me-2 mb-md-0 mb-2 fs-5 me-md-3 my-auto alert p-md-5 rounded-circle alert-success"></i>
                                        <div className="my-auto">
                                            <h3 className="fw-bold">{user.name}</h3>
                                            <h5 className="fs-5 text-muted">{user.profile && user.profile.bio ? user.profile.bio : user.phone}</h5>
                                            <p className="text-dark">E-mail: {user.email}</p>
                                        </div>
                                        <div className="ms-auto">
                                            <div className="d-flex justify-content-center">
                                                {
                                                    user.profile && user.profile.fb &&
                                                    <div className="fs-2 d-flex mx-2">
                                                        <a href={user.profile.fb}>
                                                            <i className="fab fa-facebook-square text-primary"></i>
                                                        </a>
                                                    </div>
                                                }
                                                {
                                                    user.profile && user.profile.instagram &&
                                                    <div className="fs-2 d-flex mx-2">
                                                        <a href={user.profile.instagram}>
                                                            <i className="fab fa-instagram-square text-danger"></i>
                                                        </a>
                                                    </div>
                                                }
                                                {
                                                    user.profile && user.profile.linkedin &&
                                                    <div className="fs-2 d-flex mx-2">
                                                        <a href={user.profile.linkedin}>
                                                            <i className="fab fa-linkedin text-primary"></i>
                                                        </a>
                                                    </div>
                                                }
                                                {
                                                    user.profile && user.profile.github &&
                                                    <div className="fs-2 d-flex mx-2">
                                                        <a href={user.profile.github}>
                                                            <i className="fab fa-github-square text-dark"></i>
                                                        </a>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mt-md-5 mt-2">
                                                <div>
                                                    {/* {
                                                        user.request && user.request.find(r => r.sender === authId && r.status === 'friend') &&
                                                        <UnfriendBtn req_id={1} />
                                                    } */}
                                                    {
                                                        user.request && user.request.map(req => {
                                                            if (req.sender === authId && req.status === 'follower') {
                                                                return <CancelBtn req_id={req.id} reload={this.reload.bind(this)} key={req.id} />
                                                            }
                                                            else if (req.sender === authId && req.status === 'friend') {
                                                                return <UnfriendBtn req_id={req.id} reload={this.reload.bind(this)} key={req.id} />
                                                            }
                                                            else return null
                                                        })
                                                    }
                                                    {
                                                        user.sent && user.sent.map(s => {
                                                            if (s.receiver === authId && s.status === 'follower') {
                                                                return <div className="d-flex">
                                                                    <div className="me-1">
                                                                        <CancelBtn req_id={s.id} reload={this.reload.bind(this)} key={s.id} />
                                                                    </div>
                                                                    <ConfirmBtn req_id={s.id} reload={this.reload.bind(this)} key={s.id} />
                                                                </div>
                                                            }
                                                            else if (s.receiver === authId && s.status === 'friend') {
                                                                return <UnfriendBtn req_id={s.id} reload={this.reload.bind(this)} key={s.id} />
                                                            }
                                                            else return null
                                                        })
                                                    }
                                                    {
                                                        user.sent && user.sent.find(s => s.receiver !== authId) && <AddBtn user_id={user.id} reload={this.reload.bind(this)} />
                                                    }
                                                    {
                                                        user.request && user.request.find(req => req.sender !== authId) && <AddBtn user_id={user.id} reload={this.reload.bind(this)} />
                                                    }
                                                    {
                                                        !user.sent && !user.receiver && <AddBtn user_id={user.id} reload={this.reload.bind(this)} />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="text-muted border-1 my-4 col-11 mx-auto border border-primary" />
                                    <div className="d-flex px-md-5 justify-content-between">

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-primary col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-friends mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{friends && friends.length}</b></h3>
                                                    <h6 className="text-muted">Friends</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-danger col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-minus mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{sent && sent.length}</b></h3>
                                                    <h6 className="text-muted">Following</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-success col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-plus mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{request && request.length}</b></h3>
                                                    <h6 className="text-muted">Follower</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-8 mx-auto mt-4">
                                <div className="card-header fs-4 border-0 d-flex">Posts <span className="ms-auto">{user.posts && user.posts.length}</span></div>
                                {
                                    user.posts ?
                                        user.posts.length > 0 ?
                                            user.posts.reverse().map(post => {
                                                return (
                                                    <Post post={post} user={user} key={post.id} reload={this.reload.bind(this)} />
                                                )
                                            }) :
                                            <div className="d-flex justify-content-center mt-5 py-4 alert alert-danger">
                                                <h3>No post yet</h3>
                                            </div>
                                        :
                                        <div className="d-flex justify-content-center mt-5 py-3">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div>

                                }
                            </div>
                        </div>

                    </div>
                    :
                    // <div className="d-flex justify-content-center mt-5 py-3">
                    //     <div className="spinner-border text-primary" role="status">
                    //         <span className="sr-only"></span>
                    //     </div>
                    // </div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="alert alert-danger col-6 text-center fs-1">No User found</div>
                    </div>
                }
            </div>
        )
    }
}


// const PostItem = ({ post, user }) => {
//     const d = new Date()
//     const m = d.getMonth() + 1;
//     const date = d.getFullYear() + '-' + m + '-' + d.getDate();
//     return (
//         <div className="rounded my-3 bg-light border-3 border-start border-primary shadow-sm">
//             <div className="card-body pb-0">
//                 <div className="d-flex mb-2">
//                     <i className="fas rounded-circle fa-user me-2 fs-5 my-auto alert p-2 alert-success"></i>
//                     <div>
//                         <h5 className="card-title fs-6 fw-bold">{user.name}</h5>
//                         <h6 className="card-subtitle text-muted">{post.created_at.slice(11, 16)}{date === post.created_at.slice(0, 10) ? '' : ',' + ' ' + post.created_at.slice(0, 10)}</h6>
//                     </div>

//                 </div>
//                 <p className="card-text fs-5">{post.desc}</p>
//                 <p> <span>48 Loves </span> &nbsp;•&nbsp; <span>176 Comments</span> </p>
//                 {/* <hr className="col-12 mb-1 col-md-7" />
//                  <div className="d-flex col-12 col-md-6">
//                     <div className={this.state.liked ? "btn btn-sm col-4 text-danger fw-bold" : "btn btn-sm col-4"} onClick={this.likeClick}><i className={this.state.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} ></i>Love</div> <div className="vr"></div>
//                     <div className="btn btn-sm col-5"><i className="far fa-comment me-1"></i>Comment</div> <div className="vr"></div>
//                     <div className="btn btn-sm col-4"><i className="far fa-share-square me-1"></i>Share</div>
//                 </div> */}
//             </div>
//         </div>
//     )
// }