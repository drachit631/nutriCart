import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

export function StatsSection() {
  const stats = [
    {
      icon: "👥",
      value: "10,000+",
      label: "Active Users",
      description: "People transforming their health",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: "🥗",
      value: "500+",
      label: "Healthy Products",
      description: "Curated nutrition items",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: "📊",
      value: "95%",
      label: "Success Rate",
      description: "Users achieving their goals",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: "⭐",
      value: "4.9",
      label: "User Rating",
      description: "Based on 2,000+ reviews",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-4 text-sm">
            🎯 Trusted by Thousands
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
            Numbers That Speak
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              For Themselves
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted font-body">
            Join thousands of users who have already transformed their health
            journey with NutriCart. Our platform delivers real results backed by
            data and user success stories.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </div>

                {/* Value */}
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Real-time data updated every hour
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialStats() {
  const testimonials = [
    {
      quote:
        "NutriCart+ completely transformed my relationship with food. I've lost 20 pounds and feel amazing!",
      author: "Sarah Johnson",
      role: "Fitness Enthusiast",
      avatar: "👩‍💼",
      rating: 5,
    },
    {
      quote:
        "The smart recommendations are spot-on. I've discovered so many healthy products I never knew existed.",
      author: "Michael Chen",
      role: "Health Coach",
      avatar: "👨‍⚕️",
      rating: 5,
    },
    {
      quote:
        "Finally, a platform that makes healthy eating simple and enjoyable. Highly recommended!",
      author: "Emma Rodriguez",
      role: "Busy Professional",
      avatar: "👩‍💻",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 font-heading">
            What Our Users Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted font-body">
            Don't just take our word for it. Here's what real users are saying
            about their experience with NutriCart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic mb-6 text-center">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
