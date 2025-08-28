import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export function PricingCard({ plan, isPopular = false, className = "" }) {
  const navigate = useNavigate();
  const features = plan.features || [];

  return (
    <Card
      className={`relative ${
        isPopular ? "ring-2 ring-green-500 shadow-xl" : ""
      } ${className}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge variant="premium" className="px-4 py-2 text-sm">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-foreground font-heading">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-muted mt-2 font-body">
          {plan.description}
        </CardDescription>

        <div className="mt-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-foreground">
              ${plan.price}
            </span>
            {plan.period && (
              <span className="text-muted ml-1">/{plan.period}</span>
            )}
          </div>
          {plan.originalPrice && (
            <div className="text-sm text-muted line-through mt-1">
              ${plan.originalPrice}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg
                  className="w-3 h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-foreground font-body">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={isPopular ? "gradient" : "outline"}
          className="w-full py-3 text-base font-semibold"
          size="lg"
          onClick={() => navigate("/signup")}
        >
          {plan.cta || "Get Started"}
        </Button>

        {plan.note && (
          <p className="text-xs text-muted text-center font-body">
            {plan.note}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function PricingGrid() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals starting their health journey",
      price: "0",
      period: "month",
      features: [
        "Basic meal planning",
        "Access to 100+ healthy products",
        "Community forum access",
        "Basic progress tracking",
        "Email support",
      ],
      cta: "Start Free",
      note: "No credit card required",
    },
    {
      name: "Pro",
      description: "Advanced features for serious health enthusiasts",
      price: "19",
      period: "month",
      originalPrice: "29",
      features: [
        "Everything in Starter",
        "Personalized meal recommendations",
        "Unlimited product access",
        "Personalized nutrition coaching",
        "Advanced analytics dashboard",
        "Priority support",
        "Custom diet plans",
      ],
      cta: "Start Pro Trial",
      note: "14-day free trial",
    },
    {
      name: "Premium",
      description: "Complete nutrition ecosystem for families",
      price: "39",
      period: "month",
      originalPrice: "59",
      features: [
        "Everything in Pro",
        "Family meal planning (up to 6 members)",
        "1-on-1 nutritionist consultation",
        "Meal delivery integration",
        "Advanced health metrics",
        "24/7 priority support",
        "Exclusive premium products",
        "Custom recipe creation",
      ],
      cta: "Start Premium",
      note: "Best value for families",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => (
        <PricingCard
          key={index}
          plan={plan}
          isPopular={index === 1} // Pro plan is most popular
        />
      ))}
    </div>
  );
}
