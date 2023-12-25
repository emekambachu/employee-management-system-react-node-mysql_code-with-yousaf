// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Link} from'react-router-dom';

export const AdminCategory = () => {
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
        </div>
    )
}