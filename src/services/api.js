// API Services for NutriCart Application (calls backend server)
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  try {
    const token = localStorage.getItem("nutriCart_token");
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      headers,
      ...options,
    });

    if (!res.ok) {
      let message = `Request failed (${res.status})`;
      try {
        const err = await res.json();
        message = err.message || message;
      } catch (_) {
        /* ignore */
      }
      throw new Error(message);
    }

    // 204 no content
    if (res.status === 204) return null;
    return res.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to connect to server. Please check if the backend is running."
      );
    }
    throw error;
  }
}

// Authentication API
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Register new user
  register: async (userData) => {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Update user profile
  updateProfile: async (userId, profileData) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return request(`/auth/profile`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  // Get user by ID
  getUser: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return request(`/users/${userId}`);
  },
};

// Diet Plans API
export const dietPlansAPI = {
  // Get all diet plans
  getAll: async () => {
    return request("/diet-plans");
  },

  // Get diet plan by ID
  getById: async (id) => {
    return request(`/diet-plans/${id}`);
  },

  // Get diet plans by tags
  getByTags: async (tags) => {
    // optional backend route could be added; for now filter client-side
    const all = await request("/diet-plans");
    return all.filter((p) =>
      (p.suitableFor || []).some((t) => tags.includes(t))
    );
  },

  // Start a diet plan for user
  startPlan: async (userId, dietPlanId, formData) => {
    return request(`/diet-plans/${dietPlanId}/start`, {
      method: "POST",
      body: JSON.stringify({ userId, formData }),
    });
  },
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    return request("/products");
  },

  // Get product by ID
  getById: async (id) => {
    return request(`/products/${id}`);
  },

  // Get products by category
  getByCategory: async (category) => {
    const all = await request("/products");
    return all.filter((p) => p.category === category);
  },

  // Get products by diet
  getByDiet: async (diet) => {
    const all = await request("/products");
    return all.filter((p) => (p.dietCompatible || []).includes(diet));
  },

  // Search products
  search: async (query) => {
    const all = await request("/products");
    return all.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Get product categories
  getCategories: async () => {
    return request("/categories");
  },
};

// Cart API
export const cartAPI = {
  // Get user cart
  getCart: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return request(`/users/${userId}/cart`);
  },

  // Add item to cart
  addItem: async (userId, productId, quantity = 1) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!productId) {
      throw new Error("Product ID is required");
    }
    return request(`/users/${userId}/cart/items`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  },

  // Update item quantity
  updateQuantity: async (userId, productId, quantity) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!productId) {
      throw new Error("Product ID is required");
    }
    return request(`/users/${userId}/cart/items/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  },

  // Remove item from cart
  removeItem: async (userId, productId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!productId) {
      throw new Error("Product ID is required");
    }
    await request(`/users/${userId}/cart/items/${productId}`, {
      method: "DELETE",
    });
    return request(`/users/${userId}/cart`);
  },

  // Clear cart
  clearCart: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    await request(`/users/${userId}/cart`, { method: "DELETE" });
    return { items: [], total: 0 };
  },
};

// Orders API
export const ordersAPI = {
  // Create order from cart
  createOrder: async (userId, orderData) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return request(`/users/${userId}/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  // Get user orders
  getUserOrders: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return request(`/users/${userId}/orders`);
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    // Optional: implement endpoint in backend if needed
    throw new Error("Not implemented");
  },
};

// Recipes API
export const recipesAPI = {
  // Get all recipes
  getAll: async () => {
    return request("/recipes");
  },

  // Get recipe by ID
  getById: async (id) => {
    return request(`/recipes/${id}`);
  },

  // Get recipes by diet
  getByDiet: async (diet) => {
    const all = await request("/recipes");
    return all.filter((recipe) => (recipe.dietCompatible || []).includes(diet));
  },

  // Get recipes by ingredients (pantry sync)
  getByIngredients: async (ingredients) => {
    const all = await request("/recipes");
    return all.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ing) =>
        ing.name.toLowerCase()
      );
      const userIngredients = ingredients.map((ing) => ing.toLowerCase());
      return recipeIngredients.some((recipeIng) =>
        userIngredients.some(
          (userIng) =>
            userIng.includes(recipeIng) || recipeIng.includes(userIng)
        )
      );
    });
  },
};

// Partnerships API
export const partnershipsAPI = {
  // Get all partnerships
  getAll: async () => {
    return request("/partnerships");
  },

  // Get partnership by ID
  getById: async (id) => {
    return request(`/partnerships/${id}`);
  },
};

// User Progress API
export const progressAPI = {
  // Get user progress
  getUserProgress: async (userId) => {
    throw new Error("Not implemented");
  },

  // Update user progress
  updateProgress: async (userId, progressData) => {
    throw new Error("Not implemented");
  },
};

// Dashboard API
export const dashboardAPI = {
  // Get dashboard data
  getDashboardData: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const user = await authAPI.getUser(userId);
    const cart = await cartAPI.getCart(userId);
    const orders = await ordersAPI.getUserOrders(userId);
    return { user, cart, recentOrders: orders.slice(0, 3) };
  },
};

// Export all APIs
export default {
  auth: authAPI,
  dietPlans: dietPlansAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  recipes: recipesAPI,
  partnerships: partnershipsAPI,
  progress: progressAPI,
  dashboard: dashboardAPI,
};
