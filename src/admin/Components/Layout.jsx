import { themeContext } from "../../Context";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  /**
  * s%3Amjl6f2tpuEZklBSa84sz2huQL2eKFjZd.NNKuC5yfinNpVQ42StVp2M3RUPlQFyBPpWu84EuSMCM
  * get session = mjl6f2tpuEZklBSa84sz2huQL2eKFjZd
  */

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    return (
      <div className="App"
        style={{ 
          background: darkMode ? 'black' : '',
          color: darkMode ? 'white' : '',
          padding: '0'
          }}>
        <ToastContainer />
        <Header />
        <Footer />
      </div>
    );
}

export default Layout