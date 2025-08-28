import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function DietCompatibilityChecker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    healthGoals: [],
    dietaryRestrictions: [],
    allergies: [],
    budget: "",
    cookingExperience: "",
  });
  const [results, setResults] = useState(null);

  const healthGoalsOptions = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Building",
    "Heart Health",
    "Diabetes Management",
    "Energy Boost",
    "Digestive Health",
    "General Wellness",
  ];

  const dietaryRestrictionsOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Low-Sodium",
    "None",
  ];

  const activityLevels = [
    "Sedentary (little or no exercise)",
    "Lightly active (light exercise 1-3 days/week)",
    "Moderately active (moderate exercise 3-5 days/week)",
    "Very active (hard exercise 6-7 days/week)",
    "Extremely active (very hard exercise, physical job)",
  ];

  const budgetOptions = [
    "Budget-friendly (₹2000-4000/month)",
    "Moderate (₹4000-8000/month)",
    "Premium (₹8000-15000/month)",
    "Luxury (₹15000+/month)",
  ];

  const cookingExperienceOptions = [
    "Beginner (basic cooking skills)",
    "Intermediate (can follow recipes)",
    "Advanced (experienced cook)",
    "Expert (professional level)",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const calculateDietRecommendations = () => {
    // Simple algorithm to determine diet recommendations
    const recommendations = [];

    if (formData.healthGoals.includes("Weight Loss")) {
      if (formData.dietaryRestrictions.includes("Low-Carb")) {
        recommendations.push({
          name: "Keto Diet",
          compatibility: 95,
          description: "High-fat, low-carb diet perfect for weight loss",
          benefits: [
            "Rapid weight loss",
            "Increased energy",
            "Stable blood sugar",
          ],
          color: "from-purple-500 to-pink-500",
        });
      } else {
        recommendations.push({
          name: "Calorie Deficit",
          compatibility: 90,
          description: "Balanced diet with reduced calories for weight loss",
          benefits: [
            "Sustainable weight loss",
            "Flexible food choices",
            "Easy to follow",
          ],
          color: "from-blue-500 to-green-500",
        });
      }
    }

    if (formData.healthGoals.includes("Heart Health")) {
      recommendations.push({
        name: "Mediterranean Diet",
        compatibility: 92,
        description:
          "Heart-healthy diet rich in fruits, vegetables, and healthy fats",
        benefits: ["Heart health", "Longevity", "Brain function"],
        color: "from-green-500 to-blue-500",
      });
    }

    if (formData.healthGoals.includes("Muscle Building")) {
      recommendations.push({
        name: "High-Protein Diet",
        compatibility: 88,
        description: "Protein-rich diet to support muscle growth and recovery",
        benefits: ["Muscle building", "Recovery", "Strength gains"],
        color: "from-orange-500 to-red-500",
      });
    }

    if (formData.dietaryRestrictions.includes("Vegetarian")) {
      recommendations.push({
        name: "Plant-Based Diet",
        compatibility: 85,
        description: "Nutritious vegetarian diet with protein alternatives",
        benefits: [
          "Environmental friendly",
          "Heart health",
          "Digestive health",
        ],
        color: "from-green-400 to-emerald-500",
      });
    }

    // Default recommendation if none match
    if (recommendations.length === 0) {
      recommendations.push({
        name: "Balanced Nutrition",
        compatibility: 80,
        description: "Well-rounded diet focusing on whole foods and balance",
        benefits: ["Overall health", "Sustainable", "Easy to maintain"],
        color: "from-gray-500 to-blue-500",
      });
    }

    setResults({
      recommendations,
      userProfile: formData,
    });
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter weight in kg"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter height in cm"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Health Goals & Activity
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What are your primary health goals?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {healthGoalsOptions.map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.healthGoals.includes(goal)}
                      onChange={() => handleMultiSelect("healthGoals", goal)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select activity level</option>
                {activityLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Dietary Preferences & Budget
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dietaryRestrictionsOptions.map((restriction) => (
                  <label
                    key={restriction}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(
                        restriction
                      )}
                      onChange={() =>
                        handleMultiSelect("dietaryRestrictions", restriction)
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Budget for Food
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select cooking experience</option>
                {cookingExperienceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Your Diet Recommendations
            </h3>

            {results && (
              <div className="space-y-4">
                {results.recommendations.map((diet, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {diet.name}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {diet.description}
                          </p>

                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm text-gray-500">
                              Compatibility:
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              {diet.compatibility}%
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                              Key Benefits:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              {diet.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-600">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Next Steps</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your preferences, we recommend starting with
                        the highest compatibility diet plan. You can view
                        detailed meal plans and get started on your health
                        journey!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => navigate("/diet-plans")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    View Diet Plans
                  </Button>
                  <Button
                    onClick={() => navigate("/recipes")}
                    variant="outline"
                  >
                    Browse Recipes
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.age && formData.gender && formData.weight && formData.height
        );
      case 2:
        return formData.healthGoals.length > 0 && formData.activityLevel;
      case 3:
        return (
          formData.dietaryRestrictions.length > 0 &&
          formData.budget &&
          formData.cookingExperience
        );
      default:
        return true;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Diet Compatibility Checker
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover which diet plan best fits your lifestyle, preferences, and
            health goals. Our smart algorithm analyzes your profile to provide
            personalized recommendations.
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Personalized Diet Assessment
            </CardTitle>
            <CardDescription>
              Step {currentStep} of 4 - Let's find your perfect diet match
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="min-h-[400px]">{renderStep()}</div>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                <Button
                  onClick={
                    currentStep === 3 ? calculateDietRecommendations : nextStep
                  }
                  disabled={!canProceed()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {currentStep === 3 ? "Get Recommendations" : "Next"}
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData({
                      age: "",
                      gender: "",
                      weight: "",
                      height: "",
                      activityLevel: "",
                      healthGoals: [],
                      dietaryRestrictions: [],
                      allergies: [],
                      budget: "",
                      cookingExperience: "",
                    });
                    setResults(null);
                  }}
                  variant="outline"
                >
                  Start Over
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
