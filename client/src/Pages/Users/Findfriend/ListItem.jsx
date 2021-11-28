import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AddBtn from '../../../Components/ConButtons/AddBtn';
import CancelBtn from '../../../Components/ConButtons/CancelBtn';
import ConfirmBtn from '../../../Components/ConButtons/ConfirmBtn';

export default class Listitem extends Component {
    state = {
    }



    render() {
        const { user } = this.props
        const receiver = {}
        const sender = {}
        const friends = []
        if (user.id === 2) return null
        return (
            <div>
                <li className="list-group-item d-flex justify-content-between border-start mb-2 border-primary border-0 border-2 rounded align-items-start">
                    <i className="fas fa-user me-2 fs-5 my-auto alert p-2 alert-success"></i>
                    <div className="ms-2 me-auto">
                        <Link to={`/profile/${user.id}`} className="text-decoration-none text-dark">
                            <div className={user.profile ? "fw-bold" : "fw-bold my-auto mt-2"}>{user.name}</div>
                        </Link>
                        <span className="text-muted">{user.profile && user.profile.bio}</span>
                    </div>

                    {
                        user.request.map(r => {
                            r.sender === 2 && r.status === 'follower' && (receiver[r.id] = r.receiver)
                            r.status === 'friend' && friends.push(r.receiver)
                            return null
                        })
                    }
                    {
                        user.sent.map(s => {
                            s.receiver === 2 && s.status === 'follower' && (sender[s.id] = s.sender)
                            s.status === 'friend' && friends.push(s.sender)
                            return null
                        })
                    }
                    {/* <span className="my-auto">
                        <button
                            className="btn btn-primary"
                            // disabled={this.state.req_sent}
                            disabled={receiver.includes(user.id) || this.state.req_sent}
                            onClick={() => this.addFriend(user.id)}
                        >
                            <i className="fas fa-user-plus me-1"></i>
                            {receiver.includes(user.id) || this.state.req_sent && 'Request sent'}
                            {sender.includes(user.id) && 'Confirm request'}
                        </button>
                    </span> */}

                    {
                        Object.values(receiver).includes(user.id) &&
                        <span className="my-auto">
                            <CancelBtn req_id={Object.keys(receiver).find(key => receiver[key] === user.id)} reload={this.props.reload} />
                        </span>
                    }

                    {
                        Object.values(sender).includes(user.id) &&
                        <span className="my-auto">
                            <ConfirmBtn req_id={Object.keys(sender).find(key => sender[key] === user.id)} reload={this.props.reload} />
                        </span>
                    }

                    {
                        !Object.values(receiver).includes(user.id) && !Object.values(sender).includes(user.id) && !friends.includes(user.id) &&
                        <span className="my-auto">
                            <AddBtn user_id={user.id} reload={this.props.reload} />
                        </span>
                    }

                    {
                        friends.includes(user.id) && <p className="alert alert-primary py-1 my-auto">Your friend</p>
                    }
                </li>
            </div>
        )
    }
}
