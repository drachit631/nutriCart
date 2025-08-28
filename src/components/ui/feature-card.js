import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

export function FeatureCard({ icon, title, description, className }) {
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100 group-hover:from-green-200 group-hover:to-blue-200 transition-colors duration-300">
          <div className="text-2xl">{icon}</div>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 font-heading">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-muted leading-relaxed font-body">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function FeaturesGrid() {
  const features = [
    {
      icon: "🧠",
      title: "Smart Recommendations",
      description:
        "Get personalized nutrition advice and meal suggestions based on your goals, preferences, and dietary restrictions.",
    },
    {
      icon: "🥗",
      title: "Smart Meal Planning",
      description:
        "Create balanced, nutritious meal plans that fit your lifestyle and help you achieve your health objectives.",
    },
    {
      icon: "🛒",
      title: "Curated Product Selection",
      description:
        "Discover high-quality, healthy products carefully selected by our nutrition experts and smart algorithms.",
    },
    {
      icon: "📱",
      title: "Progress Tracking",
      description:
        "Monitor your nutrition journey with detailed analytics, progress reports, and milestone celebrations.",
    },
    {
      icon: "👥",
      title: "Community Support",
      description:
        "Connect with like-minded individuals, share experiences, and get motivation from our supportive community.",
    },
    {
      icon: "🎯",
      title: "Goal Achievement",
      description:
        "Set realistic health goals and track your progress with our comprehensive goal management system.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
