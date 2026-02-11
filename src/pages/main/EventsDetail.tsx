import React from "react";
import { useParams } from "react-router-dom";
import WorkDetailLayout from "../../components/WorkDetailLayout";
const bahariImg = "https://i.ibb.co.com/F1N3qLv/DSCF0578.webp";
const dossImg = "https://i.ibb.co.com/F1N3qLv/DSCF0578.webp";

const works = [
  {
    slug: "bahari-on-screen",
    title: "Bahari On Screen",
    category: "Short Film Competition & Festival",
    image: bahariImg,
    descriptionHeader:
      "a short film competition and festival organized by the Maritime Museum of Jakarta.",
    description: `Bahari On Screen is an audiovisual showcase highlighting maritime themes and oceanic beauty.
                  The event features creative works from Bisasinema and collaborators, including short films, documentaries,
                  and visual experiments focused on the sea. Each piece aims to deliver an engaging visual experience while
                  raising awareness about ocean conservation.`,
    features: ["FILM SCREENING", "MARINE THEME", "CREATIVE SHOWCASE"],
  },
  {
    slug: "doss-guava-xr",
    title: "Doss Guava XR",
    category: "XR & Interactive Experience",
    image: dossImg,
    descriptionHeader: "an immersive XR collaboration blending technology and storytelling.",
    description: `Doss Guava XR is Bisasinema’s innovative collaboration combining Extended Reality (XR) technology with
                  creative storytelling. Participants can explore interactive and immersive content that blends virtual and augmented
                  reality, offering audiences a fresh and engaging experience. The event emphasizes technology as a medium for creative
                  expression in the digital media industry.`,
    features: ["XR EXPERIENCE", "INTERACTIVE", "TECH COLLABORATION"],
  },
  {
    slug: "sae-workshop-2025",
    title: "SAE Workshop 2025",
    category: "Workshop & Training",
    image: "https://i.ibb.co.com/pjMjqrx4/DSCF8464.webp",
    descriptionHeader: "a hands-on workshop in film production in partnership with SAE Film Institute.",
    description: `This workshop equips participants with practical skills in film and creative media
                  production. It covers hands-on sessions from pre-production, filming, to post-production, while providing
                  insights from industry professionals. Participants gain direct exposure to professional
                  techniques applicable in real-world projects.`,
    features: ["HANDS-ON WORKSHOP", "FILM PRODUCTION", "INDUSTRY COLLABORATION"],
  },
  {
    slug: "umn-cinematography-lab",
    title: "UMN Cinematography Lab",
    category: "Practical Lab & Creative Experimentation",
    image: "https://i.ibb.co.com/60CRNpDS/20250424-DSC01559.webp",
    descriptionHeader: "a practical lab for experimenting with cinematography and visual storytelling.",
    description: `The Cinematography Lab provides a creative space for students and the Bisasinema team to
                  experiment with cinematography, lighting, framing, and visual storytelling. The lab facilitates hands-on practice,
                  visual concept development, and exploration of the latest camera technologies
                  to produce high-quality content.`,
    features: ["CINEMATOGRAPHY PRACTICE", "TECHNICAL LAB", "VISUAL EXPERIMENT"],
  },
  {
    slug: "workshop-umn-2025",
    title: "UMN Workshop 2025",
    category: "Workshop & Training",
    image: "https://i.ibb.co.com/xqXZV3WJ/20250424-IMG-7781.webp",
    descriptionHeader: "a creative campus workshop developing video production and storytelling skills.",
    description: `UMN Workshop 2025 is Bisasinema’s initiative to develop students’ creativity through
                  video production, storytelling, and creative media training. The event emphasizes practical skill
                  acquisition and collaborative innovation among students to produce creative,
                  high-quality projects.`,
    features: ["SKILL DEVELOPMENT", "STORYTELLING", "CAMPUS EVENT"],
  },
  {
    slug: "content-and-media-portfolio",
    title: "Content and Media Portfolio",
    category: "The things that bisasinema has made",
    image: "https://i.ibb.co.com/7NzK5MCS/media-bisasinema.png",
    descriptionHeader: "a curated collection of digital media works showcasing Bisasinema’s creativity.",
    description: `Bisasinema’s content and media portfolio is a collection of digital works showcasing the
                  team’s creativity, ranging from videos and photography to interactive media. It serves as an official
                  showcase of the team’s capabilities, a documentation of Bisasinema’s creative journey, and a
                  reference for collaborations and new project developments.`,
    features: ["DIGITAL PORTFOLIO", "CONTENT SHOWCASE", "MEDIA ARCHIVE"],
  },
];

