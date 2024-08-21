import React from 'react';

const Settings = () => {
    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="hotelName">Hotel Name:</label>
                    <input type="text" id="hotelName" placeholder="Enter hotel name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter new password" />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
