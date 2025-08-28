import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export function LocalPartnerships() {
  const navigate = useNavigate();

  const partnerships = [
    {
      name: "Fresh Valley Farms",
      type: "Organic Vegetables",
      location: "Pune, Maharashtra",
      savings: "30% off",
      products: [
        "Fresh tomatoes",
        "Organic spinach",
        "Bell peppers",
        "Carrots",
      ],
      image: "🌾",
      rating: 4.8,
      delivery: "Same day",
      certification: "Organic Certified",
    },
    {
      name: "Mountain Dairy Co.",
      type: "Fresh Dairy",
      location: "Nashik, Maharashtra",
      savings: "25% off",
      products: ["Fresh milk", "Curd", "Paneer", "Ghee"],
      image: "🥛",
      rating: 4.9,
      delivery: "Next day",
      certification: "FSSAI Approved",
    },
    {
      name: "Coastal Fish Market",
      type: "Fresh Seafood",
      location: "Mumbai, Maharashtra",
      savings: "40% off",
      products: ["Fresh fish", "Prawns", "Crab", "Mussels"],
      image: "🐟",
      rating: 4.7,
      delivery: "Same day",
      certification: "Fresh Catch",
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Lower Prices",
      description:
        "Direct from farmers means 20-40% savings compared to supermarkets",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🌱",
      title: "Fresher Produce",
      description:
        "Harvested same day and delivered to your doorstep within hours",
      color: "from-primary to-secondary",
    },
    {
      icon: "🏆",
      title: "Quality Assured",
      description:
        "All partners are verified and certified for quality and safety",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🌍",
      title: "Support Local",
      description:
        "Help local farmers while getting the best quality ingredients",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="success" className="mb-4 text-sm">
            🌾 Local Farmer Partnerships
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6 font-heading">
            Fresh from Local Farms
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              to Your Table
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-body">
            Partnering with local farmers and organic shops to provide fresh
            produce at lower prices than supermarkets. Support local agriculture
            while saving money on healthy ingredients.
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerships.map((partner, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{partner.image}</span>
                </div>

                <div className="flex items-center justify-center mb-2">
                  <Badge variant="success" className="text-xs">
                    {partner.savings}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-foreground font-heading">
                  {partner.name}
                </CardTitle>
                <CardDescription className="text-muted text-sm">
                  {partner.type} • {partner.location}
                </CardDescription>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(partner.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-muted ml-1">
                    ({partner.rating})
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Products */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 font-heading text-sm">
                    Popular Products
                  </h4>
                  <div className="space-y-1">
                    {partner.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-muted"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {product}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      🚚 {partner.delivery}
                    </Badge>
                  </div>
                  <div className="text-success font-medium">
                    {partner.certification}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => navigate("/products")}
                >
                  Shop from {partner.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
              🌟 Why Choose Local Partnerships?
            </h3>
            <p className="text-muted max-w-2xl mx-auto font-body">
              Our direct partnerships with local farmers and producers benefit
              both you and the local economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.color} text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2 font-heading">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted font-body">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Partnership Stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted font-body">
                  Local Partners
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">
                  ₹2,000
                </div>
                <div className="text-sm text-muted font-body">
                  Avg. Monthly Savings
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-1">
                  24hrs
                </div>
                <div className="text-sm text-muted font-body">
                  Freshness Guarantee
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">95%</div>
                <div className="text-sm text-muted font-body">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white">
            <h3 className="text-2xl font-bold mb-4 font-heading">
              Ready to Support Local & Save Money?
            </h3>
            <p className="text-primary-foreground mb-8 max-w-2xl mx-auto font-body">
              Join thousands of customers who are already enjoying fresh, local
              produce at supermarket prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/products")}
              >
                Start Shopping Local
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/dashboard")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
