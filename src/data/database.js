// Comprehensive Database for NutriCart Application

export const database = {
  // Users table
  users: [
    {
      id: "1",
      firstName: "Demo",
      lastName: "User",
      email: "demo@nutricart.com",
      password: "demo123", // In real app, this would be hashed
      profileComplete: true,
      createdAt: "2024-01-15T10:00:00Z",
      lastLogin: "2024-01-20T15:30:00Z",
      subscription: "premium",
      preferences: {
        dietaryRestrictions: ["Lactose Intolerant"],
        allergies: ["Peanuts"],
        budget: 8000,
        healthGoals: ["Weight Loss", "Muscle Gain"],
        preferredDiets: ["Keto", "Mediterranean"]
      }
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
      password: "password123",
      profileComplete: true,
      createdAt: "2024-01-10T09:00:00Z",
      lastLogin: "2024-01-19T14:20:00Z",
      subscription: "free",
      preferences: {
        dietaryRestrictions: ["Vegetarian"],
        allergies: [],
        budget: 5000,
        healthGoals: ["Heart Health"],
        preferredDiets: ["Mediterranean", "DASH"]
      }
    }
  ],

  // Diet Plans table
  dietPlans: [
    {
      id: "keto",
      name: "Keto",
      description: "High-fat, low-carb diet for weight loss and energy",
      benefits: ["Rapid weight loss", "Increased energy", "Mental clarity", "Stable blood sugar"],
      difficulty: "Medium",
      duration: "2-4 weeks",
      color: "from-purple-500 to-pink-500",
      icon: "🥑",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Avocado & Eggs", "Salmon with Greens", "Keto Smoothie"],
      restrictions: ["Low carb", "High fat", "Moderate protein"],
      suitableFor: ["Weight loss", "Diabetes management", "Energy boost"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Keto Breakfast Bowl", type: "breakfast", calories: 450 },
            { name: "Grilled Chicken Salad", type: "lunch", calories: 380 },
            { name: "Salmon with Asparagus", type: "dinner", calories: 520 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Bacon & Eggs", type: "breakfast", calories: 420 },
            { name: "Tuna Avocado Bowl", type: "lunch", calories: 410 },
            { name: "Beef Stir Fry", type: "dinner", calories: 480 }
          ]
        }
      ],
      groceryList: ["Avocados", "Salmon", "Chicken breast", "Eggs", "Coconut oil", "Almonds"],
      nutritionInfo: {
        calories: "1800-2200",
        protein: "120-150g",
        fat: "140-180g",
        carbs: "20-50g"
      }
    },
    {
      id: "mediterranean",
      name: "Mediterranean",
      description: "Heart-healthy diet rich in fruits, vegetables, and olive oil",
      benefits: ["Heart health", "Longevity", "Brain function", "Reduced inflammation"],
      difficulty: "Easy",
      duration: "Lifestyle",
      color: "from-blue-500 to-cyan-500",
      icon: "🫒",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Greek Salad", "Grilled Fish", "Olive Oil Pasta"],
      restrictions: ["Limited red meat", "Moderate dairy", "Whole grains preferred"],
      suitableFor: ["Heart health", "Long-term wellness", "Family-friendly"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Greek Yogurt with Berries", type: "breakfast", calories: 320 },
            { name: "Mediterranean Quinoa Bowl", type: "lunch", calories: 450 },
            { name: "Grilled Salmon with Vegetables", type: "dinner", calories: 580 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Oatmeal with Nuts", type: "breakfast", calories: 380 },
            { name: "Chickpea Salad", type: "lunch", calories: 420 },
            { name: "Chicken with Olive Oil", type: "dinner", calories: 520 }
          ]
        }
      ],
      groceryList: ["Olive oil", "Fish", "Quinoa", "Chickpeas", "Fresh vegetables", "Nuts"],
      nutritionInfo: {
        calories: "2000-2500",
        protein: "100-130g",
        fat: "60-80g",
        carbs: "200-250g"
      }
    },
    {
      id: "vegan",
      name: "Vegan",
      description: "Plant-based nutrition for ethical and health benefits",
      benefits: ["Lower cholesterol", "Weight management", "Ethical choice", "Environmental impact"],
      difficulty: "Medium",
      duration: "Lifestyle",
      color: "from-green-500 to-emerald-500",
      icon: "🌱",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Quinoa Bowl", "Lentil Curry", "Vegan Smoothie"],
      restrictions: ["No animal products", "Plant-based only", "B12 supplementation needed"],
      suitableFor: ["Ethical eating", "Weight management", "Heart health"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Vegan Smoothie Bowl", type: "breakfast", calories: 350 },
            { name: "Lentil Soup", type: "lunch", calories: 380 },
            { name: "Tofu Stir Fry", type: "dinner", calories: 420 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Overnight Oats", type: "breakfast", calories: 320 },
            { name: "Chickpea Wrap", type: "lunch", calories: 410 },
            { name: "Vegan Buddha Bowl", type: "dinner", calories: 480 }
          ]
        }
      ],
      groceryList: ["Quinoa", "Lentils", "Tofu", "Chickpeas", "Fresh vegetables", "Nutritional yeast"],
      nutritionInfo: {
        calories: "1800-2200",
        protein: "80-120g",
        fat: "50-70g",
        carbs: "250-300g"
      }
    },
    {
      id: "dash",
      name: "DASH",
      description: "Dietary approach to stop hypertension",
      benefits: ["Blood pressure control", "Heart health", "Nutrient-rich", "Sodium reduction"],
      difficulty: "Easy",
      duration: "Lifestyle",
      color: "from-red-500 to-orange-500",
      icon: "❤️",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Lean Chicken", "Brown Rice", "Fresh Vegetables"],
      restrictions: ["Low sodium", "Limited processed foods", "Moderate portions"],
      suitableFor: ["Hypertension", "Heart health", "General wellness"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Oatmeal with Banana", type: "breakfast", calories: 280 },
            { name: "Grilled Chicken Breast", type: "lunch", calories: 350 },
            { name: "Salmon with Brown Rice", type: "dinner", calories: 520 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Greek Yogurt Parfait", type: "breakfast", calories: 320 },
            { name: "Turkey Sandwich", type: "lunch", calories: 380 },
            { name: "Lean Beef with Vegetables", type: "dinner", calories: 450 }
          ]
        }
      ],
      groceryList: ["Lean meats", "Brown rice", "Fresh vegetables", "Low-fat dairy", "Nuts", "Whole grains"],
      nutritionInfo: {
        calories: "2000-2500",
        protein: "100-130g",
        fat: "50-70g",
        carbs: "200-250g"
      }
    },
    {
      id: "intermittent",
      name: "Intermittent Fasting",
      description: "Time-restricted eating for metabolic health",
      benefits: ["Fat burning", "Insulin sensitivity", "Cellular repair", "Mental clarity"],
      difficulty: "Hard",
      duration: "Lifestyle",
      color: "from-yellow-500 to-orange-500",
      icon: "⏰",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Protein-rich breakfast", "Balanced lunch", "Light dinner"],
      restrictions: ["Time-restricted eating", "Calorie control", "Hydration focus"],
      suitableFor: ["Weight loss", "Metabolic health", "Mental performance"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Protein Smoothie", type: "breakfast", calories: 280 },
            { name: "Chicken Quinoa Bowl", type: "lunch", calories: 450 },
            { name: "Light Fish Dinner", type: "dinner", calories: 320 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Egg White Omelette", type: "breakfast", calories: 250 },
            { name: "Turkey Avocado Wrap", type: "lunch", calories: 420 },
            { name: "Vegetable Soup", type: "dinner", calories: 280 }
          ]
        }
      ],
      groceryList: ["Protein powder", "Lean meats", "Quinoa", "Fresh vegetables", "Healthy fats", "Herbs"],
      nutritionInfo: {
        calories: "1600-2000",
        protein: "120-150g",
        fat: "60-80g",
        carbs: "150-200g"
      }
    },
    {
      id: "paleo",
      name: "Paleo",
      description: "Ancient human diet focusing on whole foods",
      benefits: ["Natural eating", "Reduced inflammation", "Stable energy", "Nutrient density"],
      difficulty: "Medium",
      duration: "Lifestyle",
      color: "from-amber-500 to-orange-500",
      icon: "🥩",
      price: 0,
      features: ["Meal plans", "Grocery lists", "Progress tracking", "Community support"],
      sampleMeals: ["Grilled Meat", "Root Vegetables", "Fresh Fruits"],
      restrictions: ["No grains", "No dairy", "No processed foods"],
      suitableFor: ["Natural eating", "Inflammation reduction", "Energy optimization"],
      weeklyMeals: [
        {
          day: "Monday",
          meals: [
            { name: "Bacon & Eggs", type: "breakfast", calories: 380 },
            { name: "Grilled Chicken Salad", type: "lunch", calories: 420 },
            { name: "Beef with Sweet Potato", type: "dinner", calories: 580 }
          ]
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Sausage & Vegetables", type: "breakfast", calories: 350 },
            { name: "Tuna Avocado Bowl", type: "lunch", calories: 450 },
            { name: "Lamb with Root Vegetables", type: "dinner", calories: 520 }
          ]
        }
      ],
      groceryList: ["Grass-fed meats", "Root vegetables", "Fresh fruits", "Nuts", "Coconut oil", "Herbs"],
      nutritionInfo: {
        calories: "2000-2500",
        protein: "120-150g",
        fat: "80-120g",
        carbs: "100-150g"
      }
    }
  ],

  // Products table
  products: [
    {
      id: "1",
      name: "Organic Quinoa",
      description: "Premium organic quinoa rich in protein and fiber",
      price: 299,
      originalPrice: 399,
      category: "Grains",
      dietCompatible: ["vegan", "vegetarian", "gluten-free", "keto", "paleo"],
      image: "🌾",
      inStock: true,
      stockQuantity: 50,
      unit: "500g",
      nutrition: {
        calories: 120,
        protein: "4.4g",
        fat: "1.9g",
        carbs: "21.3g",
        fiber: "2.8g"
      },
      benefits: ["High protein", "Gluten-free", "Rich in minerals"],
      supplier: "Fresh Valley Farms",
      rating: 4.8,
      reviews: 124,
      tags: ["Organic", "Premium", "Local"]
    },
    {
      id: "2",
      name: "Fresh Salmon Fillet",
      description: "Wild-caught Atlantic salmon, rich in omega-3 fatty acids",
      price: 899,
      originalPrice: 1199,
      category: "Seafood",
      dietCompatible: ["keto", "paleo", "mediterranean", "dash"],
      image: "🐟",
      inStock: true,
      stockQuantity: 25,
      unit: "300g",
      nutrition: {
        calories: 208,
        protein: "25g",
        fat: "12g",
        carbs: "0g",
        fiber: "0g"
      },
      benefits: ["High protein", "Omega-3 rich", "Heart healthy"],
      supplier: "Coastal Fish Market",
      rating: 4.9,
      reviews: 89,
      tags: ["Wild-caught", "Fresh", "Premium"]
    },
    {
      id: "3",
      name: "Organic Avocados",
      description: "Fresh organic avocados, perfect for healthy fats",
      price: 199,
      originalPrice: 249,
      category: "Fruits",
      dietCompatible: ["vegan", "vegetarian", "keto", "paleo", "mediterranean"],
      image: "🥑",
      inStock: true,
      stockQuantity: 100,
      unit: "4 pieces",
      nutrition: {
        calories: 160,
        protein: "2g",
        fat: "15g",
        carbs: "9g",
        fiber: "7g"
      },
      benefits: ["Healthy fats", "Fiber rich", "Nutrient dense"],
      supplier: "Fresh Valley Farms",
      rating: 4.7,
      reviews: 156,
      tags: ["Organic", "Fresh", "Local"]
    },
    {
      id: "4",
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt high in protein and probiotics",
      price: 149,
      originalPrice: 199,
      category: "Dairy",
      dietCompatible: ["vegetarian", "mediterranean", "dash"],
      image: "🥛",
      inStock: true,
      stockQuantity: 75,
      unit: "500g",
      nutrition: {
        calories: 130,
        protein: "23g",
        fat: "0.5g",
        carbs: "9g",
        fiber: "0g"
      },
      benefits: ["High protein", "Probiotics", "Low fat"],
      supplier: "Mountain Dairy Co.",
      rating: 4.6,
      reviews: 203,
      tags: ["Fresh", "Local", "Premium"]
    },
    {
      id: "5",
      name: "Almonds",
      description: "Premium raw almonds, excellent source of healthy fats",
      price: 399,
      originalPrice: 499,
      category: "Nuts",
      dietCompatible: ["vegan", "vegetarian", "keto", "paleo", "mediterranean", "dash"],
      image: "🥜",
      inStock: true,
      stockQuantity: 60,
      unit: "500g",
      nutrition: {
        calories: 164,
        protein: "6g",
        fat: "14g",
        carbs: "6g",
        fiber: "3.5g"
      },
      benefits: ["Healthy fats", "Protein rich", "Heart healthy"],
      supplier: "Fresh Valley Farms",
      rating: 4.8,
      reviews: 178,
      tags: ["Raw", "Premium", "Local"]
    },
    {
      id: "6",
      name: "Sweet Potatoes",
      description: "Fresh organic sweet potatoes, rich in vitamins and fiber",
      price: 99,
      originalPrice: 129,
      category: "Vegetables",
      dietCompatible: ["vegan", "vegetarian", "mediterranean", "dash"],
      image: "🍠",
      inStock: true,
      stockQuantity: 80,
      unit: "1kg",
      nutrition: {
        calories: 86,
        protein: "1.6g",
        fat: "0.1g",
        carbs: "20g",
        fiber: "3g"
      },
      benefits: ["Vitamin rich", "Fiber dense", "Low fat"],
      supplier: "Fresh Valley Farms",
      rating: 4.5,
      reviews: 92,
      tags: ["Organic", "Fresh", "Local"]
    }
  ],

  // Categories table
  categories: [
    { id: "grains", name: "Grains", icon: "🌾", description: "Whole grains and cereals" },
    { id: "seafood", name: "Seafood", icon: "🐟", description: "Fresh fish and seafood" },
    { id: "fruits", name: "Fruits", icon: "🍎", description: "Fresh fruits and berries" },
    { id: "dairy", name: "Dairy", icon: "🥛", description: "Dairy products and alternatives" },
    { id: "nuts", name: "Nuts", icon: "🥜", description: "Nuts, seeds, and dried fruits" },
    { id: "vegetables", name: "Vegetables", icon: "🥬", description: "Fresh vegetables and greens" },
    { id: "meat", name: "Meat", icon: "🥩", description: "Fresh meat and poultry" },
    { id: "oils", name: "Oils", icon: "🫒", description: "Cooking oils and fats" }
  ],

  // Recipes table
  recipes: [
    {
      id: "1",
      name: "Quinoa Buddha Bowl",
      description: "A nutritious and colorful bowl packed with protein and vegetables",
      difficulty: "Easy",
      time: "25 min",
      servings: 2,
      calories: 420,
      image: "🥗",
      tags: ["Vegan", "High Protein", "Budget Friendly"],
      ingredients: [
        { name: "Quinoa", quantity: "1 cup", inPantry: true, productId: "1" },
        { name: "Sweet potato", quantity: "1 medium", inPantry: false, productId: "6" },
        { name: "Chickpeas", quantity: "1 can", inPantry: false, productId: null },
        { name: "Kale", quantity: "2 cups", inPantry: false, productId: null },
        { name: "Avocado", quantity: "1", inPantry: false, productId: "3" }
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Roast sweet potato cubes until tender",
        "Assemble bowl with quinoa, vegetables, and avocado",
        "Drizzle with olive oil and season to taste"
      ],
      nutrition: {
        calories: 420,
        protein: "18g",
        fat: "22g",
        carbs: "45g",
        fiber: "12g"
      },
      dietCompatible: ["vegan", "vegetarian", "gluten-free"],
      author: "NutriCart Team",
      rating: 4.8,
      reviews: 45
    },
    {
      id: "2",
      name: "Mediterranean Salmon",
      description: "Fresh salmon with Mediterranean herbs and vegetables",
      difficulty: "Medium",
      time: "35 min",
      servings: 2,
      calories: 580,
      image: "🐟",
      tags: ["High Protein", "Omega-3", "Premium"],
      ingredients: [
        { name: "Salmon fillet", quantity: "2 pieces", inPantry: false, productId: "2" },
        { name: "Olive oil", quantity: "2 tbsp", inPantry: true, productId: null },
        { name: "Lemon", quantity: "1", inPantry: false, productId: null },
        { name: "Herbs", quantity: "1 bunch", inPantry: false, productId: null },
        { name: "Quinoa", quantity: "1 cup", inPantry: true, productId: "1" }
      ],
      instructions: [
        "Season salmon with herbs and lemon",
        "Pan-sear salmon until golden",
        "Cook quinoa as side dish",
        "Serve with fresh vegetables"
      ],
      nutrition: {
        calories: 580,
        protein: "45g",
        fat: "28g",
        carbs: "35g",
        fiber: "6g"
      },
      dietCompatible: ["keto", "paleo", "mediterranean", "dash"],
      author: "NutriCart Team",
      rating: 4.9,
      reviews: 67
    }
  ],

  // Orders table
  orders: [
    {
      id: "1",
      userId: "1",
      items: [
        { productId: "1", quantity: 2, price: 299 },
        { productId: "3", quantity: 1, price: 199 }
      ],
      total: 797,
      status: "delivered",
      orderDate: "2024-01-18T10:00:00Z",
      deliveryDate: "2024-01-19T14:00:00Z",
      shippingAddress: "123 Main St, City, State 12345",
      paymentMethod: "credit_card"
    }
  ],

  // Cart table (for active carts)
  carts: [
    {
      id: "1",
      userId: "1",
      items: [
        { productId: "2", quantity: 1, price: 899 },
        { productId: "5", quantity: 1, price: 399 }
      ],
      total: 1298,
      updatedAt: "2024-01-20T16:00:00Z"
    }
  ],

  // Subscriptions table
  subscriptions: [
    {
      id: "1",
      userId: "1",
      plan: "premium",
      status: "active",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      price: 39,
      billingCycle: "monthly",
      features: ["Unlimited meal plans", "1-on-1 consultation", "Priority support"]
    }
  ],

  // User Progress table
  userProgress: [
    {
      id: "1",
      userId: "1",
      dietPlanId: "keto",
      startDate: "2024-01-15T00:00:00Z",
      currentWeight: 75,
      targetWeight: 70,
      measurements: {
        waist: 32,
        chest: 42,
        arms: 14
      },
      progressPhotos: [],
      notes: "Feeling great on keto, energy levels are high"
    }
  ],

  // Local Partnerships table
  partnerships: [
    {
      id: "1",
      name: "Fresh Valley Farms",
      type: "Organic Vegetables",
      location: "Pune, Maharashtra",
      savings: "30% off",
      products: ["Fresh tomatoes", "Organic spinach", "Bell peppers", "Carrots"],
      image: "🌾",
      rating: 4.8,
      delivery: "Same day",
      certification: "Organic Certified",
      contact: "+91-98765-43210",
      website: "www.freshvalleyfarms.com"
    },
    {
      id: "2",
      name: "Mountain Dairy Co.",
      type: "Fresh Dairy",
      location: "Nashik, Maharashtra",
      savings: "25% off",
      products: ["Fresh milk", "Curd", "Paneer", "Ghee"],
      image: "🥛",
      rating: 4.9,
      delivery: "Next day",
      certification: "FSSAI Approved",
      contact: "+91-98765-43211",
      website: "www.mountaindairy.com"
    },
    {
      id: "3",
      name: "Coastal Fish Market",
      type: "Fresh Seafood",
      location: "Mumbai, Maharashtra",
      savings: "40% off",
      products: ["Fresh fish", "Prawns", "Crab", "Mussels"],
      image: "🐟",
      rating: 4.7,
      delivery: "Same day",
      certification: "Fresh Catch",
      contact: "+91-98765-43212",
      website: "www.coastalfish.com"
    }
  ]
};

