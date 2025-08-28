import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { dietPlansAPI } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "../components/ui/use-toast";

export default function DietPlanDetailsPage() {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startingPlan, setStartingPlan] = useState(false);

  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDietPlan();
  }, [id]);

  const loadDietPlan = async () => {
    try {
      setLoading(true);
      const data = await dietPlansAPI.getById(id);
      setDietPlan(data);
    } catch (error) {
      console.error("Error loading diet plan:", error);
      toast({
        title: "Error",
        description: "Failed to load diet plan details. Please try again.",
        variant: "destructive",
      });
      navigate("/diet-plans");
    } finally {
      setLoading(false);
    }
  };

  const handleStartPlan = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to start this diet plan.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      setStartingPlan(true);

      // TODO: Call API to start the diet plan for the user
      // await dietPlansAPI.startPlan(user.id, id);

      toast({
        title: "Diet Plan Started!",
        description: `You've successfully started the ${dietPlan.name} diet plan.`,
        variant: "default",
      });

      // Navigate to the diet plan flow
      navigate(`/diet-plans/${id}/onboarding`);
    } catch (error) {
      console.error("Error starting diet plan:", error);
      toast({
        title: "Error",
        description: "Failed to start diet plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setStartingPlan(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading diet plan details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dietPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Diet plan not found.</p>
            <Button onClick={() => navigate("/diet-plans")} className="mt-4">
              Back to Diet Plans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/diet-plans")}
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
              {dietPlan.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-6xl">{dietPlan.icon}</div>
              <div>
                <h2 className="text-3xl font-bold font-heading">
                  {dietPlan.name}
                </h2>
                <p className="text-lg opacity-90">{dietPlan.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Badge variant="secondary" className="text-sm">
                ⏱️ {dietPlan.duration}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                📊 {dietPlan.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                💰 {dietPlan.price === 0 ? "Free" : `₹${dietPlan.price}`}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dietPlan.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suitable For */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Who Is This Plan For?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dietPlan.suitableFor?.map((suitable, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {suitable}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Meal Structure */}
            {dietPlan.weeklyMeals && dietPlan.weeklyMeals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Weekly Meal Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dietPlan.weeklyMeals.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="border-l-4 border-primary pl-4"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Week {weekIndex + 1}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {week.meals?.map((meal, mealIndex) => (
                            <div
                              key={mealIndex}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <span className="text-sm text-gray-700">
                                {meal}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nutrition Information */}
            {dietPlan.nutritionInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Nutrition Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {dietPlan.nutritionInfo.calories}
                      </div>
                      <div className="text-sm text-gray-600">Calories/day</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {dietPlan.nutritionInfo.protein}g
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {dietPlan.nutritionInfo.carbs}g
                      </div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {dietPlan.nutritionInfo.fat}g
                      </div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Start Plan Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleStartPlan}
                  disabled={startingPlan}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {startingPlan ? "Starting Plan..." : "Start This Plan"}
                </Button>

                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Personalized meal plans</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Expert guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{dietPlan.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{dietPlan.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">
                    {dietPlan.price === 0 ? "Free" : `₹${dietPlan.price}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
