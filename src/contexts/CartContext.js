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

  // Debug cart state changes
  useEffect(() => {
    console.log("Cart state changed:", cart);
  }, [cart]);

  // Load cart from API when user is authenticated
  useEffect(() => {
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

  const addToCart = async (productId, quantity = 1) => {
    console.log("CartContext: addToCart called with:", productId, quantity);
    console.log("User authenticated:", isAuthenticated, "User ID:", user?.id);

    if (isAuthenticated && user?.id) {
      // User is authenticated, add to backend
      try {
        console.log("Adding to backend cart...");
        setUpdatingItems((prev) => new Set(prev).add(productId));

        const cartData = await cartAPI.addItem(user.id, productId, quantity);
        console.log("Backend cart response:", cartData);

        setCart({
          ...cartData,
          count: cartData.items.reduce((sum, item) => sum + item.quantity, 0),
        });

        toast({
          title: "Added to Cart",
          description: "Item has been added to your cart successfully!",
          variant: "default",
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    } else {
      // User is not authenticated, add to local cart
      console.log("Adding to local cart...");
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
        newCart = {
          ...cart,
          items: [...cart.items, { productId, quantity, price: 0 }], // Price will be loaded later
        };
      }

      newCart.count = newCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      newCart.total = newCart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      console.log("New local cart:", newCart);
      setCart(newCart);
      console.log("Cart state updated, new cart:", newCart);
      saveLocalCart(newCart);

      // Force a re-render by updating the cart state again
      setTimeout(() => {
        console.log("Forcing cart state update...");
        setCart((prevCart) => {
          console.log("Previous cart state:", prevCart);
          // Create a completely new object to ensure React detects the change
          const updatedCart = {
            items: [...prevCart.items],
            total: prevCart.total,
            count: prevCart.count,
          };
          console.log("Updated cart state:", updatedCart);
          return updatedCart;
        });
      }, 50);

      toast({
        title: "Added to Cart",
        description: "Item has been added to your local cart!",
        variant: "default",
      });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated && user?.id) {
      // User is authenticated, update in backend
      try {
        setUpdatingItems((prev) => new Set(prev).add(productId));

        const cartData = await cartAPI.updateQuantity(
          user.id,
          productId,
          quantity
        );

        setCart({
          ...cartData,
          count: cartData.items.reduce((sum, item) => sum + item.quantity, 0),
        });

        if (quantity > 0) {
          toast({
            title: "Cart Updated",
            description: "Cart quantity has been updated successfully!",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to update cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    } else {
      // User is not authenticated, update local cart
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

      newCart.count = newCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      newCart.total = newCart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCart(newCart);
      saveLocalCart(newCart);
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated && user?.id) {
      // User is authenticated, remove from backend
      try {
        setUpdatingItems((prev) => new Set(prev).add(productId));

        const cartData = await cartAPI.removeItem(user.id, productId);

        setCart({
          ...cartData,
          count: cartData.items.reduce((sum, item) => sum + item.quantity, 0),
        });

        toast({
          title: "Removed from Cart",
          description: "Item has been removed from your cart.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast({
          title: "Error",
          description:
            error.message ||
            "Failed to remove item from cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    } else {
      // User is not authenticated, remove from local cart
      const newCart = {
        ...cart,
        items: cart.items.filter((item) => item.productId !== productId),
      };

      newCart.count = newCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      newCart.total = newCart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCart(newCart);
      saveLocalCart(newCart);
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

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    loadCart,
    isItemUpdating,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
