import React from "react";

const SubscriptionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-gray-600">
          Manage your recurring grocery deliveries
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Subscriptions
        </h3>
        <div className="space-y-4">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Weekly Grocery Box
                  </h4>
                  <p className="text-gray-600">Every Monday • $49.99/week</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Next Delivery:</span>
                  <p className="font-medium">Monday, Dec 23</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Items:</span>
                  <p className="font-medium">12 products</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status:</span>
                  <p className="font-medium">Preparing</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                  Manage
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                  Pause
                </button>
                <button className="border border-red-300 text-red-700 px-4 py-2 rounded hover:bg-red-50">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Subscription
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Weekly",
              price: "$49.99",
              description: "Fresh groceries every week",
            },
            {
              name: "Bi-weekly",
              price: "$89.99",
              description: "Every 2 weeks",
            },
            {
              name: "Monthly",
              price: "$159.99",
              description: "Monthly delivery",
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="border border-gray-200 rounded-lg p-4 text-center"
            >
              <h4 className="font-semibold text-gray-900 mb-2">{plan.name}</h4>
              <div className="text-2xl font-bold text-primary mb-2">
                {plan.price}
              </div>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">
                Start {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
