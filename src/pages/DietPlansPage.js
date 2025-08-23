import React from "react";

const DietPlansPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
        <p className="text-gray-600">
          Discover and manage your personalized diet plans
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          AI Diet Plan Generator
        </h3>
        <p className="text-gray-600 mb-4">
          Get personalized diet recommendations based on your health goals and
          preferences
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
          Generate New Diet Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Keto",
          "Vegan",
          "DASH",
          "Mediterranean",
          "Intermittent Fasting",
          "High Protein",
        ].map((plan) => (
          <div key={plan} className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan}</h4>
            <p className="text-gray-600 mb-4">
              Personalized {plan.toLowerCase()} diet plan
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
              View Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlansPage;
