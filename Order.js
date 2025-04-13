import React, { useEffect, useState } from 'react';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order Details</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Order ID</th>
              <th style={styles.tableCell}>Customer Name</th>
              <th style={styles.tableCell}>Email</th>
              <th style={styles.tableCell}>Phone</th>
              <th style={styles.tableCell}>Address</th>
              <th style={styles.tableCell}>Total Amount</th>
              <th style={styles.tableCell}>Payment Method</th>
              <th style={styles.tableCell}>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
  {orders
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by newest first
    .map((order) => {
      const totalQuantity = JSON.parse(order.cart).reduce((sum, item) => sum + item.quantity, 0);
      return (
        <tr key={order.id} style={styles.tableRow}>
          <td style={styles.tableCell}>{order.id}</td>
          <td style={styles.tableCell}>{order.customer_name}</td>
          <td style={styles.tableCell}>{order.customer_email}</td>
          <td style={styles.tableCell}>{order.customer_phone}</td>
          <td style={styles.tableCell}>{order.customer_address}</td>
          <td style={styles.tableCellAmount}>₹{order.total_amount}</td>
          <td style={styles.tableCell}>{order.payment_method}</td>
          <td style={styles.tableCell}>{totalQuantity}</td> {/* Show total quantity as a number */}
        </tr>
      );
    })}
</tbody>

        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '25px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '1300px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1rem',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
  tableCellAmount: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#28a745',
    fontWeight: 'bold',
  },
  tableRow: {
    backgroundColor: '#fff',
    transition: 'background-color 0.2s ease-in-out',
  },
  tableRowAlternate: {
    backgroundColor: '#f9f9f9',
  },
  tableRowHover: {
    backgroundColor: '#e9ecef',
  },
};




export default Order;
