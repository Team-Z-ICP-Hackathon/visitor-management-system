import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserCog,
  faClipboardList,
  faUserPlus,
  faChartBar,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [logs, setLogs] = useState([]);
  const [todayCheckIns, setTodayCheckIns] = useState(0);
  const [todayCheckOuts, setTodayCheckOuts] = useState(0);

  useEffect(() => {
    fetchVisitors();
    fetchLogs();
  }, []);

  const fetchVisitors = async () => {
    const dummyVisitors = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", userid: "JD123" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7891", userid: "JS456" },
      { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "123-456-7892", userid: "AJ789" },
      { id: 4, name: "Bob Brown", email: "bob.brown@example.com", phone: "123-456-7893", userid: "BB012" },
      { id: 5, name: "Charlie Black", email: "charlie.black@example.com", phone: "123-456-7894", userid: "CB345" },
    ];
    setVisitors(dummyVisitors);
  };

  const fetchLogs = async () => {
    const dummyLogs = [
      { userId: "JD123", checkInTime: "2024-11-23T08:30:00Z", checkOutTime: "2024-11-23T16:30:00Z" },
      { userId: "JS456", checkInTime: "2024-11-23T09:00:00Z", checkOutTime: "2024-11-23T17:00:00Z" },
      { userId: "AJ789", checkInTime: "2024-11-23T08:45:00Z", checkOutTime: "2024-11-23T15:30:00Z" },
      { userId: "BB012", checkInTime: "2024-11-22T10:00:00Z", checkOutTime: "2024-11-22T18:00:00Z" },
      { userId: "CB345", checkInTime: "2024-11-22T11:30:00Z", checkOutTime: null },
    ];

    // Validate logs: Filter out logs with incomplete or mismatched data
    const validLogs = dummyLogs.filter(log => log.checkInTime && log.checkOutTime);
    setLogs(validLogs);

    // Calculate today's date
    const today = new Date().toISOString().split("T")[0];

    // Today's Check-Ins and Check-Outs
    const checkInsToday = validLogs.filter(log => log.checkInTime.startsWith(today)).length;
    const checkOutsToday = validLogs.filter(log => log.checkOutTime.startsWith(today)).length;

    setTodayCheckIns(checkInsToday);
    setTodayCheckOuts(checkOutsToday);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white min-h-screen p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">Admin Name</h2>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
        <nav className="space-y-4 flex-grow">
          <Link to="/admin/dashboard" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Dashboard
          </Link>
          <Link to="/admin/register" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Registered Visitors
          </Link>
          <Link to="/admin/check-in" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Visitor Check-In
          </Link>
          <Link to="/admin/check-out" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Visitor Check-Out
          </Link>
          <Link to="/admin/user-management" className="hover:text-orange-500 transition duration-300 flex items-center">
            <FontAwesomeIcon icon={faUserCog} className="mr-2" />
            Manage Users
          </Link>
        </nav>
        <div className="mt-auto flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Sign Out
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
            <h2 className="text-lg font-semibold">Today's Check-Outs</h2>
            <p className="text-3xl">{todayCheckOuts}</p>
          </div>
        </div>

        {/* Logs Table */}
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
              {logs.map((log, index) => (
                <tr key={index} className="bg-gray-100">
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
