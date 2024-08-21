import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEmployees.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    cnic: '',
    contact: '',
    email: '',
    salary: ''
  });

  // Fetch employees from API
  useEffect(() => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Select an employee to view or edit
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
  };

  // Handle employee update
  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    axios.put(`/api/employees/${selectedEmployee.id}`, formData)
      .then(response => {
        setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? response.data : emp));
        setSelectedEmployee(null); // Clear selection after update
      })
      .catch(error => console.error('Error updating employee:', error));
  };

  // Handle employee deletion
  const handleDeleteEmployee = (id) => {
    axios.delete(`/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(emp => emp.id !== id));
        setSelectedEmployee(null); // Clear selection after deletion
      })
      .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <div className="manage-employees">
      <h1>Manage Employees</h1>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>CNIC</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td><img src={employee.image} alt={employee.name} className="employee-image" /></td>
                <td>{employee.cnic}</td>
                <td>{employee.contact}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>
                  <button onClick={() => handleSelectEmployee(employee)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployee && (
        <div className="employee-form">
          <h2>Edit Employee Details</h2>
          <form onSubmit={handleUpdateEmployee}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              CNIC:
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Salary:
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Update Employee</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
