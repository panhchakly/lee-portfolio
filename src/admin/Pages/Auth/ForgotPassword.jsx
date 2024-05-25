import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import ForgotPasswordIcon from '../../images/forgot-password.png';
function ForgotPassword() {
  return (
    <>
      <div className="auth">
        <form>
          <div className='forget-password-image' style={{textAlign: "center"}}>
            <img src={ForgotPasswordIcon} alt="" width={100}/>
          </div>
          <input type="email" placeholder="email" />
          <button>Submit</button>
          <span><Link to="/admin/login">Oh!... I remember my password. Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword