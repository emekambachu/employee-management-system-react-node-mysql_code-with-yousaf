// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import axios from "axios";

export const AdminAddCategory = () => {
    const [values, setValues] = useState({
        name: "",
    });

    const [errors, setErrors] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const addCategory = (e) => {
        e.preventDefault();
        console.log('Form values:', values);
        // empty errors array
        setErrors([]);

        axios.post('http://localhost:5000/api/admin/category/add', values, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data.success) {
                console.log('Category Added:', response.data);
                setFormSubmitted(true);
            } else {
                console.log('Error occurred:', response.data);
                setErrors(errors => [
                    ...errors, response.data.message
                ]);
            }
        }).catch(error => {
            console.error('Category addition failed:', error);
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center row">
                <h4 className="mt-3 ml-2">Add Category</h4>
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
                            <p className="text-success">Category Added!</p>
                        </div>
                    )}

                    <form onSubmit={addCategory}>
                        <div className="mb-2">
                            <label htmlFor="name">Category Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                autoComplete="on"
                                placeholder="Enter Category Name"
                                className="form-control rounded-0"
                                onChange={handleChange}
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