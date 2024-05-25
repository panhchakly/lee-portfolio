import React from 'react';
import './Auth.css';
import VerifyCodeIcon from '../../images/verify.png';
function VerifyCode() {
  return (
    <>
      <div className="auth">
        <form>
          <div className='v-code-image' style={{textAlign: "center"}}>
            <img src={VerifyCodeIcon} alt="" width={100}/>
          </div>
          <input type="text" placeholder="code" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}

export default VerifyCode