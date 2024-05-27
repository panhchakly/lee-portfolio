import { themeContext } from "../../Context";
import { useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MasterPages from "./MasterPages";
import Navbar from "./Navbar";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from "../common";

function Layout() {
  /**
  * s%3Amjl6f2tpuEZklBSa84sz2huQL2eKFjZd.NNKuC5yfinNpVQ42StVp2M3RUPlQFyBPpWu84EuSMCM
  * get session = mjl6f2tpuEZklBSa84sz2huQL2eKFjZd
  */
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
        console.log(response);
        if(response.name || response.success === false) {
          window.location.replace("/admin/login");
        }else{
          toast.success(response.message);
        }
      }
      getMe();
    }, []);

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
        toast.error(response.message);
      }else{
        toast.success(response.message);
      }
    }

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    return (
      <div className="App"
        style={{ 
          background: darkMode ? 'black' : '',
          color: darkMode ? 'white' : ''
          }}>
        <ToastContainer />
        <button onClick={logout}>Logout</button>
        <Header />
        <Navbar />
        <MasterPages />
        <Footer />
      </div>
    );
}

export default Layout