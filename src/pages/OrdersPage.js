import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ordersAPI } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "../components/ui/use-toast";

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user && user.id) {
      loadOrders();
    }
  }, [isAuthenticated, user, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await ordersAPI.getUserOrders(user.id);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">
            Track your grocery deliveries and order history
          </p>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">
            Track your grocery deliveries and order history
          </p>
        </div>
        <Button
          onClick={() => navigate("/products")}
          className="bg-green-600 hover:bg-green-700"
        >
          Continue Shopping
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start shopping to see your orders here!
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Items:</span>
                    <p className="font-medium">{order.items.length} products</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total:</span>
                    <p className="font-medium text-green-600">₹{order.total}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Payment:</span>
                    <p className="font-medium capitalize">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Items:
                  </h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {item.quantity} × {item.productName}
                        </span>
                        <span>₹{item.total}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </Button>
                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <Button variant="outline">Track Order</Button>
                    )}
                  {order.status === "delivered" && (
                    <Button
                      variant="outline"
                      onClick={() => navigate("/products")}
                    >
                      Reorder Items
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
