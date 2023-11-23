import "../orders-history.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import apiUrl from '../config';
import qs from 'query-string';

const OrderHistoryPage = ({match, location}) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  let customerId = 0;
  if (match.params){
    customerId = match.params.customerId;
  }
  if (location.search){
    customerId = qs.parse(location.search).customerId;
  }

  useEffect(() => {
    // Fetch customer's order history using Axios
    axios.get(`${apiUrl}/customers/${customerId}/orders_since_last_year`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching order history:', error));
  }, [customerId]);

  // Check if orders is an array
  if (!Array.isArray(orders)) {
    console.error('Orders data is not an array:', orders);
    return <div>Error fetching order history</div>;
  }

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Check if currentOrders is an array
  if (!Array.isArray(currentOrders)) {
    console.error('Current orders data is not an array:', currentOrders);
    return <div>Error displaying order history</div>;
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApproveOrder = (orderId) => {
    // API request to approve the order
    axios.post(`${apiUrl}/orders/${orderId}/approve`)
      .then((response) => {
        // Assuming the response includes the updated order
        const updatedOrder = response.data;

        // Update the order status in the local state
        setOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
          );
        });
      })
      .catch((error) => console.error('Error approving order:', error));
  };

  return (
    <div className="container-orders centered">
      <h1>Order History</h1>
      <Link to={`/info?customerId=${customerId}`}>Customer Info</Link>
      <table className="table" id="customers">
        <thead>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </thead>
        <tbody>
        {currentOrders.map((order) => (  
          <tr>
            <td>{order.orderId}</td>
            <td>{order.date}</td>
            <td>{order.status}</td>
            <td>${order.totalInCents}</td>
            <td>
            {order.status === 'pending' && (
              <button className="button" onClick={() => handleApproveOrder(order.id)}>Approve Order</button>
            )}
            </td>

          </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
