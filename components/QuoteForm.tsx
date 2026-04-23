
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function QuoteForm() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<"" | "success" | string>("");
  const [successVisible, setSuccessVisible] = useState(false);

  async function uploadImagesDirectly(selectedFiles: FileList, quoteId: string) {
    const uploadedPaths: string[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (!file || file.size === 0) continue;

      const signedRes = await fetch("/api/storage/create-upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteId,
          fileName: file.name,
          contentType: file.type || "image/jpeg",
        }),
      });

      const signedData = await signedRes.json().catch(() => null);

      if (!signedRes.ok || !signedData?.path || !signedData?.token) {
        throw new Error(
          signedData?.error || `Failed to prepare upload for ${file.name}`
        );
      }

      const { path, token } = signedData;

      const { error: uploadError } = await supabase.storage
        .from("quote-images")
        .uploadToSignedUrl(path, token, file, {
          contentType: file.type || "image/jpeg",
        });

      if (uploadError) {
        throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
      }

      uploadedPaths.push(path);
    }

    return uploadedPaths;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccessVisible(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const propertyType = String(formData.get("propertyType") || "").trim();
      const suburb = String(formData.get("suburb") || "").trim();
      const messageText = String(formData.get("message") || "").trim();

      const bedroomsValue = formData.get("bedrooms");
      const bathroomsValue = formData.get("bathrooms");
      const livingAreasValue = formData.get("livingAreas");

      const bedrooms = bedroomsValue ? Number(bedroomsValue) : null;
      const bathrooms = bathroomsValue ? Number(bathroomsValue) : null;
      const livingAreas = livingAreasValue ? Number(livingAreasValue) : null;

      if (!email) {
        throw new Error("Email is required.");
      }

      // 仅用于组织 storage path，不是数据库 quote_requests 的 id
      const clientQuoteId = crypto.randomUUID();

      let imagePaths: string[] = [];

      if (files && files.length > 0) {
        imagePaths = await uploadImagesDirectly(files, clientQuoteId);
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          propertyType,
          suburb,
          bedrooms,
          bathrooms,
          livingAreas,
          message: messageText,
          imagePaths,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `Request failed with status ${res.status}`);
      }

      setMessage("success");
      setSuccessVisible(true);
      form.reset();
      setFiles(null);

      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error: any) {
      console.error("Submit error:", error);
      setMessage(error.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  const fileCount = files?.length ?? 0;

  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          <div className="lg:pr-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Get a Quote
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
              Tell us about your property
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-700 sm:text-base">
              Share a few details and upload photos (optional) of the space. We’ll review
              the condition, understand the scope of work, and provide a more
              accurate cleaning quote.
            </p>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. 0412 345 678"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    defaultValue=""
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  >
                    <option value="" disabled>
                      Select property type
                    </option>
                    <option value="house">House</option>
                    <option value="unit">Unit</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Suburb
                  </label>
                  <input
                    name="suburb"
                    type="text"
                    placeholder="e.g. Berwick"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    name="bedrooms"
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <input
                    name="bathrooms"
                    type="number"
                    min="0"
                    placeholder="e.g. 2"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Living Areas
                  </label>
                  <input
                    name="livingAreas"
                    type="number"
                    min="0"
                    placeholder="e.g. 1"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Upload Photos (Optional)
                  </label>

                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-gray-400">
                    <input
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFiles(e.target.files)}
                      className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition file:duration-200 hover:file:bg-gray-800"
                    />

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                        Multiple images supported
                      </span>

                      {fileCount > 0 && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                          {fileCount} file{fileCount > 1 ? "s" : ""} selected
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-gray-600">
                      Optional — but adding photos helps us give you a faster and more accurate quote.
                    </p>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      Helps with accurate pricing
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us more about the condition of the property, preferred date, pet hair, oven cleaning, end of lease cleaning, or anything else we should know."
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-600 ring-1 ring-gray-200">
                By submitting this form, you are sharing your property details so
                we can prepare a quote. We use this information only for service
                communication and quote assessment.
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>

                {message === "success" && (
                  <div
                    className={`rounded-2xl border border-green-200 bg-green-50 p-5 text-center shadow-sm transition-all duration-300 ${successVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                      }`}
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="mt-4 text-lg font-semibold text-green-800 sm:text-xl">
                      Request Submitted Successfully
                    </p>

                    <p className="mt-2 text-sm text-green-700 sm:text-base">
                      Thank you. We’ve received your details and will get back to
                      you shortly with the next steps.
                    </p>

                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-green-600">
                      Redirecting to homepage...
                    </p>
                  </div>
                )}

                {message && message !== "success" && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// function Spinner() {
//   return (
//     <svg
//       className="h-4 w-4 animate-spin"
//       viewBox="0 0 24 24"
//       fill="none"
//       aria-hidden="true"
//     >
//       <circle
//         className="opacity-20"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       />
//       <path
//         className="opacity-90"
//         d="M22 12a10 10 0 0 0-10-10"
//         stroke="currentColor"
//         strokeWidth="4"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// export default function QuoteForm() {
//   const router = useRouter();
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<"" | "success" | string>("");
//   const [successVisible, setSuccessVisible] = useState(false);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setSuccessVisible(false);

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     try {
//       const res = await fetch("/api/quote", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json().catch(() => null);
//       console.log("API response:", data);

//       if (!res.ok) {
//         throw new Error(data?.error || `Request failed with status ${res.status}`);
//       }

//       setMessage("success");
//       setSuccessVisible(true);
//       form.reset();
//       setFiles(null);

//       setTimeout(() => {
//         router.push("/");
//       }, 4000);
//     } catch (error: any) {
//       console.error("Submit error:", error);
//       setMessage(error.message || "Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const fileCount = files?.length ?? 0;

//   return (
//     <section className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-20">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
//           <div className="lg:pr-6">
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
//               Get a Quote
//             </p>

//             <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
//               Tell us about your property
//             </h1>

//             <p className="mt-4 max-w-xl text-sm leading-7 text-gray-700 sm:text-base">
//               Share a few details and upload photos of the space. We’ll review
//               the condition, understand the scope of work, and provide a more
//               accurate cleaning quote.
//             </p>

//             <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
//               <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//                 <p className="text-sm font-semibold text-gray-900">Fast Review</p>
//                 <p className="mt-2 text-sm leading-6 text-gray-600">
//                   Send your details in minutes with no complicated steps.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//                 <p className="text-sm font-semibold text-gray-900">Photo-Based Estimate</p>
//                 <p className="mt-2 text-sm leading-6 text-gray-600">
//                   Upload images so we can better understand the property.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//                 <p className="text-sm font-semibold text-gray-900">Clear Communication</p>
//                 <p className="mt-2 text-sm leading-6 text-gray-600">
//                   We keep the process simple, friendly, and straightforward.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid gap-5 md:grid-cols-2">
//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     placeholder="you@example.com"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <input
//                     name="phone"
//                     type="tel"
//                     placeholder="e.g. 0412 345 678"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Property Type
//                   </label>
//                   <select
//                     name="propertyType"
//                     defaultValue=""
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   >
//                     <option value="" disabled>
//                       Select property type
//                     </option>
//                     <option value="house">House</option>
//                     <option value="unit">Unit</option>
//                     <option value="apartment">Apartment</option>
//                     <option value="townhouse">Townhouse</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Suburb
//                   </label>
//                   <input
//                     name="suburb"
//                     type="text"
//                     placeholder="e.g. Berwick"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Bedrooms
//                   </label>
//                   <input
//                     name="bedrooms"
//                     type="number"
//                     min="0"
//                     placeholder="e.g. 3"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Bathrooms
//                   </label>
//                   <input
//                     name="bathrooms"
//                     type="number"
//                     min="0"
//                     placeholder="e.g. 2"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Living Areas
//                   </label>
//                   <input
//                     name="livingAreas"
//                     type="number"
//                     min="0"
//                     placeholder="e.g. 1"
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Upload Photos
//                   </label>

//                   <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-gray-400">
//                     <input
//                       name="images"
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => setFiles(e.target.files)}
//                       className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition file:duration-200 hover:file:bg-gray-800"
//                     />

//                     <div className="mt-3 flex flex-wrap items-center gap-2">
//                       <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
//                         Multiple images supported
//                       </span>

//                       {fileCount > 0 && (
//                         <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
//                           {fileCount} file{fileCount > 1 ? "s" : ""} selected
//                         </span>
//                       )}
//                     </div>

//                     <p className="mt-3 text-xs leading-5 text-gray-600">
//                       Upload clear photos of kitchens, bathrooms, floors, walls,
//                       or any areas that need special attention.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     Additional Details
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={5}
//                     placeholder="Tell us more about the condition of the property, preferred date, pet hair, oven cleaning, end of lease cleaning, or anything else we should know."
//                     className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition duration-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                   />
//                 </div>
//               </div>

//               <div className="rounded-2xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-600 ring-1 ring-gray-200">
//                 By submitting this form, you are sharing your property details so
//                 we can prepare a quote. We use this information only for service
//                 communication and quote assessment.
//               </div>

//               <div className="flex flex-col gap-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
//                 >
//                   {loading ? (
//                     <>
//                       <Spinner />
//                       Submitting...
//                     </>
//                   ) : (
//                     "Submit Quote Request"
//                   )}
//                 </button>

//                 {message === "success" && (
//                   <div
//                     className={`rounded-2xl border border-green-200 bg-green-50 p-5 text-center shadow-sm transition-all duration-300 ${
//                       successVisible
//                         ? "translate-y-0 opacity-100"
//                         : "translate-y-1 opacity-0"
//                     }`}
//                   >
//                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//                       <svg
//                         className="h-6 w-6 text-green-700"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M5 13l4 4L19 7"
//                           stroke="currentColor"
//                           strokeWidth="2.5"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>

//                     <p className="mt-4 text-lg font-semibold text-green-800 sm:text-xl">
//                       Request Submitted Successfully
//                     </p>

//                     <p className="mt-2 text-sm text-green-700 sm:text-base">
//                       Thank you. We’ve received your details and will get back to
//                       you shortly with the next steps.
//                     </p>

//                     <p className="mt-2 text-xs font-medium uppercase tracking-wide text-green-600">
//                       Redirecting to homepage...
//                     </p>
//                   </div>
//                 )}

//                 {message && message !== "success" && (
//                   <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//                     {message}
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

