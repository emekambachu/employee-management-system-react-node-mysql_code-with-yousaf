import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const baseAPI = import.meta.env.VITE_BASE_API;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {id} = useParams();

    useEffect(() => {
        getEmployee();
    });

    const getEmployee = () => {
        axios.get(`${baseAPI}/admin/employee/${id}`)
            .then(response => {
                if(response.data.success) {
                    setEmployee(response.data.employee[0]);
                }
            }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Employee Detail</h1>
                    <p>Name: {employee.first_name+' '+employee.last_name}</p>
                    <p>Email: {employee.email}</p>
                    <p>Mobile: {employee.mobile}</p>
                    <p>Salary: {employee.salary}</p>
                    <img
                        src={`${baseUrl}/uploads/employees/photos/${employee.image}`}
                        alt="employee photo"
                        className="rounded-2 w-50"
                    />
                </div>
            </div>
        </div>
    )
}