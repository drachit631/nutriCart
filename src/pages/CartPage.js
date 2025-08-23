import React from "react";

const CartPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600">Review and manage your cart items</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Product {i + 1}</h4>
                <p className="text-gray-600 text-sm">
                  Healthy product description
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  -
                </button>
                <span className="w-12 text-center">1</span>
                <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  +
                </button>
              </div>
              <span className="font-bold text-primary w-20 text-right">
                $9.99
              </span>
              <button className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Subtotal:</span>
            <span className="text-lg font-bold text-primary">$29.97</span>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
