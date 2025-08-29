import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { toast } from "../components/ui/use-toast";
import { productsAPI, ordersAPI } from "../services/api";

// FormInput component defined outside to prevent recreation
const FormInput = React.memo(
  ({
    name,
    placeholder,
    type = "text",
    className = "",
    value,
    onChange,
    ...props
  }) => (
    <div className="space-y-1">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={`flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
        autoComplete="off"
        {...props}
      />
    </div>
  )
);

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

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
        description: "Failed to load product details.",
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your purchase.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Create order data
      const orderData = {
        userId: user.id,
        items: cart.items.map((item) => ({
          productId: item.productId,
          productName: productDetails[item.productId]?.name || "Product",
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: total,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone,
        },
        paymentMethod: paymentMethod,
        paymentDetails: {
          cardNumber: formData.cardNumber.slice(-4), // Store only last 4 digits
          cardholderName: formData.cardholderName,
        },
      };

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order in backend
      await ordersAPI.createOrder(user.id, orderData);

      // Clear the cart
      await clearCart();

      // Show success message
      toast({
        title: "Payment Successful! 🎉",
        description:
          "Your order has been placed successfully. Redirecting to orders page...",
        variant: "default",
      });

      // Navigate to orders page
      navigate("/orders");
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.total || 0;
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart before checkout.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b mb-8 rounded-lg">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/cart")}
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
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Complete your purchase securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        UPI
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      <FormInput
                        name="cardNumber"
                        placeholder="Card Number (1234 5678 9012 3456)"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                      <FormInput
                        name="cardholderName"
                        placeholder="Cardholder Name"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                      />
                    </>
                  )}

                  {paymentMethod === "upi" && (
                    <Input
                      name="upiId"
                      placeholder="UPI ID (e.g., user@upi)"
                      value={formData.upiId}
                      onChange={handleInputChange}
                    />
                  )}

                  {/* Shipping Address */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Shipping Address
                    </h3>
                    <FormInput
                      name="address"
                      placeholder="Street Address (House/Flat No., Street, Area)"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Pay ₹${total}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Items ({cart.count})
                  </h4>
                  {loadingProducts ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">
                        Loading products...
                      </p>
                    </div>
                  ) : (
                    cart.items.map((item, index) => {
                      const product = productDetails[item.productId];
                      return (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {item.quantity} × {product?.name || "Product"}
                          </span>
                          <span>₹{(item.price || 0) * item.quantity}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                <hr />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
