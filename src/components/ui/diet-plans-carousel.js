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

export function DietPlansCarousel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const dietPlans = [
    {
      name: "Keto",
      description: "High-fat, low-carb diet for weight loss and energy",
      benefits: ["Rapid weight loss", "Increased energy", "Mental clarity"],
      difficulty: "Medium",
      duration: "2-4 weeks",
      color: "from-purple-500 to-pink-500",
      icon: "🥑",
    },
    {
      name: "Mediterranean",
      description:
        "Heart-healthy diet rich in fruits, vegetables, and olive oil",
      benefits: ["Heart health", "Longevity", "Brain function"],
      difficulty: "Easy",
      duration: "Lifestyle",
      color: "from-blue-500 to-cyan-500",
      icon: "🫒",
    },
    {
      name: "Vegan",
      description: "Plant-based nutrition for ethical and health benefits",
      benefits: ["Lower cholesterol", "Weight management", "Ethical choice"],
      difficulty: "Medium",
      duration: "Lifestyle",
      color: "from-green-500 to-emerald-500",
      icon: "🌱",
    },
    {
      name: "DASH",
      description: "Dietary approach to stop hypertension",
      benefits: ["Blood pressure control", "Heart health", "Nutrient-rich"],
      difficulty: "Easy",
      duration: "Lifestyle",
      color: "from-red-500 to-orange-500",
      icon: "❤️",
    },
    {
      name: "Intermittent Fasting",
      description: "Time-restricted eating for metabolic health",
      benefits: ["Fat burning", "Insulin sensitivity", "Cellular repair"],
      difficulty: "Hard",
      duration: "Lifestyle",
      color: "from-yellow-500 to-orange-500",
      icon: "⏰",
    },
  ];

  const handleLearnMore = (plan) => {
    // Navigate to diet plan details page (using plan name as identifier for now)
    // In a real app, you'd use the actual diet plan ID from the database
    navigate(`/diet-plans/${encodeURIComponent(plan.name)}`);
  };

  const handleStartPlan = (plan) => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to start this diet plan.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    // Navigate to diet plan onboarding for authenticated users
    navigate(`/diet-plans/${encodeURIComponent(plan.name)}/onboarding`);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Perfect Diet Plan
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-body">
            Science-backed nutrition plans tailored to your goals and lifestyle.
            Each plan comes with personalized meal suggestions and grocery
            lists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietPlans.map((plan, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{plan.icon}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground font-heading">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 font-heading">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Details */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {plan.difficulty}
                    </Badge>
                  </div>
                  <div className="text-muted">Duration: {plan.duration}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    onClick={() => handleLearnMore(plan)}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="gradient"
                    className="flex-1"
                    size="sm"
                    onClick={() => handleStartPlan(plan)}
                  >
                    Start This Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
