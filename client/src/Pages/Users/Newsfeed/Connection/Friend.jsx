import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../../../Components/Navbar'
import ListItem from './ListItem'

export default class Friend extends Component {

    state = {
        reload: false
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData();
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get('/api/connection')
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({reload: true})
    }
    render() {
        const { friends } = this.state
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />


                <div className="mt-4">
                        <h5 className="card-header col-md-6 col-12 mx-auto mb-3 border-bottom d-flex border-0 border-primary">Friends <span className="ms-auto">{friends && friends.length}</span> </h5>
                        <ul className="list-group list-group-flush">
                            {
                                friends ?
                                    ((friends && friends.length > 0) ?
                                        friends.map(friend => {
                                            return (
                                                <ListItem
                                                    key={friend.id}
                                                    friend={friend}
                                                    reload={this.reload.bind(this)}
                                                />
                                            )
                                        }) :
                                        <h1 className="alert alert-danger text-center col-0 col-md-6 mx-auto">You have no friends</h1>) :
                                <div className="d-flex justify-content-center mt-5 py-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>

                            }


                        </ul>
                    </div>
            </div>
        )
    }
}
