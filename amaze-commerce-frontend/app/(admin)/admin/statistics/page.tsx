"use client";
import { useCallback, useEffect, useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
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
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Target,
  Clock,
  CheckCircle
} from "lucide-react";

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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
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
        setTotalOrders(data?.data?.length || 0);
        // Calculate total revenue from orders
        const revenue = data?.data?.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0) || 0;
        setTotalRevenue(revenue);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Enhanced chart configurations
  const barData = {
    labels: ["Electronics", "Fashion", "Home Decor", "Kitchen", "Furniture"],
    datasets: [
      {
        label: "Sales",
        data: [120, 89, 76, 65, 45],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 146, 60, 0.8)"
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(34, 197, 94)",
          "rgb(251, 146, 60)"
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "Processing", "Pending", "Canceled"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)"
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(251, 191, 36)",
          "rgb(239, 68, 68)"
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
          font: {
            size: 11
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
              <div className="flex items-center space-x-3 text-white">
                <Activity size={32} />
                <div>
                  <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                  <p className="text-indigo-100 mt-1">Comprehensive business insights and statistics</p>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Row */}
            <div className="p-6 bg-gray-50/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Today's Sales</p>
                      <p className="text-xl font-bold text-gray-900">$2,847</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight size={14} className="text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+12.5%</span>
                    <span className="text-gray-500 ml-1">from yesterday</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Conversion Rate</p>
                      <p className="text-xl font-bold text-gray-900">3.2%</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight size={14} className="text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+0.3%</span>
                    <span className="text-gray-500 ml-1">from last week</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Avg. Order Time</p>
                      <p className="text-xl font-bold text-gray-900">2.4 min</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock size={20} className="text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowDownRight size={14} className="text-red-500 mr-1" />
                    <span className="text-red-600 font-medium">-0.2 min</span>
                    <span className="text-gray-500 ml-1">faster</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Customer Satisfaction</p>
                      <p className="text-xl font-bold text-gray-900">4.8/5</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={20} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight size={14} className="text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+0.1</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold mt-1">{totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users size={28} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUpRight size={14} className="text-blue-200 mr-1" />
                <span className="text-blue-100 font-medium">+8.2% from last month</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold mt-1">{totalOrders.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag size={28} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUpRight size={14} className="text-green-200 mr-1" />
                <span className="text-green-100 font-medium">+15.3% from last month</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign size={28} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUpRight size={14} className="text-purple-200 mr-1" />
                <span className="text-purple-100 font-medium">+22.7% from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-100 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Sales by Category</h3>
                  <p className="text-sm text-gray-600">Product performance across categories</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80">
                <Bar data={barData} options={chartOptions as any} />
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-b border-gray-100 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <PieChart size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Order Status Distribution</h3>
                  <p className="text-sm text-gray-600">Current order status breakdown</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80">
                <Doughnut data={pieData} options={chartOptions as any} />
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart - Full Width */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
                  <p className="text-sm text-gray-600">Monthly revenue performance over time</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Last 6 months</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-96">
              <Line data={lineData} options={chartOptions as any} />
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <Package size={20} className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Products Sold</p>
                <p className="text-lg font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <Users size={20} className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-lg font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <TrendingUp size={20} className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-lg font-bold text-gray-900">+23.1%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-lg font-bold text-gray-900">94.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(AdminStatistics);