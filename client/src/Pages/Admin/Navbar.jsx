import React, { Component } from 'react'

export default class Navbar extends Component {
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-primary pb-1">
                    <div className="container-fluid">
                        <h6 className="navbar-brand d-flex mt-1"> {this.props.tittle} </h6>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Track a Parcel" aria-label="Search"/>
                            <button className ="btn btn-success" type ="submit"><i className ="fas fa-search-location"></i></button>
                        </form> */}
                        <div className="btn">

                            <i className="fas fa-sync-alt fs-4 me-3 text-light" onClick={()=>this.props.reload()}></i>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
