import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
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
import { recipesAPI, productsAPI } from "../services/api";

export default function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for products from database
  const [products, setProducts] = useState([]);

  // Fetch recipe and products from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch specific recipe from database
        const recipeData = await recipesAPI.getById(id);

        // Fetch all products from database
        const productsData = await productsAPI.getAll();

        setProducts(productsData);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load recipe. Please try again.",
          variant: "destructive",
        });
        navigate("/recipes");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Remove cart.items dependency since we calculate cart status in render

  const handleAddIngredientToCart = async (ingredient) => {
    // Find matching product to get product ID
    const matchingProduct = products.find(
      (product) =>
        product.name.toLowerCase().trim() ===
          ingredient.productName?.toLowerCase().trim() ||
        product.name.toLowerCase().trim() ===
          ingredient.name.toLowerCase().trim()
    );

    if (!matchingProduct) {
      toast({
        title: "Ingredient Not Available",
        description: `${ingredient.name} is not available for purchase in our store.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart(matchingProduct._id, 1);

      toast({
        title: "Added to Cart",
        description: `${ingredient.name} has been added to your cart!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding ingredient to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add ingredient to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveIngredientFromCart = async (ingredient) => {
    // Find matching product to get product ID
    const matchingProduct = products.find(
      (product) =>
        product.name.toLowerCase().trim() ===
          ingredient.productName?.toLowerCase().trim() ||
        product.name.toLowerCase().trim() ===
          ingredient.name.toLowerCase().trim()
    );

    if (!matchingProduct) {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive",
      });
      return;
    }

    try {
      await removeFromCart(matchingProduct._id);

      toast({
        title: "Removed from Cart",
        description: `${ingredient.name} has been removed from your cart!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error removing ingredient from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove ingredient from cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateIngredientQuantity = async (ingredient, newQuantity) => {
    // Find matching product to get product ID
    const matchingProduct = products.find(
      (product) =>
        product.name.toLowerCase().trim() ===
          ingredient.productName?.toLowerCase().trim() ||
        product.name.toLowerCase().trim() ===
          ingredient.name.toLowerCase().trim()
    );

    if (!matchingProduct) {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive",
      });
      return;
    }

    if (newQuantity <= 0) {
      await handleRemoveIngredientFromCart(ingredient);
      return;
    }

    try {
      await updateQuantity(matchingProduct._id, newQuantity);

      toast({
        title: "Quantity Updated",
        description: `${ingredient.name} quantity updated to ${newQuantity}!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating ingredient quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOrderMissingIngredients = async () => {
    try {
      const missingIngredients = recipe.ingredients.filter((ingredient) => {
        const matchingProduct = products.find(
          (product) =>
            product.name.toLowerCase().trim() ===
              ingredient.productName?.toLowerCase().trim() ||
            product.name.toLowerCase().trim() ===
              ingredient.name.toLowerCase().trim()
        );

        if (!matchingProduct) return false; // Not available

        const cartItem = cart.items.find(
          (item) => item.productId === matchingProduct._id
        );

        return !cartItem; // Not in cart
      });

      if (missingIngredients.length === 0) {
        toast({
          title: "All Ingredients Available",
          description:
            "All ingredients for this recipe are already in your cart!",
          variant: "default",
        });
        return;
      }

      // Add all missing ingredients to cart
      for (const ingredient of missingIngredients) {
        const matchingProduct = products.find(
          (product) =>
            product.name.toLowerCase().trim() ===
              ingredient.productName?.toLowerCase().trim() ||
            product.name.toLowerCase().trim() ===
              ingredient.name.toLowerCase().trim()
        );

        if (matchingProduct) {
          await addToCart(matchingProduct._id, 1);
        }
      }

      toast({
        title: "Ingredients Added",
        description: `${missingIngredients.length} ingredients have been added to your cart!`,
        variant: "default",
      });

      // Stay on current page - no navigation needed
    } catch (error) {
      console.error("Error adding ingredients to cart:", error);
      toast({
        title: "Error",
        description:
          "Failed to add some ingredients to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderIngredientStatus = (ingredient) => {
    if (!ingredient.productId) {
      return (
        <Badge variant="secondary" className="text-xs">
          Pantry Item
        </Badge>
      );
    }

    if (!ingredient.available) {
      return (
        <Badge variant="destructive" className="text-xs">
          Not Available
        </Badge>
      );
    }

    if (ingredient.inCart) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-600 font-medium">
            In Cart: {ingredient.cartQuantity} × ₹{ingredient.price}
          </span>
          <div className="flex items-center space-x-1 bg-green-100 rounded-lg px-2 py-1">
            <button
              onClick={() =>
                handleUpdateIngredientQuantity(
                  ingredient,
                  Math.max(0, ingredient.cartQuantity - 1)
                )
              }
              className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-200 rounded"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">
              {ingredient.cartQuantity}
            </span>
            <button
              onClick={() =>
                handleUpdateIngredientQuantity(
                  ingredient,
                  ingredient.cartQuantity + 1
                )
              }
              className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-200 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleRemoveIngredientFromCart(ingredient)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleAddIngredientToCart(ingredient)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
      >
        ADD TO CART
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Recipe not found.</p>
            <Button onClick={() => navigate("/recipes")} className="mt-4">
              Back to Recipes
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/recipes")}
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
                {recipe.name}
              </h1>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Hero */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-6xl">{recipe.image}</div>
              <div>
                <h2 className="text-3xl font-bold font-heading">
                  {recipe.name}
                </h2>
                <p className="text-lg opacity-90">{recipe.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Badge variant="secondary" className="text-sm">
                ⏱️ {recipe.cookingTime || recipe.time || "N/A"}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                👥 {recipe.servings} servings
              </Badge>
              <Badge variant="secondary" className="text-sm">
                🔥 {recipe.calories} cal
              </Badge>
              <Badge variant="secondary" className="text-sm">
                📊 {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recipe Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags && recipe.tags.length > 0 ? (
                    recipe.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No tags available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Ingredients</CardTitle>
                <p className="text-sm text-muted">
                  Manage your shopping list for this recipe
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, idx) => {
                      // Find matching product to get price and availability
                      const matchingProduct = products.find(
                        (product) =>
                          product.name.toLowerCase().trim() ===
                            ingredient.productName?.toLowerCase().trim() ||
                          product.name.toLowerCase().trim() ===
                            ingredient.name.toLowerCase().trim()
                      );

                      const price = matchingProduct
                        ? matchingProduct.price
                        : ingredient.price || 0;
                      const available = !!matchingProduct;
                      const productId = matchingProduct?._id;

                      // Check if ingredient is in cart
                      const cartItem = cart.items.find(
                        (item) => item.productId === productId
                      );
                      const inCart = !!cartItem;
                      const cartQuantity = cartItem ? cartItem.quantity : 0;

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                inCart
                                  ? "bg-green-500"
                                  : available
                                  ? "bg-yellow-400"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <div>
                              <span className="text-sm text-foreground font-medium">
                                {ingredient.name}
                              </span>
                              <div className="text-xs text-muted">
                                {ingredient.quantity}
                                {available && (
                                  <span className="ml-2 text-green-600">
                                    • ₹{price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Cart Controls */}
                          {available ? (
                            inCart ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-600 font-medium">
                                  In Cart: {cartQuantity} × ₹{price}
                                </span>
                                <div className="flex items-center space-x-1 bg-green-100 rounded-lg px-2 py-1">
                                  <button
                                    onClick={() =>
                                      handleUpdateIngredientQuantity(
                                        ingredient,
                                        Math.max(0, cartQuantity - 1)
                                      )
                                    }
                                    className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-200 rounded"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-medium">
                                    {cartQuantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleUpdateIngredientQuantity(
                                        ingredient,
                                        cartQuantity + 1
                                      )
                                    }
                                    className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-200 rounded"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveIngredientFromCart(ingredient)
                                  }
                                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAddIngredientToCart(ingredient)
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                              >
                                ADD TO CART
                              </button>
                            )
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Not Available
                            </Badge>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm text-center">
                      No ingredients available
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={handleOrderMissingIngredients}
                    disabled={
                      !recipe.ingredients ||
                      recipe.ingredients.length === 0 ||
                      recipe.ingredients.every((ingredient) => {
                        const matchingProduct = products.find(
                          (product) =>
                            product.name.toLowerCase().trim() ===
                              ingredient.productName?.toLowerCase().trim() ||
                            product.name.toLowerCase().trim() ===
                              ingredient.name.toLowerCase().trim()
                        );

                        if (!matchingProduct) return true; // Not available, so "disabled"

                        const cartItem = cart.items.find(
                          (item) => item.productId === matchingProduct._id
                        );

                        return !!cartItem; // Already in cart
                      })
                    }
                  >
                    Order Missing Ingredients
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{instruction}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No instructions available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips - Only show if tips exist */}
            {recipe.tips && recipe.tips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Chef's Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Nutrition Information</CardTitle>
                <p className="text-sm text-muted">Per serving</p>
              </CardHeader>
              <CardContent>
                {recipe.nutrition ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {recipe.nutrition.calories}
                      </div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {recipe.nutrition.protein}
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {recipe.nutrition.carbs}
                      </div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {recipe.nutrition.fat}
                      </div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {recipe.nutrition.fiber}
                      </div>
                      <div className="text-sm text-gray-600">Fiber</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center">
                    Nutrition information not available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/recipes")}
                >
                  Browse More Recipes
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/products")}
                >
                  Shop Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
