import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  hasFeature,
  canAccessContent,
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_FEATURES,
} from "../utils/subscriptionUtils";

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setSubscription(
        user.subscription || { tier: SUBSCRIPTION_TIERS.FREE, isActive: true }
      );
    } else {
      setSubscription({ tier: SUBSCRIPTION_TIERS.FREE, isActive: true });
    }
  }, [isAuthenticated, user]);

  const upgradeSubscription = async (tier, paymentData) => {
    try {
      setLoading(true);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

      const newSubscription = {
        tier: tier,
        startDate: new Date().toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        paymentId: `pay_${Date.now()}`,
        features: getFeaturesByTier(tier),
      };

      setSubscription(newSubscription);

      // Update user subscription in backend
      if (user?.id) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/subscription`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ subscription: newSubscription }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update subscription in database");
          }

          console.log("✅ Subscription updated in database successfully");

          // Also refresh the user data to get the updated subscription
          if (refreshUser) {
            try {
              await refreshUser();
              console.log("✅ User data refreshed after subscription update");
            } catch (refreshError) {
              console.log(
                "Note: Could not auto-refresh user data:",
                refreshError.message
              );
            }
          }
        } catch (dbError) {
          console.error(
            "❌ Failed to update subscription in database:",
            dbError
          );
          // Don't fail the whole operation - local subscription is still updated
        }
      }

      console.log("Subscription upgraded to:", tier);

      return { success: true, subscription: newSubscription };
    } catch (error) {
      console.error("Subscription upgrade failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    try {
      setLoading(true);

      const updatedSubscription = {
        ...subscription,
        isActive: false,
      };

      setSubscription(updatedSubscription);

      // TODO: Update user subscription in backend
      console.log("Subscription cancelled");

      return { success: true };
    } catch (error) {
      console.error("Subscription cancellation failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getFeaturesByTier = (tier) => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.PREMIUM:
        return {
          basicDietPlans: true,
          basicRecipes: true,
          progressTracking: true,
          premiumDietPlans: true,
          prioritySupport: true,
          exclusiveRecipes: true,
          nutritionalAnalysis: true,
          advancedAnalytics: false,
          restaurantRecommendations: false,
          prioritySupport24x7: false,
          exclusiveWorkshops: false,
          proRecipes: false,
          proDietPlans: false,
          oneOnOneConsultation: false,
        };
      case SUBSCRIPTION_TIERS.PRO:
        return {
          basicDietPlans: true,
          basicRecipes: true,
          progressTracking: true,
          premiumDietPlans: true,
          prioritySupport: true,
          exclusiveRecipes: true,
          nutritionalAnalysis: true,
          advancedAnalytics: true,
          restaurantRecommendations: true,
          prioritySupport24x7: true,
          exclusiveWorkshops: true,
          proRecipes: true,
          proDietPlans: true,
          oneOnOneConsultation: true,
        };
      default:
        return {
          basicDietPlans: true,
          basicRecipes: true,
          progressTracking: false,
          premiumDietPlans: false,
          prioritySupport: false,
          exclusiveRecipes: false,
          nutritionalAnalysis: false,
          advancedAnalytics: false,
          restaurantRecommendations: false,
          prioritySupport24x7: false,
          exclusiveWorkshops: false,
          proRecipes: false,
          proDietPlans: false,
          oneOnOneConsultation: false,
        };
    }
  };

  const checkFeatureAccess = (feature) => {
    return hasFeature(subscription, feature);
  };

  const checkContentAccess = (contentTier) => {
    return canAccessContent(subscription, contentTier);
  };

  const value = {
    subscription,
    loading,
    upgradeSubscription,
    cancelSubscription,
    checkFeatureAccess,
    checkContentAccess,
    hasFeature: checkFeatureAccess,
    canAccess: checkContentAccess,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
