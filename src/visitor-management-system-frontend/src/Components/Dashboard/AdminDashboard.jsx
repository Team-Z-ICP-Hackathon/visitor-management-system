
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCog, faClipboardList, faUserPlus, faChartBar, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [logs, setLogs] = useState([]);
  const [todayCheckIns, setTodayCheckIns] = useState(0);

  useEffect(() => {
    fetchVisitors();
    fetchLogs();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch("/api/admin/getRegisteredVisitors");
      const data = await response.json();
      setVisitors(data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/admin/getCheckInOutLogs");
      const data = await response.json();
      setLogs(data);

      // Calculate today's check-ins
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
      const todayCheckInCount = data.filter(
        (log) => log.checkInTime && log.checkInTime.startsWith(today)
      ).length;
      setTodayCheckIns(todayCheckInCount);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white min-h-screen p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">Admin</div>
        <nav className="space-y-4 flex-grow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            <span>Dashboard</span>
          </div>
          <Link to="/admin/register" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            <span>RegistertedVistors</span>
          </Link>
          <Link to="/admin/check-in" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            <span>Check-In</span>
          </Link>
          <Link to="/admin/check-out" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <span>Check-Out</span>
          </Link>
          <Link to="/admin/user-management" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faUserCog} className="mr-2" />
            <span>Manage Users</span>
          </Link>
        </nav>
        <div className="mt-auto flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <span>Sign Out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500 text-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Visitors</h2>
            <p className="text-3xl">{visitors.length}</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Today's Check-Ins</h2>
            <p className="text-3xl">{todayCheckIns}</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Logs</h2>
            <p className="text-3xl">{logs.length}</p>
          </div>
        </div>

        {/* Registered Visitors Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Registered Visitors</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">User Id</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="bg-gray-100">
                  <td className="border px-4 py-2">{visitor.name}</td>
                  <td className="border px-4 py-2">{visitor.email}</td>
                  <td className="border px-4 py-2">{visitor.phone}</td>
                  <td className="border px-4 py-2">{visitor.userid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Check-In/Out Logs Table */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Check-In/Check-Out Logs</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Check-In Time</th>
                <th className="px-4 py-2">Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.userId} className="bg-gray-100">
                  <td className="border px-4 py-2">{log.userId}</td>
                  <td className="border px-4 py-2">
                    {log.checkInTime ? new Date(log.checkInTime).toLocaleString() : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {log.checkOutTime ? new Date(log.checkOutTime).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
