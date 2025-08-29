import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  Award,
  Clock,
  Users,
  Tag,
  Leaf,
  CheckCircle,
  Minus,
  Plus,
  Eye,
} from "lucide-react";
import { productsAPI } from "../services/api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    updateQuantity,
    isInCart,
    getItemQuantity,
    isItemUpdating,
  } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity, product.price);
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

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);

    if (isInCart(product._id)) {
      try {
        await updateQuantity(product._id, newQuantity);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update quantity. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Product not found
          </h3>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/cart")}
                className="relative text-gray-600 hover:text-green-600"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-8xl">{product.image}</div>
            </div>

            {/* Image Gallery (if multiple images) */}
            <div className="flex gap-4 justify-center">
              {[product.image].map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {img}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Products</span>
              <span>/</span>
              <span>{product.category}</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {getRatingStars(product.rating)}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -
                      {getDiscountPercentage(
                        product.originalPrice,
                        product.price
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Savings Info */}
              {product.originalPrice > product.price && (
                <p className="text-green-600 font-medium">
                  You save ₹{product.originalPrice - product.price} on this
                  item!
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Leaf className="w-4 h-4 text-green-500" />
                <span>Fresh & Natural</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Award className="w-4 h-4 text-green-500" />
                <span>Premium Quality</span>
              </div>
            </div>



            {/* Add to Cart Section */}
            <div className="space-y-4">
              {isInCart(product._id) ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      In Cart: {getItemQuantity(product._id)} × ₹{product.price}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        updateQuantity(product._id, getItemQuantity(product._id) - 1)
                      }
                      disabled={isItemUpdating(product._id)}
                      variant="outline"
                      className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Remove 1
                    </Button>
                    <Button
                      onClick={() =>
                        updateQuantity(product._id, getItemQuantity(product._id) + 1)
                      }
                      disabled={isItemUpdating(product._id)}
                      variant="outline"
                      className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add 1
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{product.price}
                </Button>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:border-gray-400"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:border-gray-400"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Availability:</span>
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {product.inStock && (
                <div className="mt-2 text-sm text-gray-500">
                  {product.stockQuantity} {product.unit} available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          {/* Product Details */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Supplier</span>
                  <span className="font-medium">{product.supplier}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Unit</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{product.rating}/5</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">{product.reviews}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tags</span>
                  <div className="flex gap-2">
                    {product.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Diet Compatibility */}
          {product.dietCompatible && product.dietCompatible.length > 0 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Diet Compatibility
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.dietCompatible.map((diet, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {diet.charAt(0).toUpperCase() + diet.slice(1)}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Related Products CTA */}
          <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Explore More Products</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Discover our complete range of healthy and organic products that
              complement your lifestyle.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/products")}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              <Eye className="w-5 h-5 mr-2" />
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
