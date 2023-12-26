// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Link} from'react-router-dom';
import axios from "axios";

export const AdminCategory = () => {

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

    }, []);

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Category List</h3>
            </div>

            <Link
                to="/admin/category/add"
                className="btn btn-success"
                >Add Category
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
                        categories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
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