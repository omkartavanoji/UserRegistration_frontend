import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {
    const location = useLocation()
    return (
        <div className='home-container'>
            <nav className='navigation'>
                <Link to="/"><button className='nav-button'>Home</button></Link>
                <Link to="/adduser"><button className='nav-button'>AddUser</button></Link>
                <Link to="/listuser"><button className='nav-button'>ListUsers</button></Link>
            </nav>
            {location.pathname === '/' && 
                <div className='content'>
                    <h1>Welcome to User Management System</h1>
                    <p>Select an option from the navigation menu above</p>
                </div>
            }
            <Outlet />
        </div>
    )
}

export default Home