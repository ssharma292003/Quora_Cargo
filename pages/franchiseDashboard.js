import React, { useEffect, useState } from 'react';
import FranchiseHeader from '../components/franchiseHeader';
import axios from 'axios';

export default function FranchiseDashboard() {
  const [shipments, setShipments] = useState([]);
  const franchiseId = localStorage.getItem('franchiseId'); // Ensure it's stored at login

  useEffect(() => {
    if (franchiseId) {
      axios.get(`http://localhost:5000/api/shipments/franchise/${franchiseId}`)
        .then((res) => setShipments(res.data))
        .catch((err) => console.error('Failed to fetch shipments:', err));
    }
  }, [franchiseId]);

  return (
    <div className="container mt-4">
      <h2>Franchise Dashboard</h2>
      <table className="table table-bordered">
        <thead>
          <FranchiseHeader />
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td>{s.trackingNumber}</td>
              <td>{s.senderName}</td>
              <td>{s.receiverName}</td>
              <td>{s.status}</td>
              <td>{new Date(s.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
