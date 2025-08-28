import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { dashboardAPI, ordersAPI } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to view your dashboard.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Only load dashboard data if user object and user.id are available
    if (user && user.id) {
      loadDashboardData();
    }
  }, [isAuthenticated, user, navigate]);

  const loadDashboardData = async () => {
    try {
      // Double-check that user.id exists before making API calls
      if (!user || !user.id) {
        console.error("User or user.id is not available");
        return;
      }

      setLoading(true);
      const data = await dashboardAPI.getDashboardData(user.id);
      setDashboardData(data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b mb-8">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user?.firstName || "User"}! 👋
              </h2>
              <p className="text-green-100">
                Track your nutrition journey and manage your health goals
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>👤</span>
                  <span>Profile Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="text-lg font-semibold">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-lg font-semibold">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Subscription
                    </label>
                    <p className="text-lg font-semibold capitalize">
                      {user?.subscription || "Free"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Profile Status
                    </label>
                    <p className="text-lg font-semibold">
                      {user?.profileComplete ? "Complete" : "Incomplete"}
                    </p>
                  </div>
                </div>

                {!user?.profileComplete && (
                  <Button
                    onClick={() => navigate("/profile-setup")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Profile Setup
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Diet Preferences */}
            {user?.preferences && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🥗</span>
                    <span>Diet Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.preferences.dietaryRestrictions?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Dietary Restrictions
                        </label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.preferences.dietaryRestrictions.map(
                            (restriction, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full"
                              >
                                {restriction}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {user.preferences.allergies?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Allergies
                        </label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.preferences.allergies.map((allergy, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.preferences.healthGoals?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Health Goals
                        </label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.preferences.healthGoals.map((goal, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.preferences.preferredDiets?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Preferred Diets
                        </label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.preferences.preferredDiets.map(
                            (diet, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                              >
                                {diet}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {user.preferences.budget && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Monthly Budget
                      </label>
                      <p className="text-lg font-semibold">
                        ₹{user.preferences.budget}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Recent Orders */}
            {dashboardData?.recentOrders?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📦</span>
                    <span>Recent Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            Order #{order._id.slice(-6)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => navigate("/orders")}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/products")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Browse Products
                </Button>
                <Button
                  onClick={() => navigate("/diet-plans")}
                  variant="outline"
                  className="w-full"
                >
                  View Diet Plans
                </Button>
                <Button
                  onClick={() => navigate("/profile-setup")}
                  variant="outline"
                  className="w-full"
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Cart Summary */}
            {cart.items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🛒</span>
                    <span>Cart Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Items in cart:</span>
                    <span className="font-semibold">{cart.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold text-green-600">
                      ₹{cart.total}
                    </span>
                  </div>
                  <Button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    View Cart
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Health Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Health Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {user?.preferences?.healthGoals?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Health Goals Set</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {user?.preferences?.preferredDiets?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Diet Plans Followed</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {dashboardData?.recentOrders?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Orders Placed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
