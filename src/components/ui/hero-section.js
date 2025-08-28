import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "./button";
import { Badge } from "./badge";
import { useToast } from "./use-toast";

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAuthenticatedAction = (action) => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to access this feature.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    action();
  };

  const handleStartFreeDietPlan = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to start your free diet plan.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    // Redirect to diet plans page for authenticated users
    navigate("/diet-plans");
  };

  const handleUnlockPremiumPlans = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to unlock premium plans.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    // Redirect to pricing page for authenticated users
    navigate("/pricing");
  };

  const handleAuthAction = (action) => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to access this feature.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    action();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-gray-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative px-6 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="premium" className="mb-8 text-sm">
            🎯 Smart Diet Personalization
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-heading">
            Your Diet & Budget
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Companion
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted sm:text-xl font-body">
            Start free with basic recommendations, unlock personalized plans
            with nutritionist validation, and optimize your grocery budget with
            smart shopping.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Button
              size="xl"
              variant="gradient"
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleStartFreeDietPlan}
            >
              Start Free Diet Plan
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleUnlockPremiumPlans}
            >
              Unlock Premium Plans
            </Button>
          </div>

          {/* Tiered Personalization Preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">🆓</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-heading">
                Free Tier
              </h3>
              <p className="text-sm text-muted font-body">
                Basic diet recommendations & general meal plans
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="premium" className="text-xs">
                  Most Popular
                </Badge>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">⭐</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-heading">
                Premium Plans
              </h3>
              <p className="text-sm text-muted font-body">
                Personalized diets + nutritionist validation + recipes
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">💰</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-heading">
                Budget Optimization
              </h3>
              <p className="text-sm text-muted font-body">
                AI-powered grocery optimization within your budget
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">
              How NutriCart Works
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  Set Your Budget
                </h3>
                <p className="text-muted text-sm">
                  Choose your monthly grocery budget (₹3,000 - ₹15,000)
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  Get Smart Recommendations
                </h3>
                <p className="text-muted text-sm">
                  Personalized diet plans within your budget
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  Smart Shopping
                </h3>
                <p className="text-muted text-sm">
                  Smart cart optimization with local farmer partnerships
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  Cook & Enjoy
                </h3>
                <p className="text-muted text-sm">
                  Get step-by-step recipes with one-click ingredient ordering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
