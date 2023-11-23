# Loyalty Dashboard

Loyalty Dashboard is a React single-page web app that interacts with the Loyalty Tier API to display customer information, order history, and provides actions like approving orders.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/loyalty-dashboard.git

  cd loyalty-dashboard

  npm install

  Open the src/config.js file and replace 'YOUR_API_URL' with the actual URL of your Loyalty Tier API.
  // src/config.js
  const apiUrl = 'YOUR_API_URL'; // Replace with the actual API URL
  export default apiUrl;

  npm start

Usage

    View Order History:
    Visit http://localhost:3000/customer/:customerId/orders in your browser, replacing :customerId with the actual customer ID. This page displays the customer's order history, and you can approve pending orders.

    Approve Order:
        On the Order History page, for each order with a status of "pending," you'll find an "Approve Order" button.
        Click the "Approve Order" button to change the order status to "completed."

    View Customer Information:
        After approving an order, or independently, you can view the customer's information.
        Visit http://localhost:3000/customer/:customerId/info in your browser, replacing :customerId with the actual customer ID.