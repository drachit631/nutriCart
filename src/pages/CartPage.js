import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { productsAPI } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } =
    useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    loadProductDetails();
  }, [cart.items]);

  const loadProductDetails = async () => {
    if (cart.items.length === 0) {
      setLoadingProducts(false);
      return;
    }

    try {
      setLoadingProducts(true);
      const productIds = cart.items.map((item) => item.productId);
      const products = await Promise.all(
        productIds.map((id) => productsAPI.getById(id))
      );

      const productMap = {};
      products.forEach((product) => {
        if (product) {
          productMap[product._id] = product;
        }
      });

      setProductDetails(productMap);
    } catch (error) {
      console.error("Error loading product details:", error);
      toast({
        title: "Error",
        description: "Failed to load product details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    console.log(
      "CartPage: handleQuantityChange called with:",
      productId,
      newQuantity
    );

    console.log("New quantity:", newQuantity);

    if (newQuantity <= 0) {
      console.log("Removing item from cart");
      removeFromCart(productId);
    } else {
      console.log("Updating quantity");
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to proceed to checkout.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Navigate to checkout page
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
              </div>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Shopping
            </Button>
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
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <span className="text-gray-500">({cart.count} items)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => {
                const product = productDetails[item.productId];
                if (!product) return null;

                return (
                  <Card key={item.productId} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-3xl">{product.image}</span>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-600">
                              ₹{product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              per {product.unit}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              console.log(
                                "CartPage: Minus button clicked for product:",
                                item.productId,
                                "current quantity:",
                                item.quantity,
                                "new quantity will be:",
                                item.quantity - 1
                              );
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1
                              );
                            }}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-medium text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              console.log(
                                "CartPage: Plus button clicked for product:",
                                item.productId,
                                "current quantity:",
                                item.quantity,
                                "new quantity will be:",
                                item.quantity + 1
                              );
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              );
                            }}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ₹{item.price * item.quantity}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Cart Actions */}
            <div className="mt-6 flex justify-between items-center">
              <Button
                onClick={handleClearCart}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear Cart
              </Button>
              <Button onClick={handleContinueShopping} variant="outline">
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Summary Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cart.count} items)</span>
                    <span>₹{cart.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{Math.round(cart.total * 0.18)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{cart.total + Math.round(cart.total * 0.18)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                  disabled={cart.items.length === 0}
                >
                  Proceed to Checkout
                </Button>

                {/* Additional Info */}
                <div className="text-xs text-gray-500 text-center">
                  <p>Secure checkout powered by Stripe</p>
                  <p>Free delivery on orders above ₹500</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
