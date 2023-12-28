// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Link} from'react-router-dom';
import axios from "axios";

export const AdminEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/employees')
            .then(response => {
                if(response.data.success) {
                    setEmployees(response.data.employees);
                }else{
                    console.log(response.data.message);
                }

            }).catch(error => console.log(error));

    }, []);

    const deleteEmployee = (e) => {

        e.preventDefault();
        axios.delete(`http://localhost:5000/api/admin/employees/${id}/delete`)
          .then(response => {
                if(response.data.success) {
                    setEmployees(employees.filter(employee => employee.id !== id));
                }else{
                    console.log(response.data.message);
                }

            }).catch(error => console.log(error));

    }

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>

            <Link
                to="/admin/employee/add"
                className="btn btn-success"
                >Add Employee
            </Link>

            <div className="mt-3">
                <table className="table table-bordered">
                    <thead className="">
                    <tr>
                        <th>SN</th>
                        <th>Bio</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    Name: {`${employee.first_name} ${employee.last_name}`}<br/>
                                    Email: {employee.email}<br/>
                                    Mobile: {employee.mobile}<br/>
                                    Address: {employee.address}<br/>
                                    DOB: {employee.dob}<br/>
                                    Salary: {employee.salary}
                                </td>
                                <td>
                                    <img
                                        className="w-50 rounded-2"
                                        src={`${baseUrl}/uploads/employees/photos/${employee.image}`}
                                    />
                                </td>
                                <td>
                                    <Link to={`/admin/employee/${employee.id}/edit`}>
                                        <button className="btn btn-warning mb-1">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteEmployee(employee.id)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No employees available.
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}