import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceAreas from "@/components/ServiceAreas"
import ReviewsSection from "@/components/ReviewsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <ReviewsSection />
      <BeforeAfterSection />
      <ServiceAreas />
    </main>
  );
}