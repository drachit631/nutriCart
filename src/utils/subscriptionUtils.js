// Subscription tiers and their features
export const SUBSCRIPTION_TIERS = {
  FREE: "free",
  PREMIUM: "premium",
  PRO: "pro",
};

export const SUBSCRIPTION_FEATURES = {
  // Free tier features
  BASIC_DIET_PLANS: "basicDietPlans",
  BASIC_RECIPES: "basicRecipes",

  // Premium tier features
  PROGRESS_TRACKING: "progressTracking",
  PREMIUM_DIET_PLANS: "premiumDietPlans",
  PRIORITY_SUPPORT: "prioritySupport",
  EXCLUSIVE_RECIPES: "exclusiveRecipes",
  NUTRITIONAL_ANALYSIS: "nutritionalAnalysis",

  // Pro tier features
  ADVANCED_ANALYTICS: "advancedAnalytics",
  RESTAURANT_RECOMMENDATIONS: "restaurantRecommendations",
  PRIORITY_SUPPORT_24X7: "prioritySupport24x7",
  EXCLUSIVE_WORKSHOPS: "exclusiveWorkshops",
  PRO_RECIPES: "proRecipes",
  PRO_DIET_PLANS: "proDietPlans",
  ONE_ON_ONE_CONSULTATION: "oneOnOneConsultation",
};

export const TIER_FEATURES = {
  [SUBSCRIPTION_TIERS.FREE]: {
    [SUBSCRIPTION_FEATURES.BASIC_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.BASIC_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.PROGRESS_TRACKING]: false,
    [SUBSCRIPTION_FEATURES.PREMIUM_DIET_PLANS]: false,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT]: false,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_RECIPES]: false,
    [SUBSCRIPTION_FEATURES.NUTRITIONAL_ANALYSIS]: false,
    [SUBSCRIPTION_FEATURES.ADVANCED_ANALYTICS]: false,
    [SUBSCRIPTION_FEATURES.RESTAURANT_RECOMMENDATIONS]: false,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT_24X7]: false,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_WORKSHOPS]: false,
    [SUBSCRIPTION_FEATURES.PRO_RECIPES]: false,
    [SUBSCRIPTION_FEATURES.PRO_DIET_PLANS]: false,
    [SUBSCRIPTION_FEATURES.ONE_ON_ONE_CONSULTATION]: false,
  },
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    [SUBSCRIPTION_FEATURES.BASIC_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.BASIC_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.PROGRESS_TRACKING]: true,
    [SUBSCRIPTION_FEATURES.PREMIUM_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT]: true,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.NUTRITIONAL_ANALYSIS]: true,
    [SUBSCRIPTION_FEATURES.ADVANCED_ANALYTICS]: false,
    [SUBSCRIPTION_FEATURES.RESTAURANT_RECOMMENDATIONS]: false,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT_24X7]: false,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_WORKSHOPS]: false,
    [SUBSCRIPTION_FEATURES.PRO_RECIPES]: false,
    [SUBSCRIPTION_FEATURES.PRO_DIET_PLANS]: false,
    [SUBSCRIPTION_FEATURES.ONE_ON_ONE_CONSULTATION]: false,
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    [SUBSCRIPTION_FEATURES.BASIC_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.BASIC_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.PROGRESS_TRACKING]: true,
    [SUBSCRIPTION_FEATURES.PREMIUM_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT]: true,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.NUTRITIONAL_ANALYSIS]: true,
    [SUBSCRIPTION_FEATURES.ADVANCED_ANALYTICS]: true,
    [SUBSCRIPTION_FEATURES.RESTAURANT_RECOMMENDATIONS]: true,
    [SUBSCRIPTION_FEATURES.PRIORITY_SUPPORT_24X7]: true,
    [SUBSCRIPTION_FEATURES.EXCLUSIVE_WORKSHOPS]: true,
    [SUBSCRIPTION_FEATURES.PRO_RECIPES]: true,
    [SUBSCRIPTION_FEATURES.PRO_DIET_PLANS]: true,
    [SUBSCRIPTION_FEATURES.ONE_ON_ONE_CONSULTATION]: true,
  },
};

export const TIER_PRICING = {
  [SUBSCRIPTION_TIERS.FREE]: {
    price: 0,
    currency: "INR",
    period: "Forever",
    features: [
      "Basic Diet Plans",
      "Basic Recipes",
      "Community Support",
      "Basic Cart Management",
    ],
  },
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    price: 499,
    currency: "INR",
    period: "per month",
    features: [
      "All Free Features",
      "Progress Tracking of Diet Plans",
      "Premium Diet Plans",
      "Priority Customer Support",
      "Exclusive Recipes",
      "Nutritional Analysis",
    ],
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    price: 799,
    currency: "INR",
    period: "per month",
    features: [
      "All Premium Features",
      "Advanced Analytics",
      "Restaurant Recommendations",
      "24/7 Priority Support",
      "Exclusive Workshop Notifications",
      "Pro Recipes and Diet Plans",
      "1-on-1 Nutrition Consultation",
    ],
  },
};

// Helper functions
export const hasFeature = (userSubscription, feature) => {
  if (!userSubscription || !userSubscription.tier) {
    return TIER_FEATURES[SUBSCRIPTION_TIERS.FREE][feature] || false;
  }

  const userTier = userSubscription.tier;
  return TIER_FEATURES[userTier]
    ? TIER_FEATURES[userTier][feature] || false
    : false;
};

export const canAccessContent = (userSubscription, contentTier) => {
  if (!userSubscription || !userSubscription.tier) {
    return contentTier === SUBSCRIPTION_TIERS.FREE;
  }

  const userTier = userSubscription.tier;

  if (userTier === SUBSCRIPTION_TIERS.PRO) return true;
  if (
    userTier === SUBSCRIPTION_TIERS.PREMIUM &&
    contentTier !== SUBSCRIPTION_TIERS.PRO
  )
    return true;
  if (
    userTier === SUBSCRIPTION_TIERS.FREE &&
    contentTier === SUBSCRIPTION_TIERS.FREE
  )
    return true;

  return false;
};

export const getSubscriptionLimits = (userSubscription) => {
  const tier = userSubscription?.tier || SUBSCRIPTION_TIERS.FREE;

  const limits = {
    [SUBSCRIPTION_TIERS.FREE]: {
      maxDietPlans: 3,
      maxRecipes: 10,
      maxTrackingDays: 0,
      maxAnalyticsReports: 0,
    },
    [SUBSCRIPTION_TIERS.PREMIUM]: {
      maxDietPlans: -1, // unlimited
      maxRecipes: -1, // unlimited
      maxTrackingDays: 90,
      maxAnalyticsReports: 5,
    },
    [SUBSCRIPTION_TIERS.PRO]: {
      maxDietPlans: -1, // unlimited
      maxRecipes: -1, // unlimited
      maxTrackingDays: -1, // unlimited
      maxAnalyticsReports: -1, // unlimited
    },
  };

  return limits[tier];
};

export const getTierDisplayName = (tier) => {
  const names = {
    [SUBSCRIPTION_TIERS.FREE]: "Free",
    [SUBSCRIPTION_TIERS.PREMIUM]: "Premium",
    [SUBSCRIPTION_TIERS.PRO]: "Pro",
  };

  return names[tier] || "Free";
};

export const isSubscriptionActive = (userSubscription) => {
  if (!userSubscription) return false;
  if (userSubscription.tier === SUBSCRIPTION_TIERS.FREE) return true;

  const now = new Date();
  const endDate = new Date(userSubscription.endDate);

  return userSubscription.isActive && endDate > now;
};
