import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import { buildPageMetadata } from "@/app/seo";

export const metadata = buildPageMetadata({
  title: "Get a Cleaning Quote",
  description:
    "Request a residential cleaning quote from CleanPrime Melbourne. Share your property details and optional photos for a clearer estimate.",
  path: "/quote",
  keywords: [
    "cleaning quote Melbourne",
    "house cleaning quote Melbourne",
    "end of lease cleaning quote Melbourne",
  ],
});

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <QuoteForm />
    </>
  );
}
