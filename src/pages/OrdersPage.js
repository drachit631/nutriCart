import React from "react";

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">
          Track your grocery deliveries and order history
        </p>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{1000 + i}
                </h3>
                <p className="text-gray-600">
                  Placed on {new Date().toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  i === 0
                    ? "bg-green-100 text-green-800"
                    : i === 1
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {i === 0 ? "Delivered" : i === 1 ? "In Transit" : "Processing"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-500">Items:</span>
                <p className="font-medium">3 products</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total:</span>
                <p className="font-medium text-primary">$29.97</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Delivery:</span>
                <p className="font-medium">Standard (3-5 days)</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                View Details
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
