import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import GitHubProjects from "@/components/GitHubProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DiscordStatus from "@/components/DiscordStatus";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <GitHubProjects />
      
      <section className="py-10 bg-gradient-to-b from-background to-background/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <DiscordStatus />
          </div>
        </div>
      </section>
      
      <Contact />
      <Footer />
    </main>
  );
}
