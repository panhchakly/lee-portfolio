import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./client";
import Admin from "./admin";
import NotFound from "./NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Client />} />
          <Route path="admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
