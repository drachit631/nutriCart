// Mock Database for NutriCart Application

export const categories = [
  { id: 1, name: "Vegetables", icon: "🥬", color: "green" },
  { id: 2, name: "Fruits", icon: "🍎", color: "red" },
  { id: 3, name: "Grains", icon: "🌾", color: "yellow" },
  { id: 4, name: "Dairy", icon: "🥛", color: "blue" },
  { id: 5, name: "Proteins", icon: "🥩", color: "purple" },
  { id: 6, name: "Nuts & Seeds", icon: "🥜", color: "orange" },
  { id: 7, name: "Herbs & Spices", icon: "🌿", color: "green" },
  { id: 8, name: "Oils & Fats", icon: "🫒", color: "amber" },
];

export const products = [
  // Vegetables
  {
    id: 1,
    name: "Organic Spinach",
    category: "Vegetables",
    categoryId: 1,
    price: 45,
    originalPrice: 60,
    unit: "250g",
    image: "🥬",
    description: "Fresh organic spinach leaves, rich in iron and vitamins",
    nutritionFacts: {
      calories: 23,
      protein: "2.9g",
      carbs: "3.6g",
      fat: "0.4g",
      fiber: "2.2g",
    },
    benefits: ["High in iron", "Rich in vitamin K", "Antioxidant properties"],
    inStock: true,
    rating: 4.8,
    reviews: 156,
    farmSource: "Green Valley Farms",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean"],
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    categoryId: 1,
    price: 35,
    originalPrice: 45,
    unit: "500g",
    image: "🍅",
    description: "Juicy, vine-ripened tomatoes perfect for salads and cooking",
    nutritionFacts: {
      calories: 18,
      protein: "0.9g",
      carbs: "3.9g",
      fat: "0.2g",
      fiber: "1.2g",
    },
    benefits: ["Rich in lycopene", "Vitamin C source", "Heart healthy"],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    farmSource: "Sunny Acres Farm",
    organic: false,
    dietCompatible: ["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean"],
  },
  {
    id: 3,
    name: "Organic Carrots",
    category: "Vegetables",
    categoryId: 1,
    price: 40,
    originalPrice: 50,
    unit: "1kg",
    image: "🥕",
    description: "Sweet, crunchy organic carrots packed with beta-carotene",
    nutritionFacts: {
      calories: 41,
      protein: "0.9g",
      carbs: "9.6g",
      fat: "0.2g",
      fiber: "2.8g",
    },
    benefits: [
      "High in beta-carotene",
      "Good for eye health",
      "Natural sweetness",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 128,
    farmSource: "Orange Grove Organics",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Paleo", "Mediterranean"],
  },

  // Fruits
  {
    id: 4,
    name: "Fresh Avocados",
    category: "Fruits",
    categoryId: 2,
    price: 120,
    originalPrice: 150,
    unit: "4 pieces",
    image: "🥑",
    description: "Creamy, nutrient-dense avocados perfect for healthy fats",
    nutritionFacts: {
      calories: 160,
      protein: "2g",
      carbs: "9g",
      fat: "15g",
      fiber: "7g",
    },
    benefits: [
      "Healthy monounsaturated fats",
      "High in potassium",
      "Heart healthy",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 342,
    farmSource: "Tropical Farms Co.",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean"],
  },
  {
    id: 5,
    name: "Organic Apples",
    category: "Fruits",
    categoryId: 2,
    price: 80,
    originalPrice: 100,
    unit: "1kg",
    image: "🍎",
    description: "Crisp, sweet organic apples grown without pesticides",
    nutritionFacts: {
      calories: 52,
      protein: "0.3g",
      carbs: "14g",
      fat: "0.2g",
      fiber: "2.4g",
    },
    benefits: ["High in fiber", "Natural antioxidants", "Supports digestion"],
    inStock: true,
    rating: 4.5,
    reviews: 189,
    farmSource: "Mountain Orchard",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Paleo", "Mediterranean"],
  },

  // Grains
  {
    id: 6,
    name: "Organic Quinoa",
    category: "Grains",
    categoryId: 3,
    price: 180,
    originalPrice: 220,
    unit: "500g",
    image: "🌾",
    description: "Complete protein superfood grain, gluten-free and nutritious",
    nutritionFacts: {
      calories: 368,
      protein: "14g",
      carbs: "64g",
      fat: "6g",
      fiber: "7g",
    },
    benefits: ["Complete protein", "Gluten-free", "High in minerals"],
    inStock: true,
    rating: 4.8,
    reviews: 267,
    farmSource: "Andean Grains Co.",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Gluten-Free", "Mediterranean"],
  },

  // Dairy
  {
    id: 7,
    name: "Greek Yogurt",
    category: "Dairy",
    categoryId: 4,
    price: 65,
    originalPrice: 80,
    unit: "400g",
    image: "🥛",
    description: "Thick, creamy Greek yogurt with live probiotics",
    nutritionFacts: {
      calories: 130,
      protein: "20g",
      carbs: "9g",
      fat: "0g",
      fiber: "0g",
    },
    benefits: ["High in protein", "Probiotics for gut health", "Low in fat"],
    inStock: true,
    rating: 4.7,
    reviews: 198,
    farmSource: "Fresh Dairy Co.",
    organic: false,
    dietCompatible: ["Vegetarian", "Keto", "Mediterranean"],
  },

  // Proteins
  {
    id: 8,
    name: "Free-Range Chicken",
    category: "Proteins",
    categoryId: 5,
    price: 250,
    originalPrice: 300,
    unit: "1kg",
    image: "🐔",
    description: "Fresh, free-range chicken breast, hormone-free",
    nutritionFacts: {
      calories: 165,
      protein: "31g",
      carbs: "0g",
      fat: "3.6g",
      fiber: "0g",
    },
    benefits: ["Lean protein source", "No hormones", "Free-range"],
    inStock: true,
    rating: 4.6,
    reviews: 145,
    farmSource: "Happy Chicken Farm",
    organic: false,
    dietCompatible: ["Keto", "Paleo", "Mediterranean"],
  },

  // Nuts & Seeds
  {
    id: 9,
    name: "Raw Almonds",
    category: "Nuts & Seeds",
    categoryId: 6,
    price: 320,
    originalPrice: 380,
    unit: "500g",
    image: "🥜",
    description: "Premium quality raw almonds, perfect for snacking",
    nutritionFacts: {
      calories: 579,
      protein: "21g",
      carbs: "22g",
      fat: "50g",
      fiber: "12g",
    },
    benefits: ["Healthy fats", "High in vitamin E", "Heart healthy"],
    inStock: true,
    rating: 4.8,
    reviews: 234,
    farmSource: "Nut Valley Growers",
    organic: true,
    dietCompatible: ["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean"],
  },
];

export const dietPlans = [
  {
    id: 1,
    name: "Keto Diet Plan",
    description: "High-fat, low-carb diet for rapid weight loss",
    duration: "4 weeks",
    difficulty: "Medium",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 2156,
    features: [
      "Personalized meal plans",
      "Grocery shopping lists",
      "Recipe collection",
      "Progress tracking",
      "24/7 support",
    ],
    benefits: [
      "Rapid weight loss",
      "Increased energy",
      "Mental clarity",
      "Reduced appetite",
    ],
    macros: {
      carbs: "5-10%",
      protein: "20-25%",
      fat: "70-75%",
    },
    sampleMeals: [
      "Avocado and eggs breakfast",
      "Grilled chicken salad",
      "Salmon with vegetables",
    ],
    restrictions: ["High carb foods", "Sugar", "Grains", "Most fruits"],
  },
  {
    id: 2,
    name: "Mediterranean Diet",
    description: "Heart-healthy diet rich in whole foods",
    duration: "Lifestyle",
    difficulty: "Easy",
    price: 999,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 3247,
    features: [
      "Flexible meal plans",
      "Seasonal ingredients",
      "Traditional recipes",
      "Wine pairing guide",
      "Nutritionist support",
    ],
    benefits: [
      "Heart health",
      "Longevity",
      "Brain function",
      "Reduced inflammation",
    ],
    macros: {
      carbs: "45-50%",
      protein: "15-20%",
      fat: "35-40%",
    },
    sampleMeals: [
      "Greek yogurt with berries",
      "Mediterranean quinoa bowl",
      "Grilled fish with olive oil",
    ],
    restrictions: ["Processed foods", "Refined sugars", "Red meat (limited)"],
  },
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    dietPlan: "Keto Diet Plan",
    joinDate: "2024-01-15",
    preferences: {
      dietType: "keto",
      allergies: ["nuts"],
      restrictions: ["dairy-free"],
      budget: 5000,
    },
    orders: [
      {
        id: 1001,
        date: "2024-01-20",
        total: 450,
        items: [
          { productId: 1, quantity: 2 },
          { productId: 4, quantity: 1 },
        ],
        status: "delivered",
      },
    ],
  },
];

export const recipes = [
  {
    id: 1,
    name: "Keto Avocado Breakfast Bowl",
    description: "Perfect low-carb breakfast to start your day",
    prepTime: "10 minutes",
    cookTime: "5 minutes",
    servings: 1,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 189,
    ingredients: [
      { productId: 4, name: "Avocado", quantity: "1 piece", inPantry: false },
      {
        productId: 7,
        name: "Greek Yogurt",
        quantity: "2 tbsp",
        inPantry: true,
      },
      { name: "Eggs", quantity: "2 pieces", inPantry: false },
      { name: "Olive Oil", quantity: "1 tsp", inPantry: true },
    ],
    instructions: [
      "Cut avocado in half and remove pit",
      "Fry eggs to your liking",
      "Place eggs in avocado halves",
      "Top with Greek yogurt and seasonings",
    ],
    nutritionFacts: {
      calories: 285,
      protein: "18g",
      carbs: "6g",
      fat: "22g",
      fiber: "7g",
    },
    dietCompatible: ["Keto", "Vegetarian", "Mediterranean"],
  },
];

// Helper functions
export const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.categoryId === categoryId);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const getProductsByDiet = (dietType) => {
  return products.filter((product) =>
    product.dietCompatible.includes(dietType)
  );
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.rating >= 4.7).slice(0, 6);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
};
