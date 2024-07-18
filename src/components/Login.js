import axios from 'axios';
import React, { useState } from 'react';
import { Link ,Navigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from '..';
import { useContext } from 'react';

const Login = () => {
    const {isauthenticated,setisauthenticated,loader,setloader}=useContext(Context);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
 
    const handleLogin = async (e) => {
        e.preventDefault();
        setloader(true);
        try {
          const { data } = await axios.post("http://localhost:8000/api/v1/users/login",
            {
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
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // autoComplete="email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // autoComplete="current-password"
                    />

                    <button disabled={loader} type="submit" className='auth-btn'>Login</button>
                    <Link to="/register">Create an account</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
