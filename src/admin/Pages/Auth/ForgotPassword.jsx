import React, { useEffect, useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordIcon from '../../images/forgot-password.png';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index';
function ForgotPassword() {
  const [timeLeft, setTimeLeft] = useState(25);
  const [showVerify , setShowVerify] = useState(false);
  const [showBtnSubmit , setShowBtnSubmit] = useState(true);
  const [data , setData] = useState({
      email: "",
      code: "",
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
      if(showVerify){
        console.log(typeof(data.code));
        // check if code is empty
        if(data.code === ""){
          toast.error("Please enter code");
          return;
        }
        // check if password is empty
        if(data.password === "" || data.confirmPassword === ""){
          toast.error("Please enter password");
          return;
        }
      }
      else{
        // check if email is empty
        if(data.email === ""){
          toast.error("Please enter email");
          return;
        }
      }
      if(data.password !== data.confirmPassword){
          toast.error("password not match");
          return;
      }
      let fetchURL = SummaryApi.forgotPassword.url;
      let fetchMethod = SummaryApi.forgotPassword.method;
      if(showVerify){
        fetchURL = SummaryApi.verifyCode.url;
        fetchMethod = SummaryApi.verifyCode.method;
      }
      const dataResponse = await fetch(fetchURL, {
          method: fetchMethod,
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email: data.email,
              code: parseInt(data.code),
              password: data.password,
              confirmPassword: data.confirmPassword
          })
      });

      const response = await dataResponse.json();
      if(response.name || response.success === false) {
        if(showVerify){
          setShowVerify(false);
          if(response.message === "too many attempts"){
            setShowBtnSubmit(false);
            // set timeout for 5 seconds to show submit button
            setTimeout(() => {
              setShowBtnSubmit(true);
            }, 25000);
          }
        }
        toast.error(response.message);
      }else{
        if(showVerify){
          toast.success(response.message);
          setShowVerify(false);
          setTimeout(() => {
            navigate('/admin/login');
          }, 2000);
        }else{
          if(response.data?.code){
            setShowVerify(true);
            toast.success(response.message+": "+response.data?.code);
          }else{
            toast.error('Something went wrong');
          }
        }
      }
  };
  useEffect(() => {
    if(!showBtnSubmit){
      // console.log(timeLeft);
      const timer = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });
  return (
    <>
      <ToastContainer />
      <div className="auth">
        <form>
          <div className='forget-password-image' style={{textAlign: "center"}}>
            <img src={ForgotPasswordIcon} alt="" width={100}/>
          </div>
          {!showVerify && <input type="email" placeholder="email" name="email" value={data.email} onChange={handleOnChange} required />}
          {showVerify && <input type="number" placeholder="code" name="code" value={data.code} onChange={handleOnChange} />}
          {showVerify && <input type="password" placeholder="password" name="password" value={data.password} onChange={handleOnChange} />}
          {showVerify && <input type="password" placeholder="confirm password" name="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} />}
          {showBtnSubmit && <button onClick={handleOnSubmit}>Submit</button>}
          <span style={{color: "red", fontWeight: "bold", textAlign: "center"}}>
            {!showBtnSubmit && "You have many failed attempts, Please wait... "+timeLeft}
          </span>
          <span><Link to="/admin/login">Oh!... I remember my password. Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword