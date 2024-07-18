import React, { useState } from 'react';
import { Link , Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { Context } from '..';
import { useContext } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isauthenticated,setisauthenticated,loader,setloader}=useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/users/register",
        {
          name,
          email,
          password
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      toast.success(data.message);
      setisauthenticated(true);
      setloader(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
      setisauthenticated(false);
      setloader(false);
    }
  };
if(isauthenticated) return <Navigate to={"/"}/>;
  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button disabled={loader} type="submit" className='auth-btn'>Sign In</button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
