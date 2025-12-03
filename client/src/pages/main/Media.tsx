import React from 'react';

// --- Interface Data Blog ---

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  imageUrl: string;
}

// Data Dummy Postingan Blog
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: AI-Powered Frameworks",
    excerpt: "Exploring how large language models and generative AI are beginning to automate boilerplate code and enhance developer efficiency...",
    category: "Technology",
    date: "Dec 1, 2025",
    readingTime: "7 min read",
    imageUrl: "path/to/image/ai-frameworks.jpg"
  },
  {
    id: 2,
    title: "Mastering TypeScript Generics for Better Code Structure",
    excerpt: "A deep dive into Generic types, constraints, and utility types to write flexible, reusable, and type-safe components in React...",
    category: "Programming",
    date: "Nov 25, 2025",
    readingTime: "12 min read",
    imageUrl: "path/to/image/typescript-generics.jpg"
  },
  {
    id: 3,
    title: "Minimalist Design Principles in 2026: Less is More Practical",
    excerpt: "Analyzing the shift from purely aesthetic minimalism to functional, performance-driven design in digital product interfaces...",
    category: "Design",
    date: "Nov 18, 2025",
    readingTime: "5 min read",
    imageUrl: "path/to/image/minimalist-design.jpg"
  },
];

// --- Komponen Kartu Postingan ---

const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="flex flex-col md:flex-row mb-12 border-b border-neutral-800 pb-8">
    <div className="w-full md:w-[250px] h-[200px] bg-neutral-900 flex-shrink-0 mb-6 md:mb-0 md:mr-6 overflow-hidden">
      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
    </div>

    <div>
      <span className="block text-cyan-300 font-bold uppercase tracking-wider text-xs mb-2">
        {post.category}
      </span>

      <h3 className="text-xl font-bold leading-tight text-white mb-2">
        {post.title}
      </h3>

      <p className="text-neutral-400 mb-3">
        {post.excerpt}
      </p>

      <div className="text-neutral-500 text-sm flex items-center gap-2">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
    </div>
  </article>
);



// --- Komponen Halaman Blog Utama ---
const BlogPage: React.FC = () => {
  const featuredPost = blogPosts[0];

  return (
    <div className="bg-black text-white pt-14 min-h-screen font-sans">

      {/* FEATURED SECTION */}
      <section className="px-20 py-20">
        <span className="block text-sm font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
          Featured Article
        </span>

        <h1 className="font-extrabold leading-[1.1] text-[4.5vw] max-w-[80%] mb-5">
          {featuredPost.title}
        </h1>

        <div className="text-neutral-400 text-base mb-10 flex items-center gap-3">
          <span className="text-cyan-300 uppercase text-xs tracking-wide font-bold">
            {featuredPost.category}
          </span>
          <span>/</span>
          <span>{featuredPost.date}</span>
        </div>

        <div className="w-full h-[500px] bg-neutral-900 flex items-center justify-center">
          <img src={featuredPost.imageUrl} alt={featuredPost.title} className="object-cover w-full h-full" />
        </div>
      </section>

      <hr className="border-neutral-800 mx-20" />

      {/* CONTENT + SIDEBAR */}
      <section className="px-20 py-20 flex flex-col lg:flex-row gap-16">

        {/* POST LIST */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold mb-10">Latest Posts</h2>

          {blogPosts.map((post) => <PostCard key={post.id} post={post} />)}

          <button
            className="w-full border border-neutral-600 py-4 font-bold mt-8 transition hover:bg-cyan-300 hover:text-black"
          >
            Load More Articles ⤢
          </button>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-72">
          <div className="mb-12">
            <h3 className="text-lg font-extrabold border-b border-neutral-600 pb-2 mb-5">
              Categories
            </h3>
            <ul className="text-neutral-400 divide-y divide-neutral-800">
              <li className="py-2 hover:text-white cursor-pointer">Technology (4)</li>
              <li className="py-2 hover:text-white cursor-pointer">Programming (12)</li>
              <li className="py-2 hover:text-white cursor-pointer">Design (5)</li>
              <li className="py-2 hover:text-white cursor-pointer">Marketing (8)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold border-b border-neutral-600 pb-2 mb-5">
              Stay Updated
            </h3>
            <p className="text-neutral-400 mb-4">Get the latest news directly to your inbox.</p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white mb-3"
            />
            <button className="w-full bg-white text-black font-bold py-3">
              Subscribe
            </button>
          </div>
        </aside>

      </section>

    </div>
  );
};

export default BlogPage;
