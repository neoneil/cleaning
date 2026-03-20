import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Get a Quote | CleanPrime",
  description:
    "Request a cleaning quote by sharing property details and uploading photos.",
};

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <QuoteForm />
    </>
  );
}