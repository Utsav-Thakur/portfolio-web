import ScrollyCanvas from '@/components/ScrollyCanvas';
import AboutMe from '@/components/AboutMe';
import Projects from '@/components/Projects';
import ResumeSection from '@/components/ResumeSection';
import ContactMe from '@/components/ContactMe';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      
      {/* 
        The ScrollyCanvas manages the 500vh container, the sticky canvas, 
        and the parallax overlay logic based on scroll progress.
      */}
      <ScrollyCanvas />
      
      {/* 
        About Me section giving a brief introduction.
      */}
      <AboutMe />

      {/* 
        The Projects grid flows naturally after the About section.
      */}
      <Projects />

      {/* 
        The Resume section handles Education, Skills, and other details.
      */}
      <ResumeSection />

      {/* 
        Contact section for getting in touch.
      */}
      <ContactMe />
    </main>
  );
}
