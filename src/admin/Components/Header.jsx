import React, { useEffect, useState } from 'react';
import SummaryApi from "../common";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProfileIcon from '../images/profile.jpg';
import NotificationIcon from '../images/notification.png';
import MasterPages from './MasterPages';
import User from '../Pages/User/User';
import History from '../Pages/User/History';
import Session from '../Pages/User/Session';

function Header() {
    const [navigated, setNavigate] = useState(false);
    const [showMasterPages, setShowMasterPages] = useState('');
    const navigate = useNavigate();
    const [data , setData] = useState({
        username: "",
        email: "",
        department: "",
    });

    useEffect(() => {
      const getMe = async () => {
        const dataResponse = await fetch(SummaryApi.getMe.url, {
          method: SummaryApi.getMe.method,
          credentials: 'include',
          headers: {
              "Content-Type": "application/json"
          }
        });
    
        const response = await dataResponse.json();
        // console.log(response);
        if(response.name || response.success === false) {
          // window.location.replace("/admin/login");
          setNavigate(true);
        }else{
          // toast.success(response.message);
          // console.log(response);
          Cookies.set('token', response.data.token);
          Cookies.set('user', response.data.user);
          setData({
            username: response.data.user.username,
            email: response.data.user.email,
            department: response.data.user.department
          });
        }
      }
      getMe();
    }, []);
    // use that to prevent warning when use Hooks used in useEffect
    if(navigated) {
      navigate('/admin/login');
    }

    // logout function
    const logout = async () => {
      const dataResponse = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
      });
  
      const response = await dataResponse.json();
      if(response.name || response.success === false) {
        // toast.error(response.message);
        console.log(response.message);
      }else{
        // toast.success(response.message);
        navigate('/admin/login');
      }
    }

    // get pages
    const getPages = async (items) => {
      const pages_list = {
        'users': <User />, 
        'sessions': <Session />,
        'history': <History />
      };
      setShowMasterPages(pages_list[items]);
    }
  return (
    <>
      <div className="header" style={{display: 'flex', justifyContent: 'space-between', padding: '0'}}>
        <div className="header-left" style={{
          backgroundColor: 'var(--gray)',
          height: '100vh',
          width: '15%',
          }}>
          <div className="header-logo" style={{ 
            textAlign: 'center'
            }}>
            <img src={ProfileIcon} alt="logo" 
            style={{
              borderRadius: '50%', 
              objectFit: 'cover', 
              objectPosition: 'center', 
              height: '80px', 
              width: '80px',
              border: '2px solid var(--orange)'
              }}/>
            <h3 style={{
              backgroundColor: 'var(--orange)', 
              color: 'white', 
              padding: '5px 0 5px 0'
              }} title={data.email}>{data.username}</h3>
            <h1 style={{
              borderBottom: '2px solid var(--orange)', 
              padding: '0 0 10px 0',
              color: 'var(--orange)'
              }}>
              {data.department.toUpperCase()} Department
            </h1>
          </div>
          <div className="header-menu">
            <ul style={{listStyle: 'none', padding: '0 10px 0 10px'}}>
              <li style={{margin: '10px 0 10px 0', color: '#fff', cursor: 'pointer'}}
              onClick={ () => getPages('users') }>
                Users Management
                </li>
              <li style={{margin: '10px 0 10px 0', color: '#fff', cursor: 'pointer'}}
              onClick={ () => getPages('sessions') }>
                Session Devices
                </li>
              <li style={{margin: '10px 0 10px 0', color: '#fff', cursor: 'pointer'}}
              onClick={ () => getPages('history') }>
                History
                </li>
            </ul>
          </div>
          <div className="header-btn" style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            }}>
            <button className="btn-logout" onClick={logout} style={{
              fontSize: '16px',
              position: 'absolute',
              margin: 0,
              bottom: 15
            }}>Logout</button>
          </div>
        </div>
        <div className="header-right" style={{
          width: '85%',
          backgroundColor: 'var(--gray)',
          borderLeft: '2px solid var(--orange)',
          height: 'fit-content',
          }}>
          <div className="header-notification"
          style={{color: 'var(--orange)', alignItems: 'right', justifyContent: 'right', display: 'flex'}}
          >
            <img src={NotificationIcon} alt="notification" 
            style={{
              borderRadius: '50%', 
              objectFit: 'cover', 
              objectPosition: 'center', 
              height: '30px', 
              width: '30px',
              border: '2px solid var(--orange)',
              marginRight: '10px',
              cursor: 'pointer'
              }}/>
          </div>
        </div>
      </div>
      {showMasterPages && <MasterPages pages={showMasterPages} />}
      {!showMasterPages && <MasterPages pages={'Welcome to Dashboard'} />}
    </>
  )
}

export default Header