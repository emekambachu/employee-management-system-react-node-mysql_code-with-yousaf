import './App.css';
import '../src/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";

import {AdminLogin} from "./Components/admin/auth/AdminLogin.jsx";
import {AdminDashboard} from "./Components/admin/AdminDashboard.jsx";
import {AdminHome} from "./Components/admin/AdminHome.jsx";
import {AdminEmployee} from "./Components/admin/employees/AdminEmployee.jsx";
import {AdminCategory} from "./Components/admin/categories/AdminCategory.jsx";
import {AdminProfile} from "./Components/admin/AdminProfile.jsx";
import {AdminAddCategory} from "./Components/admin/categories/AdminAddCategory.jsx";
import {AdminAddEmployee} from "./Components/admin/employees/AdminAddEmployee.jsx";
import {AdminEditEmployee} from "./Components/admin/employees/AdminEditEmployee.jsx";
import {AdminEdit} from "./Components/admin/admin/AdminEdit.jsx";

function App() {

  return (
    <>
       <BrowserRouter>
           <Routes>
               <Route path="/admin/login" element={<AdminLogin/>}></Route>
               <Route path="/admin" element={<AdminDashboard/>}>
                   <Route
                       path='/admin/dashboard'
                       element={<AdminHome/>}
                   ></Route>
                   <Route
                       path='/admin/employees'
                       element={<AdminEmployee/>}
                   ></Route>
                   <Route
                       path='/admin/employee/add'
                       element={<AdminAddEmployee/>}
                   ></Route>
                   <Route
                       path='/admin/employee/:id/edit'
                       element={<AdminEditEmployee/>}
                   ></Route>
                   <Route
                       path='/admin/categories'
                       element={<AdminCategory/>}
                   ></Route>
                   <Route
                       path='/admin/category/add'
                       element={<AdminAddCategory/>}
                   ></Route>
                   <Route
                       path='/admin/profile'
                       element={<AdminProfile/>}
                   ></Route>
                   <Route
                       path='/admin/:id/edit'
                       element={<AdminEdit/>}
                   ></Route>
               </Route>
           </Routes>
       </BrowserRouter>
    </>
  )

}

export default App
