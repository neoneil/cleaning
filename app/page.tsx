import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceAreas from "@/components/ServiceAreas"
import ReviewsSection from "@/components/ReviewsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import FaqSection from "@/components/FaqSection";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqs } from "@/app/data/faqs";
import { faqJsonLd, serviceJsonLd } from "@/app/seo";

export default function Home() {
  return (
    <main>
      <SeoJsonLd
        data={[
          serviceJsonLd({
            name: "Professional home cleaning services in Melbourne",
            description:
              "Reliable residential cleaning services across Melbourne, including regular house cleaning, deep cleaning, apartment cleaning, end of lease cleaning, and move in or move out cleaning.",
            path: "/",
            area: "Melbourne",
          }),
          faqJsonLd(faqs),
        ]}
      />
      <Navbar />
      <Hero />
      <Services />
      <ReviewsSection />
      <BeforeAfterSection />
      <FaqSection />
      <ServiceAreas />
    </main>
  );
}
