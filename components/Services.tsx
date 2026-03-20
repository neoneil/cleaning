const services = [
  "House Cleaning",
  "Regular Cleaning",
  "Deep Cleaning",
  "End of Lease Cleaning",
  "Apartment Cleaning",
  "Move In / Move Out Cleaning",
];
const details = [
  "Comprehensive cleaning for all areas of your home, including kitchens, bathrooms, bedrooms, and living spaces. Ideal for maintaining a clean, healthy, and comfortable environment for your family.",
  
  "Scheduled cleaning services tailored to your routine, whether weekly or fortnightly. We ensure your home stays consistently fresh, tidy, and stress-free without you lifting a finger.",
  
  "A detailed top-to-bottom clean targeting built-up dirt, grime, and hard-to-reach areas. Perfect for seasonal refreshes or when your home needs extra attention and care.",
  
  "Thorough end of lease cleaning designed to meet real estate and inspection standards. We focus on every detail to help you secure your bond and leave the property spotless.",
  
  "Efficient and precise cleaning for apartments and units, with special attention to compact spaces, high-traffic areas, and shared surfaces to maximise cleanliness and comfort.",
  
  "Professional cleaning before you move in or after you move out. We prepare the property for its next stage, ensuring it is fresh, hygienic, and ready for occupancy.",
];

export default function Services() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Services
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-gray-700">
            Cleaning services designed for real homes and real schedules
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service}
              className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700">{service}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700 sm:text-base">
                {details[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}