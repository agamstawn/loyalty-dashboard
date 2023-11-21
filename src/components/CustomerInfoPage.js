import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerInfoPage = ({ customerId }) => {
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Fetch customer information using Axios
    // Update the URL with your actual endpoint
    axios.get(`http://localhost:3010/api/v1/customers/${customerId}`)
      .then((response) => setCustomerInfo(response.data))
      .catch((error) => console.error('Error fetching customer information:', error));
  }, [customerId]);

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  // Calculate progress towards the next tier
  const progressPercentage = (customerInfo.amount_spent_since_start_date / customerInfo.next_tier_amount) * 100;

  const progressBarStyle = {
    width: `${progressPercentage}%`,
    backgroundColor: progressPercentage >= 100 ? 'green' : 'yellow',
    height: '20px',
    borderRadius: '5px',
  };

  return (
    <div>
      <h1>Customer Information</h1>
      <p>Current Tier: {customerInfo.current_tier}</p>
      <p>Amount Spent Since Start Date: ${customerInfo.amount_spent_since_start_date}</p>
      <p>Amount to Reach Next Tier: ${customerInfo.next_tier_amount}</p>
      <p>Downgrade Info: {customerInfo.downgrade_next_year}</p>
      <div style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
        <div style={progressBarStyle}>
          <span>Progress Towards Next Tier: {progressPercentage.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
