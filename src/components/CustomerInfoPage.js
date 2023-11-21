import "../customer-info.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerInfoPage = ({ customerId }) => {
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Fetch customer information using Axios
    // Update the URL with your actual endpoint
    axios.get(`http://localhost:3010/api/v1/customers/1`)
      .then((response) => setCustomerInfo(response.data))
      .catch((error) => console.error('Error fetching customer information:', error));
  }, [customerId]);

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  // Calculate progress towards the next tier
  const progressPercentage = (customerInfo.amount_spent_since_start_date / customerInfo.next_tier_amount) * 100;
  // const progressPercentage = 10;

  const progressBarStyle = {
    width: `${progressPercentage}%`,
    backgroundColor: progressPercentage >= 100 ? 'green' : 'yellow',
    height: '20px',
    borderRadius: '5px',
  };

  return (
    <div class="card centered">
      <div class="container">
        <h1>Customer Information</h1>
        <table class="centered">
          <tr>
            <td>Current Tier</td>
            <td>:</td>
            <td> {customerInfo.current_tier}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>:</td>
            <td> {customerInfo.start_date}</td>
          </tr>
          <tr>
            <td>Amount Spent Since Start Date</td>
            <td>:</td>
            <td>${customerInfo.amount_spent_since_start_date}</td>
          </tr>
          <tr>
            <td>Amount to Reach Next Tier</td>
            <td>:</td>
            <td>${customerInfo.next_tier_amount}</td>
          </tr>
          <tr>
            <td>Downgrade Info</td>
            <td>:</td>
            <td> {customerInfo.downgrade_next_year}</td>
          </tr>
        </table>
        <p>Progress Towards Next Tier</p>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
          <div style={progressBarStyle}>
            <span> {progressPercentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
