import React, { useState, useEffect } from "react";
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
import { dietPlansAPI, recipesAPI } from "../../services/api";

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
  const [dietPlans, setDietPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDietPlansAndRecipes();
  }, []);

  const loadDietPlansAndRecipes = async () => {
    try {
      setLoading(true);
      const [dietPlansData, recipesData] = await Promise.all([
        dietPlansAPI.getAll(),
        recipesAPI.getAll(),
      ]);
      setDietPlans(dietPlansData);
      setRecipes(recipesData);
    } catch (error) {
      console.error("Error loading diet plans and recipes:", error);
    } finally {
      setLoading(false);
    }
  };

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
    const recommendations = [];
    const compatibleRecipes = [];

    // Find diet plans that match user criteria
    dietPlans.forEach((plan) => {
      let compatibility = 50; // Base compatibility
      let matchingFactors = [];

      // Check health goals compatibility
      if (
        formData.healthGoals.includes("Weight Loss") &&
        (plan.name.toLowerCase().includes("weight loss") ||
          plan.name.toLowerCase().includes("keto") ||
          plan.suitableFor?.includes("weight-loss"))
      ) {
        compatibility += 20;
        matchingFactors.push("Weight loss focused");
      }

      if (
        formData.healthGoals.includes("Heart Health") &&
        (plan.name.toLowerCase().includes("mediterranean") ||
          plan.name.toLowerCase().includes("heart") ||
          plan.suitableFor?.includes("heart-health"))
      ) {
        compatibility += 20;
        matchingFactors.push("Heart healthy");
      }

      if (
        formData.healthGoals.includes("Muscle Building") &&
        (plan.name.toLowerCase().includes("protein") ||
          plan.name.toLowerCase().includes("muscle") ||
          plan.suitableFor?.includes("muscle-gain"))
      ) {
        compatibility += 20;
        matchingFactors.push("High protein");
      }

      // Check dietary restrictions
      if (
        formData.dietaryRestrictions.includes("Vegetarian") &&
        (plan.name.toLowerCase().includes("vegetarian") ||
          plan.suitableFor?.includes("vegetarian"))
      ) {
        compatibility += 15;
        matchingFactors.push("Vegetarian friendly");
      }

      if (
        formData.dietaryRestrictions.includes("Vegan") &&
        (plan.name.toLowerCase().includes("vegan") ||
          plan.suitableFor?.includes("vegan"))
      ) {
        compatibility += 15;
        matchingFactors.push("Vegan friendly");
      }

      if (
        formData.dietaryRestrictions.includes("Gluten-Free") &&
        (plan.name.toLowerCase().includes("gluten") ||
          plan.suitableFor?.includes("gluten-free"))
      ) {
        compatibility += 15;
        matchingFactors.push("Gluten-free");
      }

      // Budget compatibility
      if (
        formData.budget.includes("Budget-friendly") &&
        plan.budget === "low"
      ) {
        compatibility += 10;
        matchingFactors.push("Budget friendly");
      }

      if (formData.budget.includes("Premium") && plan.budget === "high") {
        compatibility += 10;
        matchingFactors.push("Premium quality");
      }

      // Only include plans with decent compatibility
      if (compatibility >= 60) {
        recommendations.push({
          id: plan._id,
          name: plan.name,
          compatibility: Math.min(compatibility, 98),
          description:
            plan.description ||
            plan.summary ||
            "Personalized diet plan tailored to your needs",
          benefits:
            matchingFactors.length > 0
              ? matchingFactors
              : plan.benefits || [
                  "Health improvement",
                  "Sustainable eating",
                  "Nutritious meals",
                ],
          color: getColorForPlan(plan.name),
          duration: plan.duration,
          difficulty: plan.difficulty,
          realData: true,
        });
      }
    });

    // Find compatible recipes
    recipes.forEach((recipe) => {
      let isCompatible = true;

      // Check dietary restrictions
      if (
        formData.dietaryRestrictions.includes("Vegetarian") &&
        recipe.dietCompatible &&
        !recipe.dietCompatible.includes("vegetarian")
      ) {
        isCompatible = false;
      }

      if (
        formData.dietaryRestrictions.includes("Vegan") &&
        recipe.dietCompatible &&
        !recipe.dietCompatible.includes("vegan")
      ) {
        isCompatible = false;
      }

      if (isCompatible) {
        compatibleRecipes.push(recipe);
      }
    });

    // Sort by compatibility
    recommendations.sort((a, b) => b.compatibility - a.compatibility);

    // If no plans match well, add a default recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        name: "Balanced Nutrition Plan",
        compatibility: 75,
        description:
          "A well-rounded approach to healthy eating based on your preferences",
        benefits: [
          "Personalized to your goals",
          "Sustainable lifestyle",
          "Balanced nutrition",
        ],
        color: "from-blue-500 to-green-500",
        realData: false,
      });
    }

    setResults({
      recommendations: recommendations.slice(0, 3), // Top 3 recommendations
      compatibleRecipes: compatibleRecipes.slice(0, 5), // Top 5 recipes
      userProfile: formData,
    });
    setCurrentStep(4);
  };

  const getColorForPlan = (planName) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-green-500",
      "from-green-500 to-blue-500",
      "from-orange-500 to-red-500",
      "from-green-400 to-emerald-500",
      "from-indigo-500 to-purple-500",
    ];
    return colors[planName.length % colors.length];
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
              <div className="space-y-6">
                {/* Diet Plan Recommendations */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Recommended Diet Plans
                  </h4>
                  <div className="space-y-4">
                    {results.recommendations.map((diet, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-green-500"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {diet.name}
                                </h4>
                              </div>
                              <p className="text-gray-600 mb-3">
                                {diet.description}
                              </p>

                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-2">
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
                                {diet.duration && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                      Duration:
                                    </span>
                                    <span className="text-sm text-gray-700">
                                      {diet.duration}
                                    </span>
                                  </div>
                                )}
                                {diet.difficulty && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                      Difficulty:
                                    </span>
                                    <span className="text-sm text-gray-700">
                                      {diet.difficulty}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Key Benefits:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {diet.benefits.map((benefit, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-gray-600"
                                    >
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {diet.realData && diet.id && (
                                <div className="mt-4">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      navigate(`/diet-plans/${diet.id}`)
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    View This Plan
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Compatible Recipes */}
                {results.compatibleRecipes &&
                  results.compatibleRecipes.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Compatible Recipes ({results.compatibleRecipes.length}{" "}
                        found)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.compatibleRecipes.map((recipe, index) => (
                          <Card
                            key={index}
                            className="border border-green-200 hover:border-green-300 transition-colors"
                          >
                            <CardContent className="p-4">
                              <h5 className="font-medium text-gray-900 mb-2">
                                {recipe.name}
                              </h5>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {recipe.description ||
                                  "Delicious and healthy recipe"}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {recipe.prepTime && (
                                    <span className="text-xs text-gray-500">
                                      {recipe.prepTime}
                                    </span>
                                  )}
                                  {recipe.difficulty && (
                                    <Badge variant="outline" size="sm">
                                      {recipe.difficulty}
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    navigate(`/recipes/${recipe._id}`)
                                  }
                                >
                                  View Recipe
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Next Steps</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your preferences, we've found{" "}
                        {results.recommendations.length} compatible diet plan(s)
                        and {results.compatibleRecipes?.length || 0} matching
                        recipes from our database. Start with the highest
                        compatibility plan for best results!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => navigate("/diet-plans")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    View All Diet Plans
                  </Button>
                  <Button
                    onClick={() => navigate("/recipes")}
                    variant="outline"
                  >
                    Browse All Recipes
                  </Button>
                  {results.recommendations.length > 0 &&
                    results.recommendations[0].realData && (
                      <Button
                        onClick={() =>
                          navigate(
                            `/diet-plans/${results.recommendations[0].id}`
                          )
                        }
                        variant="secondary"
                      >
                        Start Best Match Plan
                      </Button>
                    )}
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
