import React from 'react';
// Anggap ini mengimpor style yang baru dibuat
import './mediastyle.css'; 

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
  <article className="post-card">
    <div className="card-image-placeholder">
      {/* Gambar Postingan */}
      <img src={post.imageUrl} alt={post.title} className="post-image" />
    </div>
    <div className="card-content">
      <span className="post-category">{post.category}</span>
      <h3 className="post-title-small">{post.title}</h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-meta">
        <span className="post-date">{post.date}</span>
        <span className="post-separator">·</span>
        <span className="post-read-time">{post.readingTime}</span>
      </div>
    </div>
  </article>
);


// --- Komponen Halaman Blog Utama ---

const BlogPage: React.FC = () => {
  const featuredPost = blogPosts[0]; // Ambil postingan pertama sebagai featured
  
  return (
    <div className="blog-page-container">
      {/* Anggap Header sudah ada di atas */}

      {/* 1. Hero / Featured Post Section */}
      <section className="featured-section">
        <span className="featured-label">Featured Article</span>
        <h1 className="featured-title">
          {featuredPost.title}
        </h1>
        <div className="featured-meta">
          <span className="post-category">{featuredPost.category}</span>
          <span className="post-separator">/</span>
          <span className="post-date">{featuredPost.date}</span>
        </div>
        
        {/* Visual besar yang meniru style referensi */}
        <div className="featured-visual">
          <img src={featuredPost.imageUrl} alt={featuredPost.title} />
        </div>
      </section>

      <hr className="divider" />

      {/* 2. Post List & Sidebar Section */}
      <section className="content-layout">
        
        {/* A. Daftar Postingan (Main Content) */}
        <div className="post-list">
          <h2 className="section-heading">Latest Posts</h2>
          {blogPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {/* Tombol Load More untuk style blog modern */}
          <button className="load-more-button">Load More Articles ⤢</button>
        </div>

        {/* B. Sidebar (Kategori & Recent) */}
        <aside className="blog-sidebar">
          <div className="sidebar-box">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="category-list">
              <li><a href="#">Technology (4)</a></li>
              <li><a href="#">Programming (12)</a></li>
              <li><a href="#">Design (5)</a></li>
              <li><a href="#">Marketing (8)</a></li>
            </ul>
          </div>

          <div className="sidebar-box">
            <h3 className="sidebar-title">Stay Updated</h3>
            <p>Get the latest news directly to your inbox.</p>
            <input type="email" placeholder="Your Email Address" className="subscribe-input" />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </aside>

      </section>
      
    </div>
  );
};

export default BlogPage;