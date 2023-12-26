// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Link} from'react-router-dom';
import axios from "axios";

export const AdminEmployee = () => {

    const [employees, setEmployees] = useState([]);

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
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.length > 0 && employees.map((employer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{`${employer.first_name} ${employer.last_name}`}</td>
                                <td>
                                    {/*<Link*/}
                                    {/*    to={`/admin/category/edit/${category._id}`}*/}
                                    {/*    className="btn btn-primary"*/}
                                    {/*    >Edit</Link>*/}
                                    {/*<button*/}
                                    {/*    className="btn btn-danger"*/}
                                    {/*    onClick={() => deleteCategory(category._id)}*/}
                                    {/*    >Delete</button>*/}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}