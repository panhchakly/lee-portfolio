import React from 'react';
import { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import RegisterIcon from '../../images/register.png';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index';

function Register() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data , setData] = useState({
      username: "",
      email: "",
      phone: "",
      gender: "",
      department: "",
      password: "",
      confirmPassword: ""
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

      if(data.password !== data.confirmPassword) {
        toast.error("password not match");
        return;
      }

      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
            "Content-Type": "application/json"
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
        navigate('/admin/login');
      }, 2000);
    }
  }
  return (
    <>
    <ToastContainer />
      <div className="auth">
        <form>
          <div className='register-image' style={{textAlign: "center"}}>
            <img src={RegisterIcon} alt="" width={100}/>
          </div>
          <input type="text" placeholder="username" name="username" value={data.username} required onChange={handleOnChange} />
          <input type="email" placeholder="email" name="email" value={data.email} required onChange={handleOnChange} />
          <input type="text" placeholder="phone" name="phone" value={data.phone} required onChange={handleOnChange} />
          <select name="gender" id="gender" value={data.gender} required onChange={handleOnChange}>
            <option value="">--Select Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="department" id="department" value={data.department} required onChange={handleOnChange}>
            <option value="">--Select Department--</option>
            <option value="it">IT</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="sale">Sale</option>
          </select>
          <input type="password" placeholder="password" name="password" value={data.password} required onChange={handleOnChange} />
          <input type="password" placeholder="confirm password" name="confirmPassword" value={data.confirmPassword} required onChange={handleOnChange} />
          <button onClick={handleOnSubmit}>Register</button>
          <span><Link to="/admin/login">Already have an account? Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default Register