import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { dietPlansAPI } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

export default function DietPlansPage() {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDietPlans();
  }, []);

  const loadDietPlans = async () => {
    try {
      setLoading(true);
      const data = await dietPlansAPI.getAll();
      setDietPlans(data);
    } catch (error) {
      console.error("Error loading diet plans:", error);
      toast({
        title: "Error",
        description: "Failed to load diet plans. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartPlan = (dietPlan) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to start a diet plan.",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }

    // Navigate to diet plan onboarding flow
    navigate(`/diet-plans/${dietPlan._id}/onboarding`);
  };

  const handleLearnMore = (dietPlan) => {
    // Navigate to diet plan details page
    navigate(`/diet-plans/${dietPlan._id}`);
  };

  const filteredPlans = dietPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      !selectedDifficulty || plan.difficulty === selectedDifficulty;
    const matchesDuration =
      !selectedDuration || plan.duration === selectedDuration;

    return matchesSearch && matchesDifficulty && matchesDuration;
  });

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const durationOptions = [
    { value: "2-4 weeks", label: "2-4 weeks" },
    { value: "1-2 months", label: "1-2 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "Lifestyle", label: "Lifestyle" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading diet plans...</p>
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
              onClick={() => navigate("/")}
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
            <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search diet plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Difficulty and Duration Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Difficulties</option>
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Durations</option>
              {durationOptions.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Diet Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`text-4xl ${plan.color} bg-gradient-to-r ${plan.color} rounded-lg p-2`}
                  >
                    {plan.icon}
                  </div>
                  <span className="text-sm text-gray-500 capitalize">
                    {plan.difficulty}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Key Benefits:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.benefits?.slice(0, 3).map((benefit, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suitable For */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Suitable For:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.suitableFor?.slice(0, 2).map((suitable, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {suitable}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Duration: {plan.duration}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {plan.price === 0 ? "Free" : `₹${plan.price}`}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleStartPlan(plan)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Start This Plan
                  </Button>
                  <Button
                    onClick={() => handleLearnMore(plan)}
                    variant="outline"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No diet plans found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
