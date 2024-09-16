"use client";
import { useCallback, useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useAuth } from "@/app/provider/AuthProvider";
import { getAllUsersData, getCartOrders } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminStatistics = () => {

  // Placeholder data for now; backend data will replace this
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const { user } = useAuth();

    const fetchCustomersData = useCallback(async () => {
      try {
        if (user) {
          const data = await getAllUsersData();
          console.log(data.data.length);
          setTotalUsers(data?.data?.length);
        }
      } catch (error) {
        console.log(error);
      }
    }, [user]);

    useEffect(() => {
      fetchCustomersData();
    }, [fetchCustomersData]);
  
    const fetchOrders = useCallback(async () => {
      try {
        if (user) {
          const data = await getCartOrders();
          console.log(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }, [user]);

    useEffect(() => {
      fetchOrders();
    }, [fetchOrders]);

  const barData = {
    labels: ["Electronics", "Fashion", "Home Decor", "Kitchen", "Furniture"],
    datasets: [
      {
        label: "Sales",
        data: [0, 0, 0, 0, 0], // Placeholder data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "Pending", "Canceled"],
    datasets: [
      {
        data: [0, 0, 0], // Placeholder data
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#E53935"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [0, 0, 0, 0, 0, 0], // Placeholder data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard Statistics
      </h2>

      {/* Cards for Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
          <p className="text-3xl font-bold text-yellow-600">${totalRevenue}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Sales by Category
        </h3>
        <Bar data={barData} />
      </div>

      {/* Pie Chart */}
      <div className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Status</h3>
        <Pie data={pieData} />
      </div>

      {/* Line Chart */}
      <div className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Revenue Over Time
        </h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default withAdminAuth(AdminStatistics);
