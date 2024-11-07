import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'


function Home() {

    const [employees, setEmployees] = useState([]);     // to handle data retrieval
    const [editEmployee, setEditEmployee] = useState(null);  // State to hold the employee being edited
    const [empDetails, setEmpDetails] = useState({ empID: '', firstName: '', lastName: '', empEmail: '', empDept: '' });  // Employee form state


    // use effect to retrieve the data from the db
    useEffect(() => {
        axios.get('http://localhost:3001/getEmployee')
            .then(employees => setEmployees(employees.data))
            .catch(err => console.log(err))
    }, [])

    // to handle navigation to empdetailedit page
    const navigate = useNavigate();


    // to handle edits
    const handleClick = (employee) => {
        setEditEmployee(employee);
        setEmpDetails({ ...employee }); // to populate form with the employee's data
    };

    // to handle details after edits
    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEmpDetails({
            ...empDetails,
            [name]: value
        });
    };

    const handleAddClick = () => {
        navigate('/register');
    }

    // Handle submitting the edited employee data
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/editEmployee/${empDetails.empID}`, empDetails)
            .then(response => {
                const updatedEmployees = employees.map(employee =>
                    employee.empID === empDetails.empID ? empDetails : employee
                );
                setEmployees(updatedEmployees);
                setEditEmployee(null);
                setEmpDetails({ empID: '', firstName: '', lastName: '', empEmail: '', empDept: '' }); // Clear form
            })
            .catch(err => console.log(err));
    };


    // handles record deletion
    function handleDelete(empID) {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

        if (confirmDelete) {
            // send the dlete request to backend to delete the employee
            axios.delete(`http://localhost:3001/deleteEmployee/${empID}`)
                .then(response => {
                    // Remove the deleted employee from the state
                    const updatedEmployees = employees.filter(employee => employee.empID !== empID);
                    setEmployees(updatedEmployees);
                })
                .catch(err => {
                    console.error("Error deleting record:", err);
                    alert("There was an error deleting.");
                });
        }


    }


    return (
        <div className="container-fluid">
            <div>
                <h1 className='text-center mb-7'>Employee Database</h1>
                <div className="mt-5 mb-5">
                    <div className="form">
                        <input placeholder="Search..." type="text" className="form-control" />

                    </div>
                </div>
            </div>
            <div className="container text-center">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className="col">
                                Employee ID
                            </th>
                            <th className="col">
                                First Name
                            </th>
                            <th scope="col">
                                Last Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Department
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee => {
                                return <tr key={employee.empID} >
                                    <td>{employee.empID}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.empEmail}</td>
                                    <td>{employee.empDept}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm "
                                            onClick={() => handleClick(employee)}
                                        >
                                            Edit

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm ms-3 me-3"
                                            type="button"
                                            onClick={() => handleDelete(employee.empID)}
                                        >
                                            Delete

                                        </button>

                                        <button
                                            className="btn btn-primary btn-sm me-3"
                                            type="button"
                                            onClick={handleAddClick}
                                        >
                                            Add

                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* Edit form */}
            {editEmployee && (
                <div className="mt-3">
                    <h3>Edit Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>EmpID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="empID"
                                value={empDetails.empID}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={empDetails.firstName}
                                onChange={handleEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={empDetails.lastName}
                                onChange={handleEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="empEmail"
                                value={empDetails.empEmail}
                                onChange={handleEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                className="form-control"
                                name="empDept"
                                value={empDetails.empDept}
                                onChange={handleEdit}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Employee</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Home;