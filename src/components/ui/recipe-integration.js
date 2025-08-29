import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { recipesAPI, productsAPI } from "../../services/api";
import {
  canAccessContent,
  getTierDisplayName,
} from "../../utils/subscriptionUtils";

const RecipeIntegration = () => {
  const { user, isAuthenticated } = useAuth();
  const { subscription } = useSubscription();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // State for recipes and products
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes and products from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch recipes from database
        const recipesData = await recipesAPI.getAll();

        // Fetch products from database
        const productsData = await productsAPI.getAll();

        console.log("Recipes from database:", recipesData);
        console.log("Products from database:", productsData);

        setRecipes(recipesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if an ingredient is in the global cart by matching product names
  const isIngredientInCart = (ingredientName) => {
    if (!cart || !cart.items || !products.length || !ingredientName)
      return false;

    // Find the product that matches the ingredient name
    const matchingProduct = products.find(
      (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
    );

    if (!matchingProduct) return false;

    // Check if this product is in the cart
    return cart.items.some((item) => item.productId === matchingProduct._id);
  };

  // Get quantity of ingredient in global cart
  const getIngredientCartQuantity = (ingredientName) => {
    if (!cart || !cart.items || !products.length || !ingredientName) return 0;

    // Find the product that matches the ingredient name
    const matchingProduct = products.find(
      (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
    );

    if (!matchingProduct) return 0;

    // Find the cart item
    const cartItem = cart.items.find(
      (item) => item.productId === matchingProduct._id
    );
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle adding ingredient to cart
  const handleAddIngredientToCart = async (ingredientName) => {
    if (!ingredientName) return;

    try {
      // Find the product in our local products array
      const matchingProduct = products.find(
        (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
      );

      if (matchingProduct) {
        await addToCart(matchingProduct._id, 1);
      } else {
        console.error("Product not found:", ingredientName);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle removing ingredient from cart
  const handleRemoveIngredientFromCart = async (ingredientName) => {
    if (!ingredientName) return;

    try {
      // Find the product in our local products array
      const matchingProduct = products.find(
        (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
      );

      if (matchingProduct) {
        await removeFromCart(matchingProduct._id);
      } else {
        console.error("Product not found:", ingredientName);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Handle updating ingredient quantity in cart
  const handleUpdateIngredientQuantity = async (
    ingredientName,
    newQuantity
  ) => {
    if (!ingredientName) return;

    try {
      // Find the product in our local products array
      const matchingProduct = products.find(
        (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
      );

      if (matchingProduct) {
        await updateQuantity(matchingProduct._id, newQuantity);
      } else {
        console.error("Product not found:", ingredientName);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Handle ordering missing ingredients
  const handleOrderMissingIngredients = async (recipe) => {
    if (!recipe.ingredients) return;

    for (const ingredient of recipe.ingredients) {
      if (
        ingredient.productName &&
        !isIngredientInCart(ingredient.productName)
      ) {
        await handleAddIngredientToCart(ingredient.productName);
      }
    }

    // Redirect to cart after ordering ingredients
    navigate("/cart");
  };

  // Navigate to specific recipe page
  const handleLearnMore = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  // Render ingredient for homepage (without cart controls)
  const renderHomepageIngredient = (ingredient) => {
    // Safety check for ingredient structure
    if (!ingredient) {
      console.warn("Ingredient is null or undefined");
      return null;
    }

    // Handle different possible ingredient structures
    const ingredientName = ingredient.productName || ingredient.name;
    if (!ingredientName) {
      console.warn("Ingredient missing both productName and name:", ingredient);
      return null;
    }

    // Find the matching product to get price
    const matchingProduct = products.find(
      (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
    );

    const price = matchingProduct
      ? matchingProduct.price
      : ingredient.price || 0;

    return (
      <div
        key={ingredientName}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
      >
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="font-medium">
            {ingredient.name || ingredientName}
          </span>
          <span className="text-gray-600">{ingredient.quantity}</span>
          <span className="text-green-600 font-semibold">₹{price}</span>
        </div>
      </div>
    );
  };

  // Render ingredient with full cart functionality (for recipes page)
  const renderFullIngredient = (ingredient) => {
    // Safety check for ingredient structure
    if (!ingredient) {
      console.warn("Ingredient is null or undefined");
      return null;
    }

    // Handle different possible ingredient structures
    const ingredientName = ingredient.productName || ingredient.name;
    if (!ingredientName) {
      console.warn("Ingredient missing both productName and name:", ingredient);
      return null;
    }

    const inCart = isIngredientInCart(ingredientName);
    const cartQuantity = getIngredientCartQuantity(ingredientName);

    // Find the matching product to get price
    const matchingProduct = products.find(
      (product) => product.name.toLowerCase() === ingredientName.toLowerCase()
    );

    const price = matchingProduct
      ? matchingProduct.price
      : ingredient.price || 0;

    return (
      <div
        key={ingredientName}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
      >
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="font-medium">
            {ingredient.name || ingredientName}
          </span>
          <span className="text-gray-600">{ingredient.quantity}</span>
          <span className="text-green-600 font-semibold">₹{price}</span>
        </div>

        {inCart ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600 font-medium">
              In Cart: {cartQuantity} × ₹{price}
            </span>
            <div className="flex items-center space-x-1 bg-green-100 rounded-lg px-2 py-1">
              <button
                onClick={() =>
                  handleUpdateIngredientQuantity(
                    ingredientName,
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
                    ingredientName,
                    cartQuantity + 1
                  )
                }
                className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-200 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveIngredientFromCart(ingredientName)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddIngredientToCart(ingredientName)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            ADD TO CART
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-semibold text-gray-600">
            Loading recipes...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe Integration + Smart Ingredient Ordering
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover delicious recipes and automatically add missing ingredients
            to your cart. Our smart system checks what you already have and
            suggests what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recipes.map((recipe) => {
            console.log("Recipe data:", recipe); // Debug log
            return (
              <div
                key={recipe._id || recipe.name}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>⏰</span>
                      <span>{recipe.cookingTime || "25 min"}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>👥</span>
                      <span>{recipe.servings || "2 servings"}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>🔥</span>
                      <span>{recipe.calories || "420 cal"}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>📊</span>
                      <span>{recipe.difficulty || "Easy"}</span>
                    </span>
                    <span
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                        recipe.subscriptionTier === "free"
                          ? "bg-green-100 text-green-800"
                          : recipe.subscriptionTier === "premium"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      <span>
                        {recipe.subscriptionTier === "free"
                          ? "🌟"
                          : recipe.subscriptionTier === "premium"
                          ? "💎"
                          : "👑"}
                      </span>
                      <span>{getTierDisplayName(recipe.subscriptionTier)}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {recipe.tags &&
                      recipe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Ingredients
                    </h4>
                    {recipe.ingredients &&
                      recipe.ingredients
                        .filter(
                          (ingredient) =>
                            ingredient &&
                            (ingredient.productName || ingredient.name)
                        )
                        .map((ingredient) =>
                          renderHomepageIngredient(ingredient)
                        )}
                  </div>

                  <div className="flex space-x-4">
                    {canAccessContent(subscription, recipe.subscriptionTier) ? (
                      <button
                        onClick={() => {
                          console.log(
                            "Clicking VIEW FULL RECIPE for recipe:",
                            recipe.name,
                            "with ID:",
                            recipe._id
                          );
                          if (recipe._id) {
                            handleLearnMore(recipe._id);
                          } else {
                            console.error("Recipe missing _id:", recipe);
                            alert("Recipe data error. Please try again.");
                          }
                        }}
                        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        VIEW FULL RECIPE
                      </button>
                    ) : (
                      <div className="w-full flex flex-col space-y-2">
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed font-medium"
                        >
                          🔒{" "}
                          {recipe.subscriptionTier === "premium"
                            ? "Premium"
                            : "Pro"}{" "}
                          Recipe
                        </button>
                        <button
                          onClick={() => navigate("/pricing")}
                          className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        >
                          Upgrade to Access
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecipeIntegration;
