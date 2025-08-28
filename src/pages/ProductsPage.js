import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Search,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Truck,
  Filter as FilterIcon,
  Grid3X3,
  List,
  SlidersHorizontal,
  Minus,
  Plus,
  CheckCircle,
  Leaf,
  Package,
  BarChart3,
  Lightbulb,
  TrendingDown,
  Flame,
  Crown,
  Zap,
  Target,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [activeFilterPreset, setActiveFilterPreset] = useState(null);
  const [showProductSuggestionModal, setShowProductSuggestionModal] =
    useState(false);
  const [showPopularRequestsModal, setShowPopularRequestsModal] =
    useState(false);
  const [productSuggestion, setProductSuggestion] = useState({
    name: "",
    category: "",
    description: "",
    reason: "",
  });

  const navigate = useNavigate();
  const {
    addToCart,
    updateQuantity,
    isInCart,
    getItemQuantity,
    isItemUpdating,
  } = useCart();
  const { toast } = useToast();

  const categories = [
    {
      id: "all",
      name: "All Products",
      icon: "🛒",
      color: "from-blue-500 to-cyan-500",
      description: "Complete product catalog",
    },
    {
      id: "grains",
      name: "Grains & Cereals",
      icon: "🌾",
      color: "from-amber-500 to-orange-500",
      description: "Premium whole grains",
    },
    {
      id: "seafood",
      name: "Fresh Seafood",
      icon: "🐟",
      color: "from-blue-500 to-indigo-500",
      description: "Ocean-fresh selection",
    },
    {
      id: "fruits",
      name: "Fresh Fruits",
      icon: "🍎",
      color: "from-red-500 to-pink-500",
      description: "Seasonal fruit varieties",
    },
    {
      id: "dairy",
      name: "Dairy Products",
      icon: "🥛",
      color: "from-blue-500 to-purple-500",
      description: "Pure dairy essentials",
    },
    {
      id: "nuts",
      name: "Nuts & Seeds",
      icon: "🥜",
      color: "from-amber-500 to-yellow-500",
      description: "Premium nut selection",
    },
    {
      id: "vegetables",
      name: "Fresh Vegetables",
      icon: "🥬",
      color: "from-green-500 to-emerald-500",
      description: "Farm-fresh produce",
    },
  ];

  const dietOptions = [
    { value: "vegan", label: "Vegan", icon: "🌱" },
    { value: "vegetarian", label: "Vegetarian", icon: "🥗" },
    { value: "keto", label: "Keto", icon: "🥑" },
    { value: "paleo", label: "Paleo", icon: "🦴" },
    { value: "mediterranean", label: "Mediterranean", icon: "🫒" },
    { value: "dash", label: "DASH", icon: "❤️" },
    { value: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  ];

  // New: Smart Filter Presets
  const filterPresets = [
    {
      id: "trending",
      name: "🔥 Trending Now",
      icon: Flame,
      description: "Most popular products this week",
      filters: { sortBy: "popularity", selectedCategory: "all" },
    },
    {
      id: "budget-friendly",
      name: "💰 Budget Friendly",
      icon: TrendingDown,
      description: "Best value for money",
      filters: { sortBy: "price-low", priceRange: [0, 500] },
    },
    {
      id: "premium",
      name: "👑 Premium Selection",
      icon: Crown,
      description: "High-end organic products",
      filters: { priceRange: [1000, 2000], selectedCategory: "all" },
    },
    {
      id: "quick-delivery",
      name: "⚡ Quick Delivery",
      icon: Zap,
      description: "Same day delivery available",
      filters: { selectedCategory: "all" },
    },
    {
      id: "health-focused",
      name: "🎯 Health Focused",
      icon: Target,
      description: "Products for specific health goals",
      filters: {
        selectedDiets: ["mediterranean", "dash"],
        selectedCategory: "all",
      },
    },
    {
      id: "organic",
      name: "🌿 100% Organic",
      icon: Leaf,
      description: "Certified organic products only",
      filters: { selectedCategory: "all" },
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
    selectedDiets,
  ]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesDiet =
        selectedDiets.length === 0 ||
        selectedDiets.some((diet) => product.dietCompatible?.includes(diet));

      return matchesSearch && matchesCategory && matchesPrice && matchesDiet;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await updateQuantity(productId, 0);
      } else {
        await updateQuantity(productId, newQuantity);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, 2000]);
    setSelectedDiets([]);
    setSortBy("featured");
    setActiveFilterPreset(null);
  };

  const applyFilterPreset = (preset) => {
    setActiveFilterPreset(preset.id);
    setSortBy(preset.filters.sortBy || "featured");
    setPriceRange(preset.filters.priceRange || [0, 2000]);
    setSelectedDiets(preset.filters.selectedDiets || []);
    setSelectedCategory(preset.filters.selectedCategory || "all");

    toast({
      title: "Filter Preset Applied!",
      description: preset.description,
      variant: "default",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-green-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700">
              Loading Amazing Products
            </p>
            <p className="text-gray-500">
              Preparing your healthy shopping experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section - Matching Website Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Award className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">
              Premium Quality Assured
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Discover Fresh &{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Healthy Products
            </span>
          </h1>

          <p className="text-lg text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            From farm to table, we bring you the finest organic and nutritious
            products to support your healthy lifestyle journey. Every item is
            carefully selected for quality and freshness.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products, categories, or dietary preferences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-base border-0 rounded-full shadow-2xl focus:ring-4 focus:ring-green-300/50 bg-white/95 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {products.length}+
              </div>
              <div className="text-green-100 text-sm font-medium">
                Premium Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">100%</div>
              <div className="text-green-100 text-sm font-medium">
                Quality Verified
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">24h</div>
              <div className="text-green-100 text-sm font-medium">
                Express Delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* NEW: Smart Filter Presets */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Smart Filter Presets
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filterPresets.map((preset) => {
              const IconComponent = preset.icon;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyFilterPreset(preset)}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    activeFilterPreset === preset.id
                      ? "border-green-500 bg-green-50 shadow-lg scale-105"
                      : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md hover:scale-105"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent
                      className={`w-5 h-5 ${
                        activeFilterPreset === preset.id
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        activeFilterPreset === preset.id
                          ? "text-green-800"
                          : "text-gray-700"
                      }`}
                    >
                      {preset.name}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      activeFilterPreset === preset.id
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {preset.description}
                  </p>

                  {activeFilterPreset === preset.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Filter System */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FilterIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Advanced Filters
                </h2>
                <p className="text-sm text-gray-500">
                  Refine your product selection
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? "Hide" : "Show"} Advanced
            </Button>
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Product Categories
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span>{category.name}</span>
                    {selectedCategory === category.id && (
                      <CheckCircle className="w-4 h-4 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="featured">⭐ Featured</option>
                <option value="popularity">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💰 Price: High to Low</option>
                <option value="name">📝 Name A-Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Display Mode
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹0</span>
                      <span>₹2000+</span>
                    </div>
                  </div>
                </div>

                {/* Diet Preferences */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Dietary Preferences
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietOptions.map((diet) => (
                      <button
                        key={diet.value}
                        onClick={() => {
                          setSelectedDiets((prev) =>
                            prev.includes(diet.value)
                              ? prev.filter((d) => d !== diet.value)
                              : [...prev, diet.value]
                          );
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDiets.includes(diet.value)
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mr-1">{diet.icon}</span>
                        {diet.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-center">
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-gray-600 text-lg">
                Showing{" "}
                <span className="font-bold text-green-600 text-xl">
                  {filteredProducts.length}
                </span>{" "}
                products
                {searchTerm && (
                  <>
                    {" "}
                    for "
                    <span className="font-semibold text-blue-600">
                      {searchTerm}
                    </span>
                    "
                  </>
                )}
                {selectedCategory !== "all" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-purple-600">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </span>
                  </>
                )}
              </p>
              {(searchTerm ||
                selectedCategory !== "all" ||
                selectedDiets.length > 0) && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  Filtered Results
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="text-8xl mb-4">🔍</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              No products found
            </h3>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
              Try adjusting your search criteria or filters to discover more
              amazing products.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Target className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-gray-300 hover:border-gray-400"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Homepage
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }
          >
            {filteredProducts.map((product, index) => (
              <Card
                key={product._id}
                className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 bg-white/90 backdrop-blur-sm relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-8">
                  <div className="text-7xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>

                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.originalPrice > product.price && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        -
                        {getDiscountPercentage(
                          product.originalPrice,
                          product.price
                        )}
                        %
                      </div>
                    )}
                    {product.tags?.includes("Organic") && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Leaf className="w-3 h-3" />
                        Organic
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl">
                      <Heart className="w-4 h-4 text-red-500" />
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                    >
                      <Eye className="w-4 h-4 text-blue-500" />
                    </button>
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      Out of Stock
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1 bg-black/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                    <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.rating}/5
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Supplier Info */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Truck className="w-4 h-4 text-green-500" />
                    <span className="truncate">{product.supplier}</span>
                  </div>

                  {/* Cart Actions */}
                  <div className="space-y-3">
                    {isInCart(product._id) ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-800">
                            In Cart: {getItemQuantity(product._id)} × ₹
                            {product.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                getItemQuantity(product._id) - 1
                              )
                            }
                            disabled={isItemUpdating(product._id)}
                            className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-center font-semibold min-w-[2rem]">
                            {getItemQuantity(product._id)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                getItemQuantity(product._id) + 1
                              )
                            }
                            disabled={isItemUpdating(product._id)}
                            className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}

                    {/* View Details Button */}
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300 group-hover:scale-105"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-300/50 rounded-xl transition-all duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filteredProducts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                    Product Suggestions
                  </span>
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>

                <h3 className="text-3xl font-bold mb-6">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                  Help us improve our product selection! Suggest products you'd
                  like to see on NutriCart. We're always expanding our catalog
                  based on customer needs and preferences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setShowProductSuggestionModal(true)}
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Suggest a Product
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    onClick={() => setShowPopularRequestsModal(true)}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View Popular Requests
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Suggestion Modal */}
        {showProductSuggestionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Suggest a Product
                  </h3>
                  <button
                    onClick={() => setShowProductSuggestionModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="sr-only">Close</span>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission
                    toast({
                      title: "Thank you!",
                      description:
                        "Your product suggestion has been submitted successfully.",
                      variant: "default",
                    });
                    setShowProductSuggestionModal(false);
                    setProductSuggestion({
                      name: "",
                      category: "",
                      description: "",
                      reason: "",
                    });
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <Input
                        required
                        value={productSuggestion.name}
                        onChange={(e) =>
                          setProductSuggestion((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Organic Quinoa Seeds"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={productSuggestion.category}
                        onChange={(e) =>
                          setProductSuggestion((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select a category</option>
                        {categories
                          .filter((c) => c.id !== "all")
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={productSuggestion.description}
                        onChange={(e) =>
                          setProductSuggestion((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe the product and its benefits..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Why do you need this? *
                      </label>
                      <textarea
                        required
                        value={productSuggestion.reason}
                        onChange={(e) =>
                          setProductSuggestion((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }))
                        }
                        placeholder="Tell us why this product would be valuable..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProductSuggestionModal(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        Submit Suggestion
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Popular Requests Modal */}
        {showPopularRequestsModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Popular Product Requests
                  </h3>
                  <button
                    onClick={() => setShowPopularRequestsModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="sr-only">Close</span>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">
                        Organic Moringa Powder
                      </h4>
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        47 requests
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      Pure moringa powder for smoothies and supplements
                    </p>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Users className="w-4 h-4" />
                      <span>Requested by health enthusiasts</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">
                        Fresh Microgreens Mix
                      </h4>
                      <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        32 requests
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      Mixed microgreens for salads and garnishing
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Users className="w-4 h-4" />
                      <span>Popular among fitness enthusiasts</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">
                        Plant-Based Protein Bars
                      </h4>
                      <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                        28 requests
                      </span>
                    </div>
                    <p className="text-sm text-purple-700 mb-2">
                      High-protein vegan bars with natural ingredients
                    </p>
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Users className="w-4 h-4" />
                      <span>Requested by vegan community</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Flame className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-amber-800">
                        Ancient Grains Bundle
                      </h4>
                      <span className="ml-auto bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                        25 requests
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 mb-2">
                      Mix of quinoa, amaranth, and teff grains
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-600">
                      <Users className="w-4 h-4" />
                      <span>Popular among nutritionists</span>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      These are the most requested products by our community
                    </p>
                    <Button
                      onClick={() => setShowPopularRequestsModal(false)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Got it!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #10b981, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
