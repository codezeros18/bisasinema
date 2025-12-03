import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EducationDetailLayout from "../../components/EducationDetailLayout";

interface EducationData {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  featured: string[];
  fullDescription?: string;
  content?: string;
  gallery?: string[];
}

const EducationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [education, setEducation] = useState<EducationData | null>(null);
  const [loading, setLoading] = useState(true);

  const educationData: EducationData[] = [
    {
      id: 1,
      number: "01",
      title: "WORKSHOPS & TRAINING",
      description:
        "We design and facilitate hands-on workshops covering cinematography, visual storytelling, and creative production techniques.",
      image: "https://i.ibb.co.com/pjMjqrx4/DSCF8464.webp",
      slug: "workshops-training",
      featured: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
      ],
      fullDescription:
        "Our workshops are designed for aspiring filmmakers and content creators who want to level up their skills in a collaborative environment. Through hands-on practice and expert guidance, participants learn essential techniques in cinematography, lighting, sound design, and post-production editing.",
      gallery: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
        "https://i.ibb.co.com/PZMKwQfP/DSCF8469.webp",
      ],
    },
    {
      id: 2,
      number: "02",
      title: "LAB & EXPERIMENTATION",
      description:
        "Creative spaces where students explore new technologies, techniques, and push the boundaries of visual expression.",
      image: "https://i.ibb.co.com/q3gMTf6Y/20250424-VS-2273.webp",
      slug: "lab-experimentation",
      featured: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
      ],
      fullDescription:
        "Our lab spaces are equipped with cutting-edge equipment where creators can experiment with new ideas and technologies. From drone cinematography to 3D visualization, we provide access to tools that push creative boundaries.",
      gallery: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
        "https://i.ibb.co.com/q3gMTf6Y/20250424-VS-2273.webp",
      ],
    },
    {
      id: 3,
      number: "03",
      title: "MENTORSHIP & GUIDANCE",
      description:
        "One-on-one and group mentoring sessions connecting aspiring creators with industry professionals and experienced filmmakers.",
      image: "https://i.ibb.co.com/LDWfY30v/20250423-IMG-7482.webp",
      slug: "mentorship-guidance",
      featured: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
      ],
      fullDescription:
        "Get personalized guidance from industry veterans who are passionate about nurturing the next generation of storytellers. Our mentors bring years of professional experience from top production companies and creative studios.",
      gallery: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
        "https://i.ibb.co.com/LDWfY30v/20250423-IMG-7482.webp",
      ],
    },
    {
      id: 4,
      number: "04",
      title: "PORTFOLIO DEVELOPMENT",
      description:
        "Comprehensive guidance in building professional portfolios that showcase creative work and industry-ready projects.",
      image: "https://i.ibb.co.com/bMsxhXCp/4.webp",
      slug: "portfolio-development",
      featured: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
      ],
      fullDescription:
        "We help you curate and present your best work in a way that captures the attention of industry professionals. Learn how to build a compelling portfolio that tells your creative story effectively.",
      gallery: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
        "https://i.ibb.co.com/bMsxhXCp/4.webp",
      ],
    },
    {
      id: 5,
      number: "05",
      title: "FESTIVAL & COMPETITIONS",
      description:
        "Opportunities to participate in prestigious film festivals and creative competitions, gaining recognition and industry exposure.",
      image: "https://i.ibb.co.com/cKS42FXQ/DSCF2861.webp",
      slug: "festival-competitions",
      featured: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
      ],
      fullDescription:
        "Showcase your work on prestigious platforms and gain recognition in the global filmmaking community. We support our creators through submission guidance and networking opportunities.",
      gallery: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
        "https://i.ibb.co.com/cKS42FXQ/DSCF2861.webp",
      ],
    },
    {
      id: 6,
      number: "06",
      title: "COLLABORATIVE PROJECTS",
      description:
        "Team-based initiatives where students collaborate on real-world projects, learning industry workflows and teamwork dynamics.",
      image: "https://i.ibb.co.com/99qwvwG7/DSCF0565.webp",
      slug: "collaborative-projects",
      featured: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
      ],
      fullDescription:
        "Work alongside fellow creators on meaningful projects that prepare you for professional environments. These collaborative initiatives simulate real production workflows and build essential teamwork skills.",
      gallery: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
        "https://i.ibb.co.com/99qwvwG7/DSCF0565.webp",
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    const found = educationData.find((item) => item.slug === slug);
    if (found) {
      setEducation(found);
      window.scrollTo(0, 0);
    } else {
      navigate("/education");
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!education) {
    return null;
  }

  return <EducationDetailLayout education={education} />;
};

export default EducationDetail;