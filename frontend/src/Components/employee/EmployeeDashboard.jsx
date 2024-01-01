// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export const EmployeeDashboard = () => {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const baseApi = import.meta.env.VITE_BASE_API;

    const logout = () => {
        axios.post(`${baseApi}/employee/logout`)
            .then(response => {
                if(response.data.success) {
                    navigate("/employee/login");
                }else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">

                <div className="col-auto col-md-3 col-xl-2 px-sm-2 pc-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/admin"
                            className="d-flex align-items-center pb-3 mb-md-1 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                CWC
                            </span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">
                            <li className="w-100">
                                <Link
                                    to="/admin/dashboard"
                                    className="nav-link text-white px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>

                            <li className="w-100" onClick={logout}>
                                <Link to=""
                                      className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-box-arrow-right ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h3>Employee Dashboard</h3>
                    </div>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}