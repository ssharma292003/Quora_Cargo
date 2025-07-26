// app/admin/layout.js or pages/admin/index.js
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link href="/admin/booking-requests" className="text-gray-700 hover:text-blue-600">
            Booking Requests
          </Link>
          <Link href="/admin/shipments" className="text-gray-700 hover:text-blue-600">
            Shipments
          </Link>
          <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
