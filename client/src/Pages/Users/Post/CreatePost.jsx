import React, { Component } from 'react'
import axios from 'axios'

export default class CreatePost extends Component {

    state = {
        newPost: ''
    }
    

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()

        axios.post('/api/createpost', { desc: this.state.newPost, user_id: 2 })
            .then(res => {
                if(this.props.hideModal) this.props.hideModal()
                this.props.reload()
            })
            .catch(e => console.log(e))

        this.setState({ newPost: '' })
        
    }
    render() {
        
        return (
            <div>
                
                <div className="mb-2">
                    <div className="form-group">
                        <textarea name="newPost" onChange={this.onchangeHandler} value={this.state.newPost} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write down your thoughts here and share with friends"></textarea>
                    </div>

                    <div className={this.state.newPost.trim().length > 0 ? "d-flex" : "d-flex d-none"}>
                        <button onClick={this.handleSubmit} className="btn btn-primary mt-2 ms-auto col-12">Create post</button>
                    </div>
                </div>
                            
            </div>
        )
    }
}
