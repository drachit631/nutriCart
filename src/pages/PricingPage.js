import React from "react";

const PricingPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1>
        <p className="text-gray-600">
          Choose the plan that fits your health journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Free",
            price: "$0",
            features: [
              "Basic diet recommendations",
              "Access to diet plans",
              "Community forum",
            ],
          },
          {
            name: "Pro",
            price: "$19",
            features: [
              "AI diet plan generator",
              "Personalized recommendations",
              "Priority support",
            ],
          },
          {
            name: "Premium",
            price: "$39",
            features: [
              "1-on-1 consultation",
              "Custom meal planning",
              "Premium delivery",
            ],
          },
        ].map((plan) => (
          <div key={plan.name} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {plan.name}
            </h3>
            <div className="text-3xl font-bold text-primary mb-4">
              {plan.price}/month
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
