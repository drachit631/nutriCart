import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { cartAPI } from "../services/api";
import { toast } from "../components/ui/use-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set()); // Track which items are being updated
  const [isBatchAdding, setIsBatchAdding] = useState(false); // Track batch operations
  const [isInitialLoading, setIsInitialLoading] = useState(false); // Track initial cart load

  // Debug cart state changes
  useEffect(() => {
    console.log("Cart state changed:", cart);
  }, [cart]);

  // Load cart from API when user is authenticated
  useEffect(() => {
    if (isInitialLoading) {
      console.log("⚠️ Cart already loading, skipping duplicate load");
      return;
    }

    console.log("🔄 Cart useEffect triggered:", {
      isAuthenticated,
      userId: user?.id,
    });
    setIsInitialLoading(true);

    if (isAuthenticated && user?.id) {
      // Check if there are local cart items to sync
      const localCart = localStorage.getItem("nutriCart_localCart");
      if (localCart) {
        const parsedLocalCart = JSON.parse(localCart);
        if (parsedLocalCart.items.length > 0) {
          // Sync local cart with backend
          syncLocalCartWithBackend(parsedLocalCart.items);
        } else {
          loadCart();
        }
      } else {
        loadCart();
      }
    } else {
      // Load local cart when user is not authenticated
      loadLocalCart();
    }

    // Reset initial loading flag after a delay
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
  }, [isAuthenticated, user?.id]);

  // Sync local cart items with backend when user logs in
  const syncLocalCartWithBackend = async (localItems) => {
    try {
      setLoading(true);

      // Add each local item to the backend cart
      for (const item of localItems) {
        await cartAPI.addItem(user.id, item.productId, item.quantity);
      }

      // Load the updated cart from backend
      await loadCart();

      // Clear local cart
      localStorage.removeItem("nutriCart_localCart");

      toast({
        title: "Cart Synced",
        description:
          "Your local cart items have been synced with your account!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error syncing local cart:", error);
      // If sync fails, still load the backend cart
      await loadCart();
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage for non-authenticated users
  const loadLocalCart = () => {
    try {
      console.log("Loading local cart...");
      const localCart = localStorage.getItem("nutriCart_localCart");
      console.log("Local cart from storage:", localCart);
      if (localCart) {
        const parsedCart = JSON.parse(localCart);
        console.log("Parsed local cart:", parsedCart);
        setCart(parsedCart);
        console.log("Cart state set to:", parsedCart);
      } else {
        console.log("No local cart found, using default empty cart");
        const defaultCart = { items: [], total: 0, count: 0 };
        setCart(defaultCart);
        console.log("Cart state set to default:", defaultCart);
      }
    } catch (error) {
      console.error("Error loading local cart:", error);
      const defaultCart = { items: [], total: 0, count: 0 };
      setCart(defaultCart);
      console.log("Cart state set to default after error:", defaultCart);
    }
  };

  // Save cart to localStorage for non-authenticated users
  const saveLocalCart = (cartData) => {
    try {
      console.log("Saving local cart:", cartData);
      localStorage.setItem("nutriCart_localCart", JSON.stringify(cartData));
      console.log("Local cart saved successfully");
    } catch (error) {
      console.error("Error saving local cart:", error);
    }
  };

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartAPI.getCart(user.id);
      setCart({
        ...cartData,
        count: cartData.items.reduce((sum, item) => sum + item.quantity, 0),
      });
    } catch (error) {
      console.error("Error loading cart:", error);
      toast({
        title: "Error",
        description: "Failed to load cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, productPrice = null) => {
    console.log(
      "CartContext: UNIFIED addToCart called with:",
      productId,
      quantity,
      productPrice
    );

    // UNIFIED LOGIC: Apply local cart update immediately for ALL users
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );
    let newCart;

    if (existingItem) {
      newCart = {
        ...cart,
        items: cart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    } else {
      const price = productPrice || 0;
      newCart = {
        ...cart,
        items: [...cart.items, { productId, quantity, price }],
      };
    }

    // Calculate totals
    newCart.count = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
    newCart.total = newCart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );

    // Update cart state immediately for instant UI feedback
    console.log("Updating cart state immediately:", newCart);
    setCart(newCart);
    saveLocalCart(newCart);

    // Show success message
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart!",
      variant: "default",
    });

    // For logged-in users, sync to backend in background (non-blocking)
    if (isAuthenticated && user?.id) {
      try {
        console.log("Background sync to backend...");
        await cartAPI.addItem(user.id, productId, quantity);
        console.log("Backend sync successful");
      } catch (error) {
        console.error("Backend sync failed (but local cart works):", error);
        // Don't show error to user since local cart already worked
      }
    }
  };

  // Batch add multiple items to cart - useful for "Order Missing Ingredients"
  const addMultipleToCart = async (items) => {
    console.log("CartContext: addMultipleToCart called with:", items);

    // Prevent multiple simultaneous batch operations
    if (isBatchAdding) {
      console.log(
        "⚠️ Batch operation already in progress, ignoring duplicate call"
      );
      throw new Error("Batch operation already in progress");
    }

    setIsBatchAdding(true);

    // Start with current cart
    let newCart = { ...cart };

    // Process each item
    for (const { productId, quantity = 1, price = 0 } of items) {
      const existingItem = newCart.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        newCart.items = newCart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart.items = [...newCart.items, { productId, quantity, price }];
      }
    }

    // Calculate totals once at the end
    newCart.count = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
    newCart.total = newCart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );

    // Update cart state immediately
    console.log("Updating cart state with multiple items:", newCart);
    setCart(newCart);
    saveLocalCart(newCart);

    try {
      // For logged-in users, sync to backend
      if (isAuthenticated && user?.id) {
        console.log("Background sync multiple items to backend...");
        for (const { productId, quantity } of items) {
          await cartAPI.addItem(user.id, productId, quantity);
        }
        console.log("Backend sync successful for all items");
      }

      return items.length; // Return count of items added
    } catch (error) {
      console.error("Backend sync failed for some items:", error);
      // Don't show error to user since local cart already worked
      return items.length; // Still return count since local cart worked
    } finally {
      setIsBatchAdding(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    console.log(
      "CartContext: UNIFIED updateQuantity called with:",
      productId,
      quantity
    );

    // UNIFIED LOGIC: Apply local cart update immediately for ALL users
    const newCart = {
      ...cart,
      items: cart.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0),
    };

    // Calculate totals
    newCart.count = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
    newCart.total = newCart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );

    // Update cart state immediately for instant UI feedback
    console.log("Updating cart state immediately:", newCart);
    setCart(newCart);
    saveLocalCart(newCart);

    // Show appropriate message
    if (quantity > 0) {
      toast({
        title: "Cart Updated",
        description: "Cart quantity has been updated successfully!",
        variant: "default",
      });
    } else {
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
        variant: "default",
      });
    }

    // For logged-in users, sync to backend in background (non-blocking)
    if (isAuthenticated && user?.id) {
      try {
        console.log("Background sync to backend...");
        if (quantity <= 0) {
          await cartAPI.removeItem(user.id, productId);
        } else {
          await cartAPI.updateQuantity(user.id, productId, quantity);
        }
        console.log("Backend sync successful");
      } catch (error) {
        console.error("Backend sync failed (but local cart works):", error);
        // Don't show error to user since local cart already worked
      }
    }
  };

  const removeFromCart = async (productId) => {
    console.log("CartContext: UNIFIED removeFromCart called with:", productId);

    // UNIFIED LOGIC: Apply local cart update immediately for ALL users
    const newCart = {
      ...cart,
      items: cart.items.filter((item) => item.productId !== productId),
    };

    // Calculate totals
    newCart.count = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
    newCart.total = newCart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );

    // Update cart state immediately for instant UI feedback
    console.log("Removing from cart immediately:", newCart);
    setCart(newCart);
    saveLocalCart(newCart);

    // Show success message
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
      variant: "default",
    });

    // For logged-in users, sync to backend in background (non-blocking)
    if (isAuthenticated && user?.id) {
      try {
        console.log("Background sync removal to backend...");
        await cartAPI.removeItem(user.id, productId);
        console.log("Backend removal sync successful");
      } catch (error) {
        console.error(
          "Backend removal sync failed (but local cart works):",
          error
        );
        // Don't show error to user since local cart already worked
      }
    }
  };

  const clearCart = async () => {
    if (isAuthenticated && user?.id) {
      // User is authenticated, clear from backend
      try {
        setLoading(true);
        await cartAPI.clearCart(user.id);
        setCart({ items: [], total: 0, count: 0 });

        toast({
          title: "Cart Cleared",
          description: "Your cart has been cleared successfully.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast({
          title: "Error",
          description: "Failed to clear cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      // User is not authenticated, clear local cart
      setCart({ items: [], total: 0, count: 0 });
      localStorage.removeItem("nutriCart_localCart");

      toast({
        title: "Cart Cleared",
        description: "Your local cart has been cleared.",
        variant: "default",
      });
    }
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cart.items.some((item) => item.productId === productId);
  };

  const isItemUpdating = (productId) => {
    return updatingItems.has(productId);
  };

  // Update product prices in local cart when products are loaded
  const updateLocalCartPrices = (products) => {
    if (
      !isAuthenticated &&
      cart.items.length > 0 &&
      products &&
      products.length > 0
    ) {
      const updatedItems = cart.items.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return {
          ...item,
          price: product ? product.price : item.price,
        };
      });

      const newCart = {
        ...cart,
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + (item.price || 0) * item.quantity,
          0
        ),
      };

      setCart(newCart);
      saveLocalCart(newCart);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    addMultipleToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    loadCart,
    isItemUpdating,
    updateLocalCartPrices,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
