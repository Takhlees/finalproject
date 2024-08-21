import React from 'react';

const Reports = () => {
    return (
        <div className="reports-container">
            <h2>Reports</h2>
            <div className="report-card">
                <h3>Monthly Sales</h3>
                <p>Total Sales: $50,000</p>
                <p>Bookings: 300</p>
            </div>
            <div className="report-card">
                <h3>Room Occupancy</h3>
                <p>Average Occupancy: 75%</p>
            </div>
            <div className="report-card">
                <h3>Customer Satisfaction</h3>
                <p>Average Rating: 4.5/5</p>
            </div>
        </div>
    );
};

export default Reports;
