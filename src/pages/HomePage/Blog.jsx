import React from "react";

const posts = [
  { title: "City Launches Smart Roads Project", date: "Jan 5, 2026", desc: "A new initiative to improve traffic flow across the city." },
  { title: "Water Supply Upgrade Completed", date: "Dec 20, 2025", desc: "Over 50% of the city now has better water pipelines." },
  { title: "New Public Parks Opened", date: "Nov 15, 2025", desc: "Citizens can enjoy green spaces in downtown areas." },
];

export default function Blog() {
  return (
    <section
      className="py-16 transition-colors duration-300
      bg-gray-50 dark:bg-gray-900 mt-5 dark:rounded-xl"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Blog / News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border transition
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              shadow hover:shadow-lg dark:hover:shadow-xl"
            >
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
                {post.date}
              </p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {post.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
