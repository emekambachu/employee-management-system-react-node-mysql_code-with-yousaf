// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export const AdminEditEmployee = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {id} = useParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/categories')
            .then(response => {
                if(response.data.success) {
                    setCategories(response.data.categories);
                }else{
                    console.log(response.data.message);
                }

            }).catch(error => console.log(error));

        axios.get('http://localhost:5000/api/admin/employee/' + id)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.employee[0]);

                    const data = response.data.employee[0];
                    // Iterate over the properties of employeeData and update the values state
                    Object.keys(data).forEach(key => {
                        setValues(prevValues => ({
                            ...prevValues,
                            [key]: data[key],
                        }));
                    });

                    // setValues({
                    //     ...values,
                    //     first_name: response.data.employee[0].first_name,
                    //     last_name: response.data.employee[0].last_name,
                    //     email: response.data.employee[0].email,
                    //     mobile: response.data.employee[0].mobile,
                    //     address: response.data.employee[0].address,
                    //     dob: response.data.employee[0].dob,
                    //     salary: response.data.employee[0].salary,
                    //     category_id: response.data.employee[0].category_id
                    // });
                }else{
                    console.log(response.data.message);
                }

            }).catch(error => console.log(error));

    }, []);

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        dob: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    });

    const [errors, setErrors] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "image") {
            setValues({...values, image: e.target.files[0] });
            console.log("image", e.target.files[0]);
        }else{
            setValues({...values, [name]: value });
        }
    };

    const addEmployee = (e) => {
        e.preventDefault();
        console.log('Form values:', values);
        // empty errors array
        setErrors([]);

        const formData = new FormData();
        // Iterate over properties and append to FormData
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        console.log('Form data:', formData);

        axios.post('http://localhost:5000/api/admin/employee/add', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }).then(response => {
            if (response.data.success) {
                console.log('Added:', response.data);
                setFormSubmitted(true);
                navigate('/admin/employees');
            } else {
                console.log('Error occurred:', response.data.message);
                setErrors(errors => [
                    ...errors, response.data.message
                ]);
            }
        }).catch(error => {
            console.error('Addition failed:', error);
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center row">
                <h4 className="mt-3 ml-2">Edit Employee</h4>
                <div className="p-3 mt-4 rounded border login-form col-md-4 col-10">

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

                    {/* Display success message if formSubmitted is true */}
                    {formSubmitted && (
                        <div className="text-center">
                            <p className="text-success bg-white p-1 rounded-1">
                                Employee Added!
                            </p>
                        </div>
                    )}

                    <form onSubmit={addEmployee}>

                        <div className="mb-2">
                            <label htmlFor="first_name">First Name: </label>
                            <input
                                type="text"
                                name="first_name"
                                value={values.first_name}
                                autoComplete="on"
                                placeholder="Enter First Name"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="last_name">Last Name: </label>
                            <input
                                type="text"
                                name="last_name"
                                value={values.last_name}
                                autoComplete="on"
                                placeholder="Enter Last Name"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                autoComplete="on"
                                placeholder="Enter Email Address"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="mobile">Mobile: </label>
                            <input
                                type="text"
                                name="mobile"
                                value={values.mobile}
                                autoComplete="on"
                                placeholder="Enter mobile number"
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
                                autoComplete="off"
                                placeholder="Enter password"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address">Address: </label>
                            <input
                                type="text"
                                name="address"
                                value={values.address}
                                autoComplete="on"
                                placeholder="Enter dddress"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="dob">Date of birth: </label>
                            <input
                                type="date"
                                name="dob"
                                value={values.dob}
                                autoComplete="on"
                                placeholder="Enter date of birth"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="dob">Salary: </label>
                            <input
                                type="text"
                                name="salary"
                                value={values.salary}
                                autoComplete="on"
                                placeholder="Enter Salary"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="category_id">Category: </label>
                            <select
                                className="form-control"
                                name="category_id"
                                value={values.category_id}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.length > 0 && categories.map((category, index) => {
                                        return <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="image">Image: </label>
                            <input
                                type="file"
                                name="image"
                                className="form-control rounded-0"
                                onChange={handleChange}
                            />
                            <img
                                src={`${baseUrl}/uploads/employees/photos/${values.image}`}
                                className="w-50 rounded-0 mx-auto d-block mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary rounded-0 mb-2 w-50 mx-auto d-block"
                        >Add</button>

                    </form>
                </div>
            </div>
        </>
    );
};