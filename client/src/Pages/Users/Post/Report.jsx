import axios from 'axios';
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

export default class Report extends Component {

    state = {
        report: '',
        modalShow: false
    }

    componentDidMount() {
        
    }

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReportShow = () => {
        this.setState({ modalShow: true })
    }
    handleReportClose = () => {
        this.setState({ modalShow: false })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/createreport', { desc: this.state.report, post_id: this.props.post.id })
            .then(res => {
                this.handleReportClose()
                this.props.reload()
                return (
                    <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>

                        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <img src="..." class="rounded mr-2" alt="..."/>
                                <strong class ="mr-auto">Bootstrap</strong>
                                <small>11 mins ago</small>
                                <button type ="button" class ="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times; </span>
                                </button>
                            </div>
                            <div class="toast-body">
                                Hello, world! This is a toast message.
                            </div>
                        </div>
                    </div>
                )
            })
            .catch(e => console.log(e))

        this.setState({ report: '' })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleReportClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report this post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=" mb-2">
                            <div className="form-group">
                                <textarea name="report" onChange={this.onchangeHandler} value={this.state.report} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write down your thoughts here and share with friends"></textarea>
                            </div>
    
                            <div className={this.state.report.trim().length > 0 ? "d-flex" : "d-flex d-none"}>
                                <button onClick={this.handleSubmit} className="btn btn-primary mt-2 ms-auto col-12">Submit Report</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
