import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";

export function PantrySync() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const pantryItems = [
    {
      name: "Organic Tomatoes",
      quantity: "6 pieces",
      expiry: "3 days",
      category: "Vegetables",
    },
    {
      name: "Greek Yogurt",
      quantity: "2 cups",
      expiry: "5 days",
      category: "Dairy",
    },
    {
      name: "Quinoa",
      quantity: "1 kg",
      expiry: "6 months",
      category: "Grains",
    },
    { name: "Almonds", quantity: "500g", expiry: "2 months", category: "Nuts" },
    {
      name: "Sweet Potatoes",
      quantity: "4 pieces",
      expiry: "1 week",
      category: "Vegetables",
    },
    {
      name: "Coconut Oil",
      quantity: "500ml",
      expiry: "1 year",
      category: "Oils",
    },
  ];

  const aiSuggestions = [
    {
      recipe: "Mediterranean Quinoa Bowl",
      ingredients: ["Quinoa", "Tomatoes", "Greek Yogurt"],
      pantryItems: 3,
      totalIngredients: 5,
      time: "20 min",
      nutrition: "High Protein",
    },
    {
      recipe: "Sweet Potato & Almond Salad",
      ingredients: ["Sweet Potatoes", "Almonds", "Mixed Greens"],
      pantryItems: 2,
      totalIngredients: 4,
      time: "15 min",
      nutrition: "Fiber Rich",
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsScanning(true);
        // Simulate scanning process
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="warning" className="mb-4 text-sm">
            📸 AI-Powered Pantry Sync
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
            Smart Pantry
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Management
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-body">
            Simply upload a photo of your pantry or fridge, and our AI will
            automatically detect items, track expiry dates, and suggest recipes
            using what you already have. Save money and reduce waste!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Upload & Scanning */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  📸 Upload Pantry Photo
                </CardTitle>
                <CardDescription className="font-body">
                  Take a photo of your pantry, fridge, or kitchen shelves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="pantry-upload"
                  />
                  <label htmlFor="pantry-upload" className="cursor-pointer">
                    <div className="text-4xl mb-4">📷</div>
                    <div className="text-lg font-semibold text-foreground mb-2 font-heading">
                      Click to upload or drag & drop
                    </div>
                    <div className="text-muted font-body">
                      PNG, JPG up to 10MB
                    </div>
                  </label>
                </div>

                {/* Or Manual Input */}
                <div className="text-center">
                  <div className="text-muted mb-3 font-body">or</div>
                  <Button variant="outline" onClick={startScanning}>
                    Start Manual Scan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scanning Progress */}
            {isScanning && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                      AI Scanning Your Pantry...
                    </h3>
                    <p className="text-muted mb-4 font-body">
                      Detecting items, reading labels, and analyzing expiry
                      dates
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full animate-pulse"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Scan Complete */}
            {scanComplete && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                    Scan Complete!
                  </h3>
                  <p className="text-muted font-body">
                    AI detected 6 items in your pantry
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Detected Items */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  🤖 AI-Detected Pantry Items
                </CardTitle>
                <CardDescription className="font-body">
                  Items found in your pantry with expiry tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pantryItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <div className="font-medium text-foreground font-heading">
                            {item.name}
                          </div>
                          <div className="text-sm text-muted font-body">
                            {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            item.expiry.includes("days") &&
                            parseInt(item.expiry) <= 3
                              ? "destructive"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {item.expiry}
                        </Badge>
                        <div className="text-xs text-muted mt-1 font-body">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recipe Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  🍳 AI Recipe Suggestions
                </CardTitle>
                <CardDescription className="font-body">
                  Recipes using items you already have
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-foreground font-heading">
                          {suggestion.recipe}
                        </h4>
                        <Badge variant="success" className="text-xs">
                          {suggestion.nutrition}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted mb-3 font-body">
                        Uses {suggestion.pantryItems} pantry items •{" "}
                        {suggestion.time} • {suggestion.totalIngredients} total
                        ingredients
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {suggestion.ingredients.map((ingredient, idx) => (
                          <Badge
                            key={idx}
                            variant={
                              pantryItems.some((item) =>
                                item.name.includes(ingredient)
                              )
                                ? "default"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate("/products")}
                      >
                        View Recipe & Add Missing Ingredients
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
              💰 How Pantry Sync Saves You Money
            </h3>
            <p className="text-muted max-w-2xl mx-auto font-body">
              Our AI-powered pantry management helps you make the most of what
              you already have
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 font-heading">
                Reduce Food Waste
              </h4>
              <p className="text-sm text-muted font-body">
                AI tracks expiry dates and suggests recipes to use items before
                they go bad
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🛒</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 font-heading">
                Smart Shopping
              </h4>
              <p className="text-sm text-muted font-body">
                Only buy what you actually need, avoiding duplicate purchases
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🍳</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 font-heading">
                Creative Cooking
              </h4>
              <p className="text-sm text-muted font-body">
                AI suggests recipes using ingredients you already have,
                inspiring new meals
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white">
            <h3 className="text-2xl font-bold mb-4 font-heading">
              Ready to Sync Your Pantry?
            </h3>
            <p className="text-primary-foreground mb-8 max-w-2xl mx-auto font-body">
              Join thousands of users who are saving money and reducing waste
              with AI-powered pantry management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/signup")}
              >
                Start Pantry Sync
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/dashboard")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
