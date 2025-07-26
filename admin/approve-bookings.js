import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ApproveBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/pending');
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/api/bookings/status/${id}`, { status });
      fetchBookings(); // refresh
    } catch (err) {
      console.error('Failed to update booking status', err);
    }
  };

  useEffect(() => {
    fetchBookings();
     const role = localStorage.getItem('role');
  if (role !== 'admin') {
    window.location.href = '/login';
  }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Booking Approvals</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 border rounded shadow">
              <p><strong>User:</strong> {b.user?.username}</p>
              <p><strong>Franchise:</strong> {b.franchise?.name}</p>
              <p><strong>Receiver:</strong> {b.receiver_name}</p>
              <p><strong>Destination:</strong> {b.destination_address}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleStatusUpdate(b.id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleStatusUpdate(b.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
