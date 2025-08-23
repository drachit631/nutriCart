import React from "react";

const CheckoutPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600">
          Complete your order and delivery information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Address
            </h3>
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="City"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  placeholder="State"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                placeholder="ZIP Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Method
            </h3>
            <div className="space-y-4">
              <input
                placeholder="Card Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Expiry Date"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  placeholder="CVV"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex justify-between">
                <span>Product {i + 1} x 1</span>
                <span>$9.99</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-primary">$29.97</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Set up monthly auto-delivery</span>
            </label>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 mt-6">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
