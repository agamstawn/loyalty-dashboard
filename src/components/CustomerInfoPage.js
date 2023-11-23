import "../customer-info.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import apiUrl from '../config';
import qs from 'query-string';

const CustomerInfoPage = ({match, location}) => {
  const [customerInfo, setCustomerInfo] = useState(null);
  let customerId = 0;
  if (match.params){
    customerId = match.params.customerId;
  }
  if (location.search){
    customerId = qs.parse(location.search).customerId;
  }
  console.log(customerId, match.params.customerId, qs.parse(location.search).customerId, location);
  useEffect(() => {
  // const {customerId} =  qs.parse(location.search) || match.params;
  // console.log(customerId, location.search, match.params);
    // Fetch customer information using Axios
    // Update the URL with your actual endpoint
    axios.get(`${apiUrl}/customers/${customerId}`)
      .then((response) => setCustomerInfo(response.data))
      .catch((error) => console.error('Error fetching customer information:', error));
  }, [customerId]);

  if (!customerInfo) {
    return <div>Loading...</div>;
  }
  
  // Calculate progress towards the next tier
  let progressPercentage = (customerInfo.amount_this_year / customerInfo.next_tier_amount) * 100;
  
  // For handling infinity progress precentage
  if(customerInfo.next_tier_amount == 0){
    progressPercentage = 100
  }
  console.log(customerInfo.amount_this_year, customerInfo.next_tier_amount);
  
  const progressBarStyle = {
    width: `${progressPercentage}%`,
    backgroundColor: progressPercentage >= 100 ? 'green' : 'yellow',
    height: '20px',
    borderRadius: '5px',
  };

  return (
    <div className="card centered">
      <div className="container">
        <h1>Customer Information</h1>
        <table className="centered">
          <tbody>
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
          </tbody>
        </table>
        <p>Progress Towards Next Tier</p>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
          <div style={progressBarStyle}>
            <span> {progressPercentage.toFixed(2)}%</span>
          </div>
        </div>
        <Link to={`/orders_since_last_year?customerId=${customerId}`}>Order History</Link>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
