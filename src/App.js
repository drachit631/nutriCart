import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { Toaster } from "./components/ui/toaster";

// Pages
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DietPlansPage from "./pages/DietPlansPage";
import DietPlanDetailsPage from "./pages/DietPlanDetailsPage";
import DietPlanOnboardingPage from "./pages/DietPlanOnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import PricingPage from "./pages/PricingPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/diet-plans" element={<DietPlansPage />} />
                <Route
                  path="/diet-plans/:id"
                  element={<DietPlanDetailsPage />}
                />
                <Route
                  path="/diet-plans/:id/onboarding"
                  element={<DietPlanOnboardingPage />}
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile-setup" element={<ProfileSetupPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipePage />} />
                <Route path="/pricing" element={<PricingPage />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </CartProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
