"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import Bilingual from "@/components/Bilingual";
import { useLanguageChoice } from "@/components/LanguageToggle";

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

const placeholders = {
  en: {
    propertyType: "Select property type",
    suburb: "e.g. Berwick",
    bedrooms: "e.g. 3",
    bathrooms: "e.g. 2",
    livingAreas: "e.g. 1",
    message:
      "Tell us about the property condition, preferred date, pet hair, oven cleaning, end of lease cleaning, or anything else we should know.",
  },
  zh: {
    propertyType: "请选择房屋类型",
    suburb: "例如 Berwick",
    bedrooms: "例如 3",
    bathrooms: "例如 2",
    livingAreas: "例如 1",
    message:
      "请简单说明房屋情况、希望清洁日期、宠物毛发、烤箱清洁、退租清洁或其他需要注意的事项。",
  },
};

export default function QuoteForm() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const { language } = useLanguageChoice();
  const copy = placeholders[language];

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
        throw new Error(
          language === "zh" ? "请填写邮箱。" : "Email is required."
        );
      }

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
    } catch (error: unknown) {
      console.error("Submit error:", error);
      setMessage(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  const fileCount = files?.length ?? 0;

  return (
    <section className="bg-gray-50 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.25fr] lg:gap-10">
          <div className="lg:pr-6">
            <p className="text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
              <Bilingual en="Get a Quote" zh="获取报价" />
            </p>

            <h1 className="mt-3 text-2xl font-semibold leading-tight text-gray-950 sm:text-4xl">
              <Bilingual en="Tell us about your property" zh="告诉我们您的房屋情况" />
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="Share a few details and upload photos if available. We will review the condition, understand the scope, and provide a clearer cleaning quote."
                zh="请填写基本信息，如方便也可上传照片。我们会根据房屋情况和清洁范围，给出更清楚的报价。"
              />
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Email" zh="邮箱" />
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Phone" zh="电话" />
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. 0412 345 678"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Property Type" zh="房屋类型" />
                  </label>
                  <select
                    name="propertyType"
                    defaultValue=""
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="" disabled>
                      {copy.propertyType}
                    </option>
                    <option value="house">{language === "zh" ? "独立屋" : "House"}</option>
                    <option value="unit">{language === "zh" ? "单元房" : "Unit"}</option>
                    <option value="apartment">
                      {language === "zh" ? "公寓" : "Apartment"}
                    </option>
                    <option value="townhouse">
                      {language === "zh" ? "联排别墅" : "Townhouse"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Suburb" zh="所在区域" />
                  </label>
                  <input
                    name="suburb"
                    type="text"
                    placeholder={copy.suburb}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Bedrooms" zh="卧室数量" />
                  </label>
                  <input
                    name="bedrooms"
                    type="number"
                    min="0"
                    placeholder={copy.bedrooms}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Bathrooms" zh="浴室数量" />
                  </label>
                  <input
                    name="bathrooms"
                    type="number"
                    min="0"
                    placeholder={copy.bathrooms}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Living Areas" zh="客厅/活动区数量" />
                  </label>
                  <input
                    name="livingAreas"
                    type="number"
                    min="0"
                    placeholder={copy.livingAreas}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Upload Photos (Optional)" zh="上传照片（可选）" />
                  </label>

                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-gray-400">
                    <input
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFiles(e.target.files)}
                      className="block w-full cursor-pointer text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-gray-950 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white file:transition hover:file:bg-gray-800"
                    />

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                        <Bilingual en="Multiple images supported" zh="支持多张图片" />
                      </span>

                      {fileCount > 0 && (
                        <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                          {language === "zh"
                            ? `已选择 ${fileCount} 个文件`
                            : `${fileCount} file${fileCount > 1 ? "s" : ""} selected`}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-gray-600">
                      <Bilingual
                        en="Optional, but photos help us provide a faster and more accurate quote."
                        zh="照片不是必须，但会帮助我们更快、更准确地报价。"
                      />
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    <Bilingual en="Additional Details (Optional)" zh="补充说明（可选）" />
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={copy.message}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-600 ring-1 ring-gray-200">
                <Bilingual
                  en="By submitting this form, you are sharing your property details so we can prepare a quote. We use this information only for service communication and quote assessment."
                  zh="提交表单表示您同意我们使用这些房屋信息来准备报价。相关信息仅用于服务沟通和报价评估。"
                />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      <Bilingual en="Submitting..." zh="正在提交..." />
                    </>
                  ) : (
                    <Bilingual en="Submit Quote Request" zh="提交报价申请" />
                  )}
                </button>

                {message === "success" && (
                  <div
                    className={`rounded-lg border border-green-200 bg-green-50 p-5 text-center shadow-sm transition-all duration-300 ${
                      successVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-5 w-5 text-green-700"
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

                    <p className="mt-4 text-lg font-semibold text-green-800">
                      <Bilingual
                        en="Request Submitted Successfully"
                        zh="报价申请已提交"
                      />
                    </p>

                    <p className="mt-2 text-sm text-green-700">
                      <Bilingual
                        en="Thank you. We have received your details and will get back to you shortly with the next steps."
                        zh="谢谢，我们已经收到您的信息，会尽快联系您确认下一步。"
                      />
                    </p>

                    <p className="mt-2 text-xs font-medium uppercase tracking-normal text-green-700">
                      <Bilingual en="Redirecting to homepage..." zh="即将返回首页..." />
                    </p>
                  </div>
                )}

                {message && message !== "success" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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
