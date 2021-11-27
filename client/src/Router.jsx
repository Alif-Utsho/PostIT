import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import Login from './Pages/Auth/Login'
import Registration from './Pages/Auth/Registration'
import Newsfeed from './Pages/Users/Newsfeed/Newsfeed'
import Findfriend from './Pages/Users/Findfriend/Findfriend'
import Friend from './Pages/Users/Newsfeed/Connection/Friend'
import AuthProfile from './Pages/Users/Profile/AuthProfile'
import ProfileID from './Pages/Users/Profile/ProfileID'
// import AuthProfileFunction from './Pages/Users/Profile/AuthProfileFunction'


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App />} />

                {/* Auth */}
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />


                {/* Users */}
                <Route path='/newsfeed' element={<Newsfeed />} />
                <Route path='/findfriend' element={<Findfriend />} />
                <Route path='/friend' element={<Friend />} />
                {/* Profile */}
                <Route exact path='/profile' element={<AuthProfile />} />
                <Route path="/profile/:id" element={<ProfileID />} />

                {/* <Route exact path='/profilefunction' element={<AuthProfileFunction/>} /> */}
                

            </Routes>
        </BrowserRouter>
    )
}

export default Router