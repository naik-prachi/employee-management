import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

    // handles the states of the variables
    const [empID, setEmpID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empDept, setEmpDept] = useState("");

    const navigate = useNavigate()

    // handles form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/register", { empID, firstName, lastName, empEmail, empDept })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log("Error during registration:", err.response ? err.response.data : err))
        // .catch(err => console.log(err));
    }

    console.log("Rendering AddEmp");

    return (
        
        <div className="mt-3">
            <div className="bg-white p-5 rounded w-30%">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>

                    {/* Employee ID */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Employee ID</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter Employee ID"
                            autoComplete="off"
                            name="empID"
                            className="form-control rounded-0"
                            onChange={(e) => setEmpID(e.target.value)} />
                    </div>

                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>First Name</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter First Name"
                            autoComplete="off"
                            name="firstName"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Last Name</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter Last Name"
                            autoComplete="off"
                            name="lastName"
                            className="form-control rounded-0"
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    {/* Employee Email */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Employee Email</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter the email"
                            autoComplete="off"
                            name="empEmail"
                            className="form-control rounded-0"
                            onChange={(e) => setEmpEmail(e.target.value)} />
                    </div>

                    {/* Employee Department */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Employee Department</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter the department"
                            name="empDept"
                            className="form-control rounded-0"
                            onChange={(e) => setEmpDept(e.target.value)} />
                    </div>

                    {/* submit button */}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        ADD
                    </button>
                </form>

                

                

            </div>
        </div>
    );
}

export default Signup;
