import './App.css';
import '../src/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";

import {AdminLogin} from "./Components/admin/auth/AdminLogin.jsx";
import {AdminDashboard} from "./Components/admin/AdminDashboard.jsx";

function App() {

  return (
    <>
       <BrowserRouter>
           <Routes>
               <Route path="/admin/login" element={<AdminLogin/>}/>
               <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
           </Routes>
       </BrowserRouter>
    </>
  )

}

export default App
