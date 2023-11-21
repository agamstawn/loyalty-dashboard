import "../orders-history.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistoryPage = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    // Fetch customer's order history using Axios
    axios.get(`http://localhost:3010/api/v1/customers/1/orders_last_year`)
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

  return (
    <div class="container-orders centered">
      <h1>Order History</h1>
      <table class="table" id="customers">
        <thead>
          <th>Order ID</th>
          <th>Date</th>
          <th>Total</th>
        </thead>
        <tbody>
        {currentOrders.map((order) => (  
          <tr>
            <td>{order.orderId}</td>
            <td>{order.date}</td>
            <td>${order.totalInCents / 100}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div class="pagination">
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
