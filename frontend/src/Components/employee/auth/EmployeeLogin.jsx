import {useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

export const EmployeeLogin = () => {

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

        axios.post('http://localhost:5000/api/employee/login', values, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(response => {
            if(response.data.success) {
                navigate('/employee/dashboard');

            }else{
                if(response.data.validation_errors){
                    console.log('Validation errors:', response.data.validation_errors);
                    setErrors(errors => [
                        ...errors, ...response.data.validation_errors
                    ]);
                }

                if(response.data.server_error){
                    console.log('Server error:', response.data.server_error);
                    setErrors(errors => [
                        ...errors, ...response.data.server_error
                    ]);
                }

                if(response.data.errors){
                    console.log('Errors:', response.data.errors);
                    setErrors(errors => [
                        ...errors, response.data.errors
                    ]);
                }
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
                    <Link
                        className="text-center d-block text-decoration-none text-bg-info rounded-2 mb-2" to="/home"
                    >Home</Link>
                    <h3 className="text-center">Employee Login</h3>

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

                        <button
                            type="submit"
                            className="btn btn-primary rounded-0 mb-2 w-25"
                        >Login</button>

                        <div className="mb-3">
                            <label htmlFor="remember">Remember me:</label>
                            <input
                                className="me-2"
                                type="checkbox"
                                name="remember"
                                id="remember"
                            />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}