import React from 'react';

const UserManagement = () => {
    return (
        <div className="table-container">
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td>Admin</td>
                        <td>Active</td>
                        <td><button>Edit</button></td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td>Staff</td>
                        <td>Inactive</td>
                        <td><button>Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
