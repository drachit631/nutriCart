import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export function AutoDeliveryBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <Badge variant="success" className="mb-4 w-fit">
                  🚚 Auto-Delivery
                </Badge>

                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 font-heading">
                  Never run out of healthy essentials
                </h2>

                <p className="text-lg text-muted mb-8 leading-relaxed font-body">
                  Subscribe once, stay on track. Our smart system automatically
                  delivers fresh ingredients based on your meal plan, ensuring
                  you never miss a healthy meal.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-foreground font-medium">
                      Flexible delivery schedules
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-foreground font-medium">
                      Fresh, locally-sourced ingredients
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-foreground font-medium">
                      Easy pause, skip, or cancel anytime
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="font-semibold"
                    onClick={() => navigate("/signup")}
                  >
                    Start Auto-Delivery
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold"
                    onClick={() => navigate("/subscriptions")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Right Side - Illustration */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 lg:p-16 flex items-center justify-center">
                <div className="text-center">
                  {/* Delivery Box Illustration */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center animate-float">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center animate-pulse-slow">
                        <span className="text-4xl">📦</span>
                      </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md animate-blob">
                      <span className="text-sm">🥬</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md animate-blob animation-delay-2000">
                      <span className="text-sm">🥕</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md animate-blob animation-delay-4000">
                      <span className="text-sm">🍎</span>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md">
                      <span className="text-sm">🥩</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                    Smart Grocery Delivery
                  </h3>
                  <p className="text-muted text-sm font-body">
                    Fresh ingredients delivered weekly based on your
                    personalized meal plan
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
