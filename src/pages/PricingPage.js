import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for getting started with healthy eating",
      features: [
        "Access to basic diet plans",
        "Product browsing",
        "Basic recipe suggestions",
        "Community support",
        "Email notifications",
      ],
      popular: false,
      color: "from-gray-500 to-gray-600",
      buttonText: "Get Started Free",
      buttonAction: () => navigate("/signup"),
    },
    {
      name: "Premium",
      price: 999,
      period: "month",
      description: "Advanced features for serious health goals",
      features: [
        "All Free features",
        "Personalized meal plans",
        "Smart pantry sync",
        "Progress tracking",
        "Priority customer support",
        "Exclusive recipes",
        "Nutritional analysis",
        "Mobile app access",
      ],
      popular: true,
      color: "from-green-500 to-blue-600",
      buttonText: "Start Premium",
      buttonAction: () => {
        if (!isAuthenticated) {
          toast({
            title: "Please Sign In",
            description: "You need to sign in to subscribe to Premium.",
            variant: "destructive",
          });
          navigate("/signup");
          return;
        }
        // TODO: Implement subscription logic
        toast({
          title: "Coming Soon",
          description: "Premium subscription will be available soon!",
          variant: "default",
        });
      },
    },
    {
      name: "Pro",
      price: 1999,
      period: "month",
      description: "Complete nutrition ecosystem for professionals",
      features: [
        "All Premium features",
        "1-on-1 nutrition consultation",
        "Custom meal planning",
        "Advanced analytics",
        "Family plan management",
        "Restaurant recommendations",
        "24/7 priority support",
        "Exclusive workshops",
      ],
      popular: false,
      color: "from-purple-500 to-pink-600",
      buttonText: "Start Pro",
      buttonAction: () => {
        if (!isAuthenticated) {
          toast({
            title: "Please Sign In",
            description: "You need to sign in to subscribe to Pro.",
            variant: "destructive",
          });
          navigate("/signup");
          return;
        }
        // TODO: Implement subscription logic
        toast({
          title: "Coming Soon",
          description: "Pro subscription will be available soon!",
          variant: "default",
        });
      },
    },
  ];

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
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
            <h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey to better health with our flexible pricing
            options. All plans include access to our premium products and expert
            guidance.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? "ring-2 ring-green-500 shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className={`pt-6 ${plan.popular ? "pt-12" : ""}`}>
                <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                  {plan.name}
                </CardTitle>
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">₹</span>
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-lg text-gray-500 ml-1">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <span className="text-lg text-gray-500">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-center mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={plan.buttonAction}
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                      : "bg-gray-800 hover:bg-gray-900 text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose NutriCart?
            </h3>
            <p className="text-gray-600">
              We're committed to making healthy eating accessible and enjoyable
              for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Fresh & Organic
              </h4>
              <p className="text-gray-600">
                Premium quality products sourced directly from local farmers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Personalized Plans
              </h4>
              <p className="text-gray-600">
                Smart recommendations based on your health goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h4>
              <p className="text-gray-600">
                Same-day delivery for fresh products in your area
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h4>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. No long-term
                commitments required.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer a free trial?
              </h4>
              <p className="text-gray-600">
                We offer a 7-day free trial for Premium and Pro plans so you can
                experience all features.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards, UPI, and digital wallets for
                your convenience.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a family plan option?
              </h4>
              <p className="text-gray-600">
                Yes! Our Pro plan includes family management features for up to
                5 family members.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Health Journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of users who have transformed their health with
            NutriCart
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
}
