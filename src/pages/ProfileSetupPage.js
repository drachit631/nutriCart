import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../components/ui/use-toast";

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    age: "",
    height: "",
    weight: "",
    gender: "",

    // Health Goals
    healthGoals: [],
    activityLevel: "",

    // Diet Preferences
    dietType: "",
    allergies: [],
    restrictions: [],

    // Budget & Location
    budget: "",
    location: "",

    // Lifestyle
    cookingTime: "",
    mealPrepPreference: "",
  });

  const steps = [
    { id: 1, title: "Personal Info", description: "Tell us about yourself" },
    { id: 2, title: "Health Goals", description: "What are your objectives?" },
    { id: 3, title: "Diet Preferences", description: "Your dietary needs" },
    { id: 4, title: "Budget & Lifestyle", description: "Your preferences" },
  ];

  const healthGoalOptions = [
    { id: "weight_loss", label: "Weight Loss", icon: "📉" },
    { id: "muscle_gain", label: "Muscle Gain", icon: "💪" },
    { id: "maintenance", label: "Weight Maintenance", icon: "⚖️" },
    { id: "energy_boost", label: "Energy Boost", icon: "⚡" },
    { id: "heart_health", label: "Heart Health", icon: "❤️" },
    { id: "digestive_health", label: "Digestive Health", icon: "🌱" },
  ];

  const dietTypeOptions = [
    {
      id: "balanced",
      label: "Balanced Diet",
      description: "A mix of all food groups",
    },
    { id: "keto", label: "Ketogenic", description: "High fat, low carb" },
    {
      id: "mediterranean",
      label: "Mediterranean",
      description: "Heart-healthy, whole foods",
    },
    { id: "vegan", label: "Vegan", description: "Plant-based only" },
    {
      id: "vegetarian",
      label: "Vegetarian",
      description: "No meat, includes dairy",
    },
    { id: "paleo", label: "Paleo", description: "Whole foods, no processed" },
    {
      id: "low_carb",
      label: "Low Carb",
      description: "Reduced carbohydrate intake",
    },
  ];

  const allergyOptions = [
    "Dairy",
    "Gluten",
    "Nuts",
    "Shellfish",
    "Eggs",
    "Soy",
    "Fish",
    "Sesame",
  ];

  const activityLevels = [
    {
      id: "sedentary",
      label: "Sedentary",
      description: "Little to no exercise",
    },
    { id: "light", label: "Light", description: "1-3 days per week" },
    { id: "moderate", label: "Moderate", description: "3-5 days per week" },
    { id: "active", label: "Active", description: "6-7 days per week" },
    {
      id: "very_active",
      label: "Very Active",
      description: "2x per day or intense",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const profileData = {
        profileComplete: true,
        preferences: {
          ...formData,
          age: parseInt(formData.age) || null,
          height: parseInt(formData.height) || null,
          weight: parseInt(formData.weight) || null,
          budget: parseInt(formData.budget) || null,
          dietaryRestrictions: formData.restrictions || [],
          preferredDiets: formData.dietType ? [formData.dietType] : [],
          allergies: formData.allergies || [],
          healthGoals: formData.healthGoals || [],
          monthlyBudget: parseInt(formData.budget) || null,
          cookingExperience: formData.cookingTime || "",
        },
      };

      await updateProfile(profileData);

      toast({
        title: "Profile setup complete!",
        description:
          "Welcome to NutriCart! Finding your compatible diets and recipes...",
        variant: "default",
      });

      // Show compatible content before navigating
      await showCompatibleContent();
    } catch (error) {
      toast({
        title: "Setup failed",
        description: error.message || "An error occurred during profile setup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const showCompatibleContent = async () => {
    try {
      // Get compatible diets and recipes based on user preferences
      const compatibleDiets = getCompatibleDiets();
      const compatibleRecipes = await getCompatibleRecipes();

      // Show results modal or navigate with results
      toast({
        title: "Perfect matches found!",
        description: `Found ${compatibleDiets.length} compatible diets and ${compatibleRecipes.length} recipes for you!`,
        variant: "default",
      });

      // Navigate to dashboard after a delay to let user see the results
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error finding compatible content:", error);
      navigate("/dashboard");
    }
  };

  const getCompatibleDiets = () => {
    const { dietType, healthGoals, allergies } = formData;

    // Basic compatibility logic
    const compatibleDiets = [];

    if (dietType) {
      compatibleDiets.push(dietType);
    }

    // Add related diets based on health goals
    if (healthGoals.includes("weight_loss")) {
      if (!compatibleDiets.includes("keto")) compatibleDiets.push("keto");
      if (!compatibleDiets.includes("low_carb"))
        compatibleDiets.push("low_carb");
    }

    if (healthGoals.includes("heart_health")) {
      if (!compatibleDiets.includes("mediterranean"))
        compatibleDiets.push("mediterranean");
      if (!compatibleDiets.includes("dash")) compatibleDiets.push("dash");
    }

    if (healthGoals.includes("muscle_gain")) {
      if (!compatibleDiets.includes("high_protein"))
        compatibleDiets.push("high_protein");
    }

    // Filter out diets based on allergies
    if (allergies.includes("Dairy")) {
      return compatibleDiets.filter((diet) => !["vegetarian"].includes(diet));
    }

    if (allergies.includes("Gluten")) {
      compatibleDiets.push("gluten_free");
    }

    return compatibleDiets;
  };

  const getCompatibleRecipes = async () => {
    // This would normally call the API to get recipes
    // For now, return mock data based on preferences
    const compatibleDiets = getCompatibleDiets();
    return compatibleDiets.map((diet) => ({
      id: diet,
      name: `${diet.charAt(0).toUpperCase() + diet.slice(1)} Recipe Collection`,
      diet: diet,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                  Age
                </label>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="25"
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                  Height (cm)
                </label>
                <Input
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="170"
                  min="100"
                  max="250"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                  Weight (kg)
                </label>
                <Input
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="70"
                  min="20"
                  max="300"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4 font-heading">
                What are your health goals? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {healthGoalOptions.map((goal) => (
                  <label
                    key={goal.id}
                    className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                      formData.healthGoals.includes(goal.id)
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="healthGoals"
                      value={goal.id}
                      checked={formData.healthGoals.includes(goal.id)}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-xl">{goal.icon}</span>
                    <span className="text-sm font-medium font-body">
                      {goal.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4 font-heading">
                Activity Level
              </label>
              <div className="space-y-2">
                {activityLevels.map((level) => (
                  <label
                    key={level.id}
                    className={`flex items-start space-x-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                      formData.activityLevel === level.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activityLevel"
                      value={level.id}
                      checked={formData.activityLevel === level.id}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium font-heading">
                        {level.label}
                      </div>
                      <div className="text-sm text-muted font-body">
                        {level.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4 font-heading">
                Preferred Diet Type
              </label>
              <div className="space-y-2">
                {dietTypeOptions.map((diet) => (
                  <label
                    key={diet.id}
                    className={`flex items-start space-x-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                      formData.dietType === diet.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dietType"
                      value={diet.id}
                      checked={formData.dietType === diet.id}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium font-heading">
                        {diet.label}
                      </div>
                      <div className="text-sm text-muted font-body">
                        {diet.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4 font-heading">
                Food Allergies (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allergyOptions.map((allergy) => (
                  <label
                    key={allergy}
                    className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-colors ${
                      formData.allergies.includes(allergy)
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="allergies"
                      value={allergy}
                      checked={formData.allergies.includes(allergy)}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-body">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                Monthly Grocery Budget (₹)
              </label>
              <Input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="5000"
                min="1000"
                max="50000"
              />
              <p className="text-xs text-muted mt-1">
                This helps us optimize your meal plans
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                Location (City)
              </label>
              <Input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Mumbai"
              />
              <p className="text-xs text-muted mt-1">
                For local farmer partnerships and delivery
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                How much time do you spend cooking daily?
              </label>
              <select
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="minimal">Less than 30 minutes</option>
                <option value="moderate">30-60 minutes</option>
                <option value="extensive">More than 1 hour</option>
                <option value="love_cooking">I love cooking (2+ hours)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-heading">
                Meal Prep Preference
              </label>
              <select
                name="mealPrepPreference"
                value={formData.mealPrepPreference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="daily">Cook fresh daily</option>
                <option value="weekly">Weekly meal prep</option>
                <option value="mixed">Mix of both</option>
                <option value="convenience">Prefer convenience foods</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading">
                NutriCart
              </span>
            </div>

            <Badge variant="premium" className="mb-4">
              🎯 Profile Setup
            </Badge>

            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
              Welcome, {user?.firstName}!
            </h1>
            <p className="text-muted font-body">
              Let's personalize your nutrition journey
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground font-heading">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-muted font-body">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Skip Setup
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Completing Setup..." : "Complete Setup"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
