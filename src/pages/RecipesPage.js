import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "../components/ui/use-toast";
import { recipesAPI } from "../services/api";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const navigate = useNavigate();

  // Fetch recipes from database
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipesAPI.getAll();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast({
          title: "Error",
          description: "Failed to load recipes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Healthy Recipes
              </h1>
              <p className="mt-2 text-gray-600">
                Discover delicious and nutritious recipes for your healthy
                lifestyle
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Recipe Image */}
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 text-center">
                <div className="text-6xl mb-4">{recipe.image}</div>
                <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
              </div>

              <CardContent className="p-6">
                {/* Recipe Info */}
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>⏱️ {recipe.cookingTime || recipe.time || "N/A"}</span>
                    <span>👥 {recipe.servings} servings</span>
                    <span>🔥 {recipe.calories} cal</span>
                  </div>

                  {/* Tags */}
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  variant="gradient"
                  className="w-full"
                >
                  VIEW FULL RECIPE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recipes available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
