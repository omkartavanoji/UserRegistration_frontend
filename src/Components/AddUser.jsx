import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const AddUser = () => {
  const [errors, setErrors] = useState({});
  const [documentCount, setDocumentCount] = useState(""); // User-specified document count
  const [uploadedFiles, setUploadedFiles] = useState([]); // Files uploaded via Dropzone

  const [state, setState] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userImage: null,
  });


  const change = (e) => {
    let { name, value } = e.target;
    if (name === "userImage") {
      setState({ ...state, [name]: e.target.files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };


  const handleDocumentCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 6) {
      setDocumentCount(value);
      setUploadedFiles([]); 
    } else {
      setDocumentCount("");
      setUploadedFiles([]);
      alert("Please enter a number between 1 and 6.");
    }
  };


  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== documentCount) {
      alert(`Please upload exactly ${documentCount} documents.`);
    } else {
      setUploadedFiles(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 6,
  });


  const submit = async (e) => {
    e.preventDefault();
    try {
      const { userName, firstName, lastName, email, password, userImage } = state;
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userImage", userImage);
 
      let value=document.getElementById("documentCount").value;
       if(value==""){
          alert("Please enter number of documents to upload");
          return;
       }
      if (uploadedFiles.length == 0) {
        alert("Please upload atleast 1 document.");
        return;
      }

      uploadedFiles.forEach((file, index) => {
        formData.append(`userDocuments[${index}]`, file);
      });

      formData.forEach(element => {
        console.log(element);
      });

      const response = await axios.post("http://localhost:8080/users", formData, {
        auth: {
          username: "omkar",
          password: "omkar2531",
        },
      });
      if (response.status === 201) {
        alert(response.data);
        setState({
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          userImage: null,
        });
        setErrors({});
        setDocumentCount(0);
        setUploadedFiles([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

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

          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" name="userImage" id="image" accept=".png,.jpg" onChange={change} />
            {errors.userImage && <span>{errors.userImage}</span>}
          </div>

          <div>
            <label htmlFor="documentCount">Number of Documents You Want To Upload (1-6):</label>
            <input type="number" id="documentCount" min={1} max={6} value={documentCount} onChange={handleDocumentCountChange} />
          </div>

          {documentCount > 0 && (
            <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px", marginTop: "20px", }}>
              <input {...getInputProps()} accept=".pdf,.doc,.docx" />
              <p>Drag & drop files here, or click to select files</p>
              <p>Maximum files allowed: {documentCount}</p>
              {errors.userDocuments && <span>{errors.userDocuments}</span>}
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div>
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
