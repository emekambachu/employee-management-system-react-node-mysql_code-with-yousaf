import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

export const Home = () => {
    const navigate = useNavigate();
    const baseApi = import.meta.env.VITE_BASE_API;
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${baseApi}/verify/user`).then(response => {
            if(response.data.success) {
                if(response.data.role === "admin") {
                    navigate("/admin/dashboard");
                }else{
                    navigate("/employee/dashboard");
                }
            }else{
                navigate("/");
            }
        })
    })

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 login-page row">
                <div className="p-3 rounded border login-form col-md-3 col-10">
                    <h1 className="text-center">Login as</h1>
                    <div>
                        <div className="d-flex justify-content-between">
                            <button
                                onClick={() => {navigate('/employee/login')}}
                                type="button"
                                className="btn btn-outline-primary btn-lg">
                                Employee
                            </button>

                            <button
                                onClick={() => {navigate('/admin/login')}}
                                type="button"
                                className="btn btn-outline-warning btn-lg">
                                Admin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}