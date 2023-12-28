// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export const AdminHome = () => {

    const [adminTotal, setAdminTotal] = useState(0);
    const [employeesTotal, setEmployeesTotal] = useState(0);
    const [salariesTotal, setSalariesTotal] = useState(0);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        adminCount();
        employeesCount();
        salariesCount();
        getAdmins();
    }, []);

    const adminCount = () => {
        axios.get('http://localhost:5000/api/admin/count')
            .then(response => {
            if(response.data.success) {
                setAdminTotal(response.data.total_admin);
            }
        })
    }

    const employeesCount = () => {
        axios.get('http://localhost:5000/api/admin/employees/count')
            .then(response => {
                if(response.data.success) {
                    setEmployeesTotal(response.data.total_employees);
                }
            })
    }

    const salariesCount = () => {
        axios.get('http://localhost:5000/api/admin/salaries/count')
            .then(response => {
                if(response.data.success) {
                    setSalariesTotal(response.data.total_salaries);
                }
            })
    }

    const getAdmins = () => {
        axios.get('http://localhost:5000/api/admin/all')
            .then(response => {
                if(response.data.success) {
                    setAdmins(response.data.admins);
                }
            }).catch(error => {
                console.log(error);

        })
    }

    const deleteAdmin = (id) => {

    }

    return (
        <div>
            <div className="p-3 d-flex justify-content-around mt-3">

                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Admin</h4>
                    </div>
                    <hr />
                    <div className="">
                        <h5>Total: {adminTotal}</h5>
                    </div>
                </div>

                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Employee</h4>
                    </div>
                    <hr />
                    <div className="">
                        <h5>Total: {employeesTotal}</h5>
                    </div>
                </div>

                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className="">
                        <h5>Total: {salariesTotal}</h5>
                    </div>
                </div>

            </div>

            <div className="mt-4 px-5 pt-3">
                <h3>List of Admins</h3>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Bio</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                       admins.length > 0 ? ( admins.map((admin, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        Email: {admin.email}
                                    </td>
                                    <td>
                                        <Link className="mx-2" to={`/admin/${admin.id}/edit`}>
                                            <button className="btn btn-warning">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteAdmin(admin.id)}
                                            className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })) : (
                            <tr>
                                <td colSpan="3" className="text-center">No Data</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}