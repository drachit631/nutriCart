import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Button } from "./button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={handleLogoClick}
            >
              <h1 className="text-2xl font-bold text-green-600">NutriCart</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => navigate("/recipes")}
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Recipes
            </button>
            <button
              onClick={() => navigate("/diet-plans")}
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Diet Plans
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            {isAuthenticated && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Right side - Auth and Cart */}
          <div className="flex items-center space-x-4">
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

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button onClick={() => navigate("/signup")} size="sm">
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Hi, {user?.firstName || "User"}!
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => {
                  handleHomeClick();
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/products");
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Products
              </button>
              <button
                onClick={() => {
                  navigate("/diet-plans");
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Diet Plans
              </button>
              <button
                onClick={() => {
                  navigate("/pricing");
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Pricing
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
