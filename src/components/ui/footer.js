import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Badge } from "./badge";
import { toast } from "./use-toast";

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const footerLinks = {
    product: [
      {
        name: "Products",
        href: "/products",
        action: () => navigate("/products"),
      },
      {
        name: "Diet Plans",
        href: "/diet-plans",
        action: () => navigate("/diet-plans"),
      },
      { name: "Pricing", href: "/pricing", action: () => navigate("/pricing") },
    ],
    company: [
      { name: "About", href: "/about", action: () => navigate("/about") },
      { name: "Contact", href: "/contact", action: () => navigate("/contact") },
    ],
    support: [
      { name: "Help Center", href: "/help", action: () => navigate("/help") },
      { name: "FAQ", href: "/faq", action: () => navigate("/faq") },
    ],
    legal: [
      {
        name: "Privacy Policy",
        href: "/privacy",
        action: () => navigate("/privacy"),
      },
      {
        name: "Terms of Service",
        href: "/terms",
        action: () => navigate("/terms"),
      },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Instagram", href: "#", icon: "📷" },
    { name: "LinkedIn", href: "#", icon: "💼" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold font-heading">NutriCart</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-body">
              Your nutrition concierge. Transform your health journey with
              personalized meal plans, curated products, and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Stay updated with nutrition tips
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest health insights and exclusive offers delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button
                variant="gradient"
                size="sm"
                onClick={() => {
                  if (email.trim()) {
                    toast({
                      title: "Subscribed!",
                      description:
                        "Thank you for subscribing to our newsletter.",
                      variant: "default",
                    });
                    setEmail("");
                  } else {
                    toast({
                      title: "Please enter an email",
                      description: "Email address is required.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 NutriCart. All rights reserved.
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="text-gray-400 border-gray-700"
              >
                Made with ❤️ for your health
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
