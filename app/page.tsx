import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceAreas from "@/components/ServiceAreas"
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServiceAreas />
      <Services />
    </main>
  );
}