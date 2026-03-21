import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

type QuotePayload = {
  email: string;
  phone?: string;
  propertyType?: string;
  suburb?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  livingAreas?: number | null;
  message?: string;
  imagePaths?: string[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuotePayload;

    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const propertyType = String(body.propertyType || "").trim();
    const suburb = String(body.suburb || "").trim();
    const message = String(body.message || "").trim();

    const bedrooms =
      typeof body.bedrooms === "number" && !Number.isNaN(body.bedrooms)
        ? body.bedrooms
        : null;

    const bathrooms =
      typeof body.bathrooms === "number" && !Number.isNaN(body.bathrooms)
        ? body.bathrooms
        : null;

    const livingAreas =
      typeof body.livingAreas === "number" && !Number.isNaN(body.livingAreas)
        ? body.livingAreas
        : null;
    const imagePaths = Array.isArray(body.imagePaths)
      ? body.imagePaths.filter(Boolean)
      : [];

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { data: inserted, error: insertError } = await supabase
      .schema("cleaning")
      .from("quote_requests")
      .insert({
        email,
        phone: phone || null,
        property_type: propertyType || null,
        bedrooms,
        bathrooms,
        living_areas: livingAreas,
        suburb: suburb || null,
        message: message || null,
        image_urls: imagePaths,
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      return Response.json(
        { error: `Insert failed: ${insertError?.message || "unknown error"}` },
        { status: 500 }
      );
    }

    const quoteId = inserted.id as string;

    try {
      const notifyTo = process.env.QUOTE_NOTIFICATION_EMAIL;
      const fromEmail = process.env.QUOTE_FROM_EMAIL;

      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is required.");
      }

      if (!notifyTo) {
        throw new Error("QUOTE_NOTIFICATION_EMAIL is required.");
      }

      if (!fromEmail) {
        throw new Error("QUOTE_FROM_EMAIL is required.");
      }

      const propertySummary = [
        propertyType ? `Property Type: ${propertyType}` : null,
        suburb ? `Suburb: ${suburb}` : null,
        bedrooms !== null ? `Bedrooms: ${bedrooms}` : null,
        bathrooms !== null ? `Bathrooms: ${bathrooms}` : null,
        livingAreas !== null ? `Living Areas: ${livingAreas}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await resend.emails.send({
        from: `CleanPrime <${fromEmail}>`,
        to: [notifyTo],
        subject: `New Quote Request - ${suburb || propertyType || "Website Lead"}`,
        text: `
A new quote request has been submitted.

Quote ID: ${quoteId}
Email: ${email}
Phone: ${phone || "Not provided"}

${propertySummary || "No property details provided."}

Additional Details:
${message || "None"}

Uploaded Images: ${imagePaths.length}

Image Paths:
${imagePaths.length ? imagePaths.join("\n") : "No images uploaded"}
        `.trim(),
      });

      await resend.emails.send({
        from: `CleanPrime <${fromEmail}>`,
        to: [email],
        subject: "We’ve received your quote request",
        text: `
Hi,

Thank you for contacting CleanPrime.

We’ve received your quote request and will review your details shortly.
Our team will get back to you as soon as possible.

Summary:
${propertySummary || "No property details provided."}
Phone: ${phone || "Not provided"}
Uploaded Images: ${imagePaths.length}

Regards,
Vivi & Chi
CleanPrime
        `.trim(),
      });
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError);
    }

    return Response.json({ success: true, quoteId });
  } catch (error) {
    console.error("UNEXPECTED ERROR:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
// import { createServerSupabaseClient } from "@/lib/supabase/server";
// import { Resend } from "resend";

// export const runtime = "nodejs";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     console.log("==== /api/quote called ====");

//     const formData = await req.formData();

//     const email = String(formData.get("email") || "").trim();
//     const phone = String(formData.get("phone") || "").trim();
//     const propertyType = String(formData.get("propertyType") || "").trim();
//     const suburb = String(formData.get("suburb") || "").trim();
//     const message = String(formData.get("message") || "").trim();

//     const bedroomsValue = formData.get("bedrooms");
//     const bathroomsValue = formData.get("bathrooms");
//     const livingAreasValue = formData.get("livingAreas");

//     const bedrooms = bedroomsValue ? Number(bedroomsValue) : null;
//     const bathrooms = bathroomsValue ? Number(bathroomsValue) : null;
//     const livingAreas = livingAreasValue ? Number(livingAreasValue) : null;

//     console.log("Parsed form:", {
//       email,
//       phone,
//       propertyType,
//       suburb,
//       message,
//       bedrooms,
//       bathrooms,
//       livingAreas,
//     });

//     if (!email) {
//       console.log("Missing email");
//       return Response.json({ error: "Email is required." }, { status: 400 });
//     }

//     const supabase = createServerSupabaseClient();

//     console.log("STEP 1: insert quote request");

//     const { data: inserted, error: insertError } = await supabase
//       .schema("cleaning")
//       .from("quote_requests")
//       .insert({
//         email,
//         phone: phone || null,
//         property_type: propertyType || null,
//         bedrooms,
//         bathrooms,
//         living_areas: livingAreas,
//         suburb: suburb || null,
//         message: message || null,
//         image_urls: [],
//       })
//       .select("id")
//       .single();

//     if (insertError || !inserted) {
//       console.error("INSERT ERROR:", insertError);
//       return Response.json(
//         { error: `Insert failed: ${insertError?.message || "unknown error"}` },
//         { status: 500 }
//       );
//     }

//     const quoteId = inserted.id as string;
//     console.log("Inserted quoteId:", quoteId);

//     console.log("STEP 2: upload images");

//     const imageFiles = formData.getAll("images") as File[];
//     const imagePaths: string[] = [];

//     for (const file of imageFiles) {
//       if (!file || file.size === 0) continue;

//       console.log("Uploading file:", file.name, file.type, file.size);

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const safeName = file.name.replace(/\s+/g, "-");
//       const filePath = `quotes/${quoteId}/${Date.now()}-${safeName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("quote-images")
//         .upload(filePath, buffer, {
//           contentType: file.type || "image/jpeg",
//           upsert: false,
//         });

//       if (uploadError) {
//         console.error("UPLOAD ERROR:", uploadError);
//         continue;
//       }

//       imagePaths.push(filePath);
//     }

//     console.log("Uploaded paths:", imagePaths);

//     console.log("STEP 3: update image_urls");

//     const { error: updateError } = await supabase
//       .schema("cleaning")
//       .from("quote_requests")
//       .update({ image_urls: imagePaths })
//       .eq("id", quoteId);

//     if (updateError) {
//       console.error("UPDATE ERROR:", updateError);
//       return Response.json(
//         { error: `Update failed: ${updateError.message}` },
//         { status: 500 }
//       );
//     }

//     console.log("STEP 4: send emails");

//     try {
//       const notifyTo = process.env.QUOTE_NOTIFICATION_EMAIL;
//       const fromEmail = process.env.QUOTE_FROM_EMAIL;

//       if (!process.env.RESEND_API_KEY) {
//         throw new Error("RESEND_API_KEY is required.");
//       }

//       if (!notifyTo) {
//         throw new Error("QUOTE_NOTIFICATION_EMAIL is required.");
//       }

//       if (!fromEmail) {
//         throw new Error("QUOTE_FROM_EMAIL is required.");
//       }

//       const propertySummary = [
//         propertyType ? `Property Type: ${propertyType}` : null,
//         suburb ? `Suburb: ${suburb}` : null,
//         bedrooms !== null ? `Bedrooms: ${bedrooms}` : null,
//         bathrooms !== null ? `Bathrooms: ${bathrooms}` : null,
//         livingAreas !== null ? `Living Areas: ${livingAreas}` : null,
//       ]
//         .filter(Boolean)
//         .join("\n");

//       await resend.emails.send({
//         from: `CleanPrime <${fromEmail}>`,
//         to: [notifyTo],
//         subject: `New Quote Request - ${suburb || propertyType || "Website Lead"}`,
//         text: `
// A new quote request has been submitted.

// Quote ID: ${quoteId}
// Email: ${email}
// Phone: ${phone || "Not provided"}

// ${propertySummary || "No property details provided."}

// Additional Details:
// ${message || "None"}

// Uploaded Images: ${imagePaths.length}
//         `.trim(),
//       });

//       await resend.emails.send({
//         from: `CleanPrime <${fromEmail}>`,
//         to: [email],
//         subject: "We’ve received your quote request",
//         text: `
// Hi,

// Thank you for contacting CleanPrime.

// We’ve received your quote request and will review your details shortly.
// Our team will get back to you as soon as possible.

// Summary:
// ${propertySummary || "No property details provided."}
// Phone: ${phone || "Not provided"}
// Uploaded Images: ${imagePaths.length}

// Regards,
// Vivi & Chi
// CleanPrime
//         `.trim(),
//       });

//       console.log("EMAILS SENT");
//     } catch (emailError) {
//       console.error("EMAIL ERROR:", emailError);
//     }

//     console.log("SUCCESS");
//     return Response.json({ success: true, quoteId });
//   } catch (error) {
//     console.error("UNEXPECTED ERROR:", error);
//     return Response.json(
//       {
//         error: error instanceof Error ? error.message : "Unexpected server error",
//       },
//       { status: 500 }
//     );
//   }
// }

