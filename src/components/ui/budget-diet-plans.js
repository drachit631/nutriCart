import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "./use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export function BudgetDietPlans() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const budgetPlans = [
    {
      name: "Student Budget",
      budget: "₹3,000",
      period: "month",
      description: "Perfect for students and budget-conscious individuals",
      features: [
        "Basic meal planning (3 meals/day)",
        "Access to 100+ healthy products",
        "Community forum access",
        "Basic progress tracking",
        "Email support",
        "Local farmer partnerships",
        "Weekly shopping lists",
        "Basic nutrition calculator",
        "Recipe library (50+ recipes)",
        "Mobile app access",
      ],
      savings: "Save ₹2,000/month",
      cta: "Start Free",
      note: "No credit card required",
      tier: "free",
      icon: "🎓",
      limitations: [
        "Limited to 3 meal plans per week",
        "Basic product recommendations",
        "Standard delivery (3-5 days)",
        "Community support only",
      ],
    },
    {
      name: "Family Budget",
      budget: "₹8,000",
      period: "month",
      description: "Ideal for families of 4-6 members",
      features: [
        "Everything in Student Budget",
        "Unlimited meal planning",
        "Personalized meal recommendations",
        "Unlimited product access",
        "Personalized nutrition coaching",
        "Advanced analytics dashboard",
        "Priority support",
        "Custom diet plans",
        "Recipe integration",
        "Family member management (up to 6)",
        "Smart shopping lists",
        "Nutritional goal tracking",
        "Meal prep scheduling",
        "Expense tracking & budgeting",
        "Premium recipe library (200+ recipes)",
        "Fast delivery (1-2 days)",
        "WhatsApp support",
      ],
      savings: "Save ₹4,000/month",
      cta: "Start Family Plan",
      note: "14-day free trial",
      tier: "premium",
      icon: "👨‍👩‍👧‍👦",
      limitations: [
        "No 1-on-1 nutritionist consultation",
        "Limited premium product access",
        "Standard recipe customization",
      ],
    },
    {
      name: "Premium Lifestyle",
      budget: "₹15,000",
      period: "month",
      description: "Complete nutrition ecosystem with luxury options",
      features: [
        "Everything in Family Budget",
        "Family meal planning (up to 8 members)",
        "1-on-1 nutritionist consultation (monthly)",
        "Meal delivery integration",
        "Advanced health metrics",
        "24/7 priority support",
        "Exclusive premium products",
        "Custom recipe creation",
        "Organic & imported ingredients",
        "Personal chef consultation",
        "Advanced meal prep services",
        "Health coaching sessions",
        "Premium product early access",
        "VIP customer service",
        "Exclusive events & workshops",
        "Premium recipe library (500+ recipes)",
        "Same-day delivery available",
        "Dedicated account manager",
        "Advanced analytics & insights",
        "Custom nutrition reports",
      ],
      savings: "Save ₹8,000/month",
      cta: "Start Premium",
      note: "Best value for health enthusiasts",
      tier: "premium",
      icon: "💎",
      limitations: [
        "Premium pricing for luxury products",
        "Limited consultation slots",
        "Geographic delivery restrictions may apply",
      ],
    },
  ];

  const getTierColor = (tier) => {
    switch (tier) {
      case "free":
        return "from-gray-400 to-gray-500";
      case "premium":
        return "from-primary to-secondary";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const handleBudgetPlanClick = (plan) => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to access this plan.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Navigate based on plan type
    if (plan.tier === "free") {
      navigate("/diet-plans");
    } else {
      navigate("/pricing");
    }
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case "free":
        return (
          <Badge variant="outline" className="text-xs">
            Free Forever
          </Badge>
        );
      case "premium":
        return (
          <Badge variant="premium" className="text-xs">
            Premium
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="success" className="mb-4 text-sm">
            💰 Budget-Friendly Plans
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Perfect Budget Plan
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-body">
            Our smart optimization optimizes your grocery shopping to fit your
            budget while maintaining nutrition quality. Start free and unlock
            premium features as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {budgetPlans.map((plan, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative ${
                plan.tier === "premium" ? "ring-2 ring-primary shadow-xl" : ""
              }`}
            >
              {plan.tier === "premium" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="premium" className="px-4 py-2 text-sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div
                className={`h-2 bg-gradient-to-r ${getTierColor(plan.tier)}`}
              ></div>

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{plan.icon}</span>
                </div>

                <div className="flex items-center justify-center mb-2">
                  {getTierBadge(plan.tier)}
                </div>

                <CardTitle className="text-2xl font-bold text-foreground font-heading">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Budget Display */}
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">
                    {plan.budget}
                  </div>
                  <div className="text-muted text-sm">
                    Grocery budget per {plan.period}
                  </div>
                  <div className="text-success text-sm font-semibold mt-1">
                    {plan.savings}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 font-heading">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 font-heading text-amber-700">
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-amber-600"
                        >
                          <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  variant={plan.tier === "premium" ? "gradient" : "outline"}
                  className="w-full py-3 text-base font-semibold"
                  size="lg"
                  onClick={() => handleBudgetPlanClick(plan)}
                >
                  {plan.cta}
                </Button>

                {plan.note && (
                  <p className="text-xs text-muted text-center font-body">
                    {plan.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
              🚀 How We Save You Money
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2 font-heading">
                  Smart Optimization
                </h4>
                <p className="text-sm text-muted font-body">
                  Smart algorithms find the best prices and alternatives
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2 font-heading">
                  Local Partnerships
                </h4>
                <p className="text-sm text-muted font-body">
                  Direct from farmers = lower prices, fresher produce
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2 font-heading">
                  Smart Bundles
                </h4>
                <p className="text-sm text-muted font-body">
                  Combo packs save 20-30% vs. individual items
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
