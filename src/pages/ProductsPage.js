import React from "react";

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">
          Browse our selection of healthy groceries and supplements
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>All Categories</option>
            <option>Proteins</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Grains</option>
            <option>Supplements</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Product {i + 1}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              Healthy product description
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">$9.99</span>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
