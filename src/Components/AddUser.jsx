import axios from 'axios';
import React, { useState } from 'react'


const AddUser = () => {

  let [errors, setErrors] = useState({});

  let [state, setState] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  let change = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
  }

  let submit = async (e) => {
    e.preventDefault();
    try {
      let { userName, firstName, lastName, email, password } = state;


      let data = { userName, firstName, lastName, email, password };
      console.log(data);
      let response = await axios.post("http://localhost:8080/users", data);
      console.log(response);
      if (response.status === 201) {
        alert(response.data);
      }

      setState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })

      setErrors({})

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <div>
      <div id="adduser">
        <h2>Register User</h2>
        <form onSubmit={submit} method="post">
          <div>
            <label htmlFor="userName">Username:</label>
            <input type="text" value={state.userName} onChange={change} name="userName" id="userName" placeholder="Enter Your Name" />
            {errors.userName && <span>{errors.userName}</span>}
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" value={state.firstName} onChange={change} name="firstName" id="firstName" placeholder="Enter Your First Name" />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" value={state.lastName} onChange={change} name="lastName" id="lastName" placeholder="Enter Your Last Name" />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" value={state.email} onChange={change} name="email" id="email" placeholder="Enter Your Email" />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" value={state.password} onChange={change} name="password" id="password" placeholder="Enter Your Password" />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default AddUser;