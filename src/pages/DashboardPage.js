import React from "react";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your NutriCart+ dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Diet Plan Generator
          </h3>
          <p className="text-gray-600 mb-4">
            Get personalized diet recommendations based on your profile
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Generate Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Recent Orders
          </h3>
          <p className="text-gray-600 mb-4">
            View your latest grocery deliveries
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            View Orders
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Active Subscriptions
          </h3>
          <p className="text-gray-600 mb-4">
            Manage your recurring grocery deliveries
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Manage Subscriptions
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5">
            <div className="text-center">
              <div className="text-2xl mb-2">🥗</div>
              <div className="text-sm font-medium">Diet Plans</div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5">
            <div className="text-center">
              <div className="text-2xl mb-2">🛒</div>
              <div className="text-sm font-medium">Shop Groceries</div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Progress</div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5">
            <div className="text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Settings</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
