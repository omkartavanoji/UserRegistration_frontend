import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddUser from './Components/AddUser';;
import Home from './Components/Home';
import './App.css'
import ListUser from './Components/ListUser';
const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        {
          path: "/adduser",
          element: <AddUser></AddUser>
        }, {
          path: "/listuser",
          element: <ListUser></ListUser>
        }
      ]
    }]);
  return (
    <>
      <h1 className="text-4xl text-center">Welcome To User Registration</h1>
      <RouterProvider router={router}></RouterProvider>  
    </>
  )
}

export default App