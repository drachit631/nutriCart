import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
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
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        console.error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        toast({
          title: "Added to Cart",
          description: "Item has been added to your cart successfully!",
        });
        return { success: true };
      } else {
        toast({
          title: "Failed to Add",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!token) return { success: false };

    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        return { success: true };
      } else {
        toast({
          title: "Update Failed",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Update cart error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return { success: false };

    try {
      const response = await fetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        toast({
          title: "Removed from Cart",
          description: "Item has been removed from your cart",
        });
        return { success: true };
      } else {
        toast({
          title: "Remove Failed",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const clearCart = async () => {
    if (!token) return { success: false };

    try {
      const response = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        toast({
          title: "Cart Cleared",
          description: "Your cart has been cleared successfully",
        });
        return { success: true };
      } else {
        toast({
          title: "Clear Failed",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const applyCoupon = async (couponCode) => {
    if (!token) return { success: false };

    try {
      const response = await fetch("/api/cart/apply-coupon", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        toast({
          title: "Coupon Applied",
          description: "Coupon has been applied successfully!",
        });
        return { success: true };
      } else {
        toast({
          title: "Coupon Failed",
          description: data.message || "Invalid coupon code",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Apply coupon error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const removeCoupon = async () => {
    if (!token) return { success: false };

    try {
      const response = await fetch("/api/cart/remove-coupon", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        toast({
          title: "Coupon Removed",
          description: "Coupon has been removed from your cart",
        });
        return { success: true };
      } else {
        toast({
          title: "Remove Failed",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Remove coupon error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "Network error" };
    }
  };

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (!cart) return 0;
    return cart.total || 0;
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    getCartItemCount,
    getCartTotal,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
