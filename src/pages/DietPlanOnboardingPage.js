import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "../components/ui/use-toast";

export default function DietPlanOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    currentWeight: "",
    targetWeight: "",
    height: "",
    activityLevel: "",
    dietaryRestrictions: [],
    allergies: [],
    budget: "",
    cookingExperience: "",
  });

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Set Your Goals",
      description: "What do you want to achieve with this diet plan?",
    },
    {
      id: 2,
      title: "Your Current Status",
      description: "Help us understand your starting point",
    },
    {
      id: 3,
      title: "Lifestyle & Preferences",
      description: "Tell us about your daily routine and food preferences",
    },
    {
      id: 4,
      title: "Review & Start",
      description: "Review your personalized plan and begin your journey",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // TODO: Save user preferences and start the diet plan
      // await dietPlansAPI.startPlan(user.id, id, formData);

      toast({
        title: "Diet Plan Started!",
        description:
          "Your personalized diet plan is now active. Check your dashboard for daily meal plans and progress tracking.",
        variant: "default",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error starting diet plan:", error);
      toast({
        title: "Error",
        description: "Failed to start diet plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                What's your primary goal?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Weight Loss",
                  "Weight Gain",
                  "Maintenance",
                  "Muscle Building",
                  "Better Health",
                  "Energy Boost",
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleInputChange("goal", goal)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.goal === goal
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{goal}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.currentWeight}
                  onChange={(e) =>
                    handleInputChange("currentWeight", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) =>
                    handleInputChange("targetWeight", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="65"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="170"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) =>
                    handleInputChange("activityLevel", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">
                    Sedentary (little to no exercise)
                  </option>
                  <option value="light">
                    Lightly active (light exercise 1-3 days/week)
                  </option>
                  <option value="moderate">
                    Moderately active (moderate exercise 3-5 days/week)
                  </option>
                  <option value="active">
                    Very active (hard exercise 6-7 days/week)
                  </option>
                  <option value="very-active">
                    Extremely active (very hard exercise, physical job)
                  </option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Dietary Restrictions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Vegetarian",
                  "Vegan",
                  "Gluten-Free",
                  "Dairy-Free",
                  "Keto",
                  "Paleo",
                  "Low-Carb",
                  "High-Protein",
                ].map((restriction) => (
                  <button
                    key={restriction}
                    onClick={() => {
                      const current = formData.dietaryRestrictions;
                      if (current.includes(restriction)) {
                        handleInputChange(
                          "dietaryRestrictions",
                          current.filter((r) => r !== restriction)
                        );
                      } else {
                        handleInputChange("dietaryRestrictions", [
                          ...current,
                          restriction,
                        ]);
                      }
                    }}
                    className={`p-3 border-2 rounded-lg text-sm transition-all ${
                      formData.dietaryRestrictions.includes(restriction)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {restriction}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Grocery Budget (₹)
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="3000-5000">₹3,000 - ₹5,000</option>
                <option value="5000-8000">₹5,000 - ₹8,000</option>
                <option value="8000-12000">₹8,000 - ₹12,000</option>
                <option value="12000-15000">₹12,000 - ₹15,000</option>
                <option value="15000+">₹15,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cooking Experience
              </label>
              <select
                value={formData.cookingExperience}
                onChange={(e) =>
                  handleInputChange("cookingExperience", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="beginner">
                  Beginner (basic cooking skills)
                </option>
                <option value="intermediate">
                  Intermediate (can follow recipes)
                </option>
                <option value="advanced">
                  Advanced (can improvise and create)
                </option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                Your Personalized Plan Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Goal:</span>
                  <span className="ml-2 text-green-700">{formData.goal}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Budget:</span>
                  <span className="ml-2 text-green-700">
                    ₹{formData.budget}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Activity Level:
                  </span>
                  <span className="ml-2 text-green-700">
                    {formData.activityLevel}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Cooking Experience:
                  </span>
                  <span className="ml-2 text-green-700">
                    {formData.cookingExperience}
                  </span>
                </div>
              </div>

              {formData.dietaryRestrictions.length > 0 && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">
                    Dietary Restrictions:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.dietaryRestrictions.map((restriction) => (
                      <Badge
                        key={restriction}
                        variant="secondary"
                        className="text-xs"
                      >
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Ready to start your personalized diet journey? We'll create
                custom meal plans, shopping lists, and track your progress every
                step of the way.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/diet-plans/${id}`)}
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
            <h1 className="text-2xl font-bold text-gray-900">
              Setup Your Diet Plan
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step.id ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className={currentStep === 1 ? "invisible" : ""}
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            {currentStep < steps.length ? (
              <Button onClick={handleNext} disabled={!formData.goal}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                Start My Diet Plan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
