import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import LoginIcon from '../../images/login.png';
function Login() {
  return (
    <>
      <div className="auth">
        <form>
          <div className='login-image' style={{textAlign: "center"}}>
            <img src={LoginIcon} alt="" width={100}/>
          </div>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {/* forget password */}
          <span><Link to="/admin/forgot-password">Forgot password?</Link></span>
          <button>Login</button>
          {/* register */}
          <span><Link to="/admin/register">Don't have an account? Register</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login