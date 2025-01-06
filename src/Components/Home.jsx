import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div id='nav'>
            <Link to="/"><button>Home</button> </Link>
            <Link to="/adduser"> <button>AddUser</button></Link>
            <Link to="/listuser"><button>ListUsers</button></Link>
            <div>
                <Outlet />
            </div>

        </div>
    )
}
export default Home