import React from 'react'

export default function Navbar(props) {

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary pb-1">
                <div className="container-fluid">
                    <h6 className="navbar-brand d-flex mt-1"> {props.tittle} </h6>

                    {/* <div className="btn">
                        <i className="fas fa-sync-alt fs-4 me-3 text-light" onClick={() => props.reload(true)}></i>
                    </div> */}
                </div>
            </nav>
        </div>
    )
}
