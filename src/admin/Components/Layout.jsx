import { themeContext } from "../../Context";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MasterPages from "./MasterPages";
import Navbar from "./Navbar";

function Layout() {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    return (
      <div className="App"
        style={{ 
          background: darkMode ? 'black' : '',
          color: darkMode ? 'white' : ''
          }}>
        <Header />
        <Navbar />
        <MasterPages />
        <Footer />
      </div>
    );
}

export default Layout