const imageSets: Record<string, string[]> = {
  "bahari-on-screen": [
    "https://i.ibb.co.com/pj9kPyH2/DSCF3068.webp",
    "https://i.ibb.co.com/xKNvMRFh/DSCF2924.webp",
    "https://i.ibb.co.com/Rkkmwh3n/DSCF2981.webp",
    "https://i.ibb.co.com/fdnjzQ6R/DSCF2842.webp",
    "https://i.ibb.co.com/KBM7B3t/DSCF3180.webp",
    "https://i.ibb.co.com/Dg8KZ1L2/DSCF2826.webp",
    "https://i.ibb.co.com/6JZyQfvG/DSCF3008.webp",
    "https://i.ibb.co.com/wX3hbRp/DSCF2788.webp",
  ],
  "doss-guava-xr": [
    "https://i.ibb.co.com/F4YWZNFx/DSCF0703.webp",
    "https://i.ibb.co.com/KjXrgD37/DSCF0699.webp",
    "https://i.ibb.co.com/PZZ4SC0f/DSCF0681.webp",
    "https://i.ibb.co.com/fYXR3VDB/DSCF0664.webp",
    "https://i.ibb.co.com/JWxb3xzk/DSCF0665.webp",
    "https://i.ibb.co.com/B5Pgy6mD/DSCF0657.webp",
    "https://i.ibb.co.com/934mg10c/DSCF0648.webp",
    "https://i.ibb.co.com/KzjDRD3b/DSCF0644.webp",
    "https://i.ibb.co.com/TM28XXg3/DSCF0590.webp",
    "https://i.ibb.co.com/5XdDBQ4d/DSCF0572.webp",
    "https://i.ibb.co.com/8DPTVFSH/DSCF0583.webp",
    "https://i.ibb.co.com/nsnHDJn7/DSCF0551.webp",
  ],
  "sae-workshop-2025": [
    "https://i.ibb.co.com/q3fSdpSP/DSCF9045.webp",
    "https://i.ibb.co.com/S76nSzQK/DSCF9061.webp",
    "https://i.ibb.co.com/gMcLJddc/DSCF8542.webp",
    "https://i.ibb.co.com/FbdXnzc4/DSCF8479.webp",
    "https://i.ibb.co.com/NdLwPBnh/DSCF8512.webp",
    "https://i.ibb.co.com/TBqwPRsG/DSCF8474.webp",
    "https://i.ibb.co.com/chkcLK9F/DSCF8516.webp",
    "https://i.ibb.co.com/x8qtS3Vk/DSCF8969.webp",
    "https://i.ibb.co.com/v4rz8yTq/DSCF8954.webp",
    "https://i.ibb.co.com/XfCV22Tz/DSCF8984.webp",
    "https://i.ibb.co.com/W4wTjTkw/DSCF8594.webp",
    "https://i.ibb.co.com/dJGWB9Rh/DSCF9002.webp",
    "https://i.ibb.co.com/DfyJsFFq/DSCF9017.webp",
  ],
  "umn-cinematography-lab": [
    "https://i.ibb.co.com/s9szJGtf/20250425-VS-0193.webp",
    "https://i.ibb.co.com/ksGJhhqH/20250425-VS-0120.webp",
    "https://i.ibb.co.com/zTh3cB8B/20250425-VS-0247.webp",
    "https://i.ibb.co.com/TZ7XCz5/20250425-VS-0094.webp",
    "https://i.ibb.co.com/q3YTrVWH/20250425-VS-0092.webp",
    "https://i.ibb.co.com/1tH4j8dK/20250424-IMG-7793.webp",
    "https://i.ibb.co.com/7N6fzKYT/20250424-IMG-7814.webp",
    "https://i.ibb.co.com/NnWPS5ZL/20250425-VS-0100.webp",
    ""
  ],
  "workshop-umn-2025": [
    "https://i.ibb.co/umn1.jpg",
    "https://i.ibb.co/umn2.jpg",
  ],
  "content-and-media-portfolio": [
    "https://i.ibb.co/media1.jpg",
    "https://i.ibb.co/media2.jpg",
  ],
};

const WorksDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return <div className="text-white p-10">Work not found.</div>;
  }

  // kirim list gambar ke WorkDetailLayout
  return (
    <WorkDetailLayout
      title={work.title}
      image={work.image}
      category={work.category}
      description={work.description}
      descriptionHeader={work.descriptionHeader}
      features={work.features}
      images={imageSets[slug || ""] || []}
    />
  );
};

export default WorksDetailPage;
