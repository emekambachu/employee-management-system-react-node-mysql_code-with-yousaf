import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

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