// Helper functions for database operations
export const dbHelpers = {
  // User operations
  findUserByEmail: (email) => database.users.find(user => user.email === email),
  findUserById: (id) => database.users.find(user => user.id === id),
  createUser: (userData) => {
    const newUser = {
      id: (database.users.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profileComplete: false
    };
    database.users.push(newUser);
    return newUser;
  },
  updateUser: (id, updates) => {
    const userIndex = database.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      database.users[userIndex] = { ...database.users[userIndex], ...updates };
      return database.users[userIndex];
    }
    return null;
  },

  // Diet plan operations
  getAllDietPlans: () => database.dietPlans,
  getDietPlanById: (id) => database.dietPlans.find(plan => plan.id === id),
  getDietPlansByTags: (tags) => database.dietPlans.filter(plan => 
    tags.some(tag => plan.suitableFor.includes(tag))
  ),

  // Product operations
  getAllProducts: () => database.products,
  getProductById: (id) => database.products.find(product => product.id === id),
  getProductsByCategory: (category) => database.products.filter(product => product.category === category),
  getProductsByDiet: (diet) => database.products.filter(product => product.dietCompatible.includes(diet)),
  searchProducts: (query) => database.products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  ),

  // Recipe operations
  getAllRecipes: () => database.recipes,
  getRecipeById: (id) => database.recipes.find(recipe => recipe.id === id),
  getRecipesByDiet: (diet) => database.recipes.filter(recipe => recipe.dietCompatible.includes(diet)),

  // Cart operations
  getUserCart: (userId) => database.carts.find(cart => cart.userId === userId),
  updateCart: (userId, items) => {
    const cartIndex = database.carts.findIndex(cart => cart.userId === userId);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartIndex !== -1) {
      database.carts[cartIndex] = {
        ...database.carts[cartIndex],
        items,
        total,
        updatedAt: new Date().toISOString()
      };
    } else {
      database.carts.push({
        id: (database.carts.length + 1).toString(),
        userId,
        items,
        total,
        updatedAt: new Date().toISOString()
      });
    }
  },

  // Order operations
  createOrder: (orderData) => {
    const newOrder = {
      id: (database.orders.length + 1).toString(),
      ...orderData,
      orderDate: new Date().toISOString()
    };
    database.orders.push(newOrder);
    return newOrder;
  },
  getUserOrders: (userId) => database.orders.filter(order => order.userId === userId),

  // Partnership operations
  getAllPartnerships: () => database.partnerships,
  getPartnershipById: (id) => database.partnerships.find(partnership => partnership.id === id)
};

export default database;
