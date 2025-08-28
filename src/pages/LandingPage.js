import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui";
import {
  HeroSection,
  FeaturesGrid,
  Navigation,
  Footer,
  PricingGrid,
  DietPlansCarousel,
  BudgetDietPlans,
  RecipeIntegration,
  DietCompatibilityChecker,
} from "../components/ui";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                NutriCart?
              </span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto font-body">
              We combine cutting-edge AI technology with nutrition science to
              make healthy eating simple, sustainable, and enjoyable for
              everyone.
            </p>
          </div>

          <FeaturesGrid />
        </div>
      </section>

      {/* Budget-Friendly Diet Plans */}
      <BudgetDietPlans />

      {/* Diet Plans Carousel */}
      <DietPlansCarousel />

      {/* Recipe Integration */}
      <RecipeIntegration />

      {/* Diet Compatibility Checker */}
      <DietCompatibilityChecker />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6 font-heading">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-primary-foreground mb-8 font-body">
            Join thousands of users who have already achieved their health goals
            with NutriCart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => {
                if (!user) {
                  navigate("/signup");
                } else {
                  navigate("/dashboard");
                }
              }}
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
