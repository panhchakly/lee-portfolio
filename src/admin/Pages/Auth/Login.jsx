import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import LoginIcon from '../../images/login.png';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index';
function Login() {
  const [data , setData] = useState({
      email: "",
      password: "",
  });
  const handleOnChange = (e) => {
      const {name, value} = e.target
      setData({
          ...data,
          [name]: value
      })
  };
  const navigate = useNavigate();
  const handleOnSubmit = async(e) => {
      e.preventDefault();
      let getIP = await fetch("https://api.ipify.org/?format=json");
      getIP = await getIP.json();
      const dataResponse = await fetch(SummaryApi.login.url, {
          method: SummaryApi.login.method,
          headers: {
              "Content-Type": "application/json",
              "device": "web",
              "platform": "web",
              "version": "1.0.0",
              "ip": getIP.ip
          },
          body: JSON.stringify(data)
      });

      const response = await dataResponse.json();
      if(response.name || response.success === false) {
        toast.error(response.message);
      }else{
        toast.success(response.message);
        // delay for 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      }
  }
  return (
    <>
    <ToastContainer />
      <div className="auth">
        <form>
          <div className='login-image' style={{textAlign: "center"}}>
            <img src={LoginIcon} alt="" width={100}/>
          </div>
          <input type="email" placeholder="email" onChange={handleOnChange} name="email" value={data.email} required />
          <input type="password" placeholder="password" onChange={handleOnChange} name="password" value={data.password} required />
          {/* forget password */}
          <span><Link to="/admin/forgot-password">Forgot password?</Link></span>
          <button onClick={handleOnSubmit}>Login</button>
          {/* register */}
          <span><Link to="/admin/register">Don't have an account? Register</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login