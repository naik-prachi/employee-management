import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function EditEmployee() {
    const { empID } = useParams(); // Get empID from URL
    const navigate = useNavigate();
    const [empDetail, setEmpDetail] = useState({
        firstName: '',
        lastName: '',
        empEmail: '',
        empDept: ''
    });

    useEffect(() => {
        // Fetch employee data by empID
        axios.get(`http://localhost:3001/getEmployee/${empID}`)
            .then(response => {
                setEmpDetail(response.data); // Populate form with employee data
            })
            .catch(err => console.log(err));
    }, [empID]);

    // Handle form changes
    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEmpDetail({
            ...empDetail,
            [name]: value
        });
    };

    // Handle updated submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update employee details
        axios.put(`http://localhost:3001/editEmployee/${empID}`, empDetail)
            .then(() => {
                navigate('/'); // Redirect to the home page after successful update
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={empDetail.firstName}
                        onChange={handleEdit}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={empDetail.lastName}
                        onChange={handleEdit}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="empEmail"
                        value={empDetail.empEmail}
                        onChange={handleEdit}
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empDept"
                        value={empDetail.empDept}
                        onChange={handleEdit}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditEmployee;
