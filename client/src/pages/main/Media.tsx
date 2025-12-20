import { useState } from "react";
import ClassModal from "../../components/registration/ClassModal";

// -----------------------------
// STATIC MOVIE FUN FACT ARTICLES
// -----------------------------
const articles = [
  {
    id: 1,
    title: "Why Cinematography in 2025 Looks So Different",
    desc:
      "Tech evolution, AI color grading, and new lens innovations have drastically changed how modern films look.",
    image:
      "https://images.pexels.com/photos/7130545/pexels-photo-7130545.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200",
    category: "Cinematography",
    content: `
Cinematography in 2025 has shifted dramatically.  
Here are some fun facts:

🎥 **AI Color Grading** now predicts mood from script pages.  
🔭 **Lens manufacturers** are returning to vintage glass for organic flares.  
💡 **Virtual lighting** allows filmmakers to 'paint' shadows without physical rigs.  
🖥️ **Neural Frame Blending** lets directors merge two takes into a perfect final shot.

This generation of cinema is the closest we've ever come to fully digital filmmaking while keeping the soul of analog film.
`
  },

  {
    id: 2,
    title: "How Sound Designers Create Monster Voices",
    desc:
      "Ever wondered how monster roars are made? The answer involves tigers, metal chairs, and a slowed-down pig.",
    image:
      "https://images.pexels.com/photos/7130552/pexels-photo-7130552.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200",
    category: "Sound Design",
    content: `
Monster voices are rarely one single recording.  
They are usually a mix:

🐅 Tiger growls  
🐖 Pig screams slowed to 5%  
🪑 Metal chairs dragged on the floor  
🌬️ Human breathing layered 5 times

Fun fact: The T-Rex in Jurassic World is **50% animal sounds** and **50% a baby elephant**.
`
  },

  {
    id: 3,
    title: "The Hidden Art Behind Movie Posters",
    desc:
      "The best poster designers follow three invisible rules to attract your attention in 0.7 seconds.",
    image:
      "https://images.pexels.com/photos/6712061/pexels-photo-6712061.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200",
    category: "Design",
    content: `
Poster designers use psychological tricks:

🎯 **Triangle Composition** guides your eyes from title → face → tagline.  
🌈 **Color psychology** triggers emotion instantly.  
🖼️ **Negative space** adds mystery and premium feel.  
🧩 **Hidden elements** make you stare longer.

That's why some posters feel “premium” even before you know the film.
`
  },

  {
    id: 4,
    title: "Directors Who Storyboard Every Frame",
    desc:
      "Some directors visualize entire films before the first day of shooting. Here’s why it changes everything.",
    image:
      "https://images.pexels.com/photos/7130556/pexels-photo-7130556.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200",
    category: "Directing",
    content: `
Directors like Bong Joon-ho and Edgar Wright storyboard **every single frame**.

Why?

📐 Perfect timing for action scenes  
🎭 Actors understand emotional flow  
🎚️ Editors know exact pacing  
🎥 Cinematographers match the director’s vision 1:1

It's like shooting a movie twice—once on paper, once in real life.
`
  }
];

// Featured = artikel pertama
const featured = articles[0];

export default function RegistrationsPage() {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="bg-black text-white pt-14 min-h-screen font-poppins">

      {/* FEATURED ARTICLE */}
      <section className="px-20 py-20">
        <span className="block text-sm font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
          Featured Article
        </span>

        <h1 className="font-extrabold leading-[1.1] text-[4.5vw] max-w-[80%] mb-5">
          {featured.title}
        </h1>

        <div className="text-neutral-400 text-base mb-10 flex items-center gap-3">
          <span className="text-cyan-300 uppercase text-xs tracking-wide font-bold">
            {featured.category}
          </span>
        </div>

        <div
          onClick={() => setSelected(featured)}
          className="w-full h-[500px] bg-neutral-900 flex items-center justify-center cursor-pointer group overflow-hidden rounded-xl"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="object-cover w-full h-full group-hover:scale-105 transition duration-700"
          />
        </div>
      </section>

      <hr className="border-neutral-800 mx-20" />

      {/* CONTENT + SIDEBAR */}
      <section className="px-20 py-20 flex flex-col lg:flex-row gap-16">

        {/* ARTICLE LIST */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold mb-10">Latest Film Articles</h2>

          {articles.slice(1).map((item) => (
            <article
              key={item.id}
              onClick={() => setSelected(item)}
              className="flex flex-col md:flex-row mb-12 border-b border-neutral-800 pb-8 cursor-pointer hover:bg-white/5 p-3 rounded-xl transition"
            >
              <div className="w-full md:w-[250px] h-[200px] bg-neutral-900 flex-shrink-0 mb-6 md:mb-0 md:mr-6 overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="block text-cyan-300 font-bold uppercase tracking-wider text-xs mb-2">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold leading-tight text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-neutral-400 mb-3 line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-72">
          <div className="mb-12">
            <h3 className="text-lg font-extrabold border-b border-neutral-600 pb-2 mb-5">
              Categories
            </h3>
            <ul className="text-neutral-400 divide-y divide-neutral-800">
              {["Cinematography", "Sound Design", "Design", "Directing"].map((cat) => (
                <li key={cat} className="py-2 hover:text-white cursor-pointer">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold border-b border-neutral-600 pb-2 mb-5">
              Stay Updated
            </h3>
            <p className="text-neutral-400 mb-4">
              Get the latest fun facts & film knowledge weekly.
            </p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white mb-3 rounded-lg"
            />
            <button className="w-full bg-white text-black font-bold py-3 rounded-lg">
              Subscribe
            </button>
          </div>
        </aside>
      </section>

      {/* MODAL */}
      <ClassModal data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
