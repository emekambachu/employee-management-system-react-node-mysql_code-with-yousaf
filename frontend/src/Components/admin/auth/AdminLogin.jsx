import {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const submitLogin = (e) => {
        e.preventDefault();
        console.log('Form values:', values);

        // empty errors array
        setErrors(() => []);

        axios.post('http://localhost:5000/api/admin/login', values, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(response => {
            if(response.data.success) {
                console.log('Login successful:', response.data);
                navigate('/admin/dashboard');

            }else{
                console.log('Login failed:', response.data);
                setErrors(errors => [
                    ...errors, response.data.error_message
                ]);
            }

        }).catch(error => {
            console.error('Login failed:', error);
        });

        console.log('Errors:', errors);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 login-page row">
                <div className="p-3 rounded border login-form col-md-3 col-10">
                    <h1>Login Page</h1>

                    {/* Display errors if any */}
                    {errors.length > 0 && (
                        <div className="text-center">
                            {errors.map((error, index) => (
                                <p className="text-danger" key={index}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={submitLogin}>
                        <div className="mb-2">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                autoComplete="off"
                                placeholder="Enter Email"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                placeholder="Enter Password"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary rounded-0 mb-2 w-25">Login</button>

                        <div className="mb-3">
                            <label htmlFor="remember">Remember me:</label>
                            <input className="me-2" type="checkbox" name="remember" id="remember" />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}