import React from "react";

const CommunityPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <p className="text-gray-600">
          Connect with other health enthusiasts and share your journey
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Share your tip or question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
            Post
          </button>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-semibold">User {i + 1}</div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                This is a sample community post about health and nutrition tips.
                Users can share their experiences and help each other.
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <button className="hover:text-primary">Like</button>
                <button className="hover:text-primary">Comment</button>
                <button className="hover:text-primary">Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
