import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("==== /api/quote called ====");

    const formData = await req.formData();

    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const propertyType = String(formData.get("propertyType") || "").trim();
    const suburb = String(formData.get("suburb") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const bedroomsValue = formData.get("bedrooms");
    const bathroomsValue = formData.get("bathrooms");
    const livingAreasValue = formData.get("livingAreas");

    const bedrooms = bedroomsValue ? Number(bedroomsValue) : null;
    const bathrooms = bathroomsValue ? Number(bathroomsValue) : null;
    const livingAreas = livingAreasValue ? Number(livingAreasValue) : null;

    console.log("Parsed form:", {
      email,
      phone,
      propertyType,
      suburb,
      message,
      bedrooms,
      bathrooms,
      livingAreas,
    });

    if (!email) {
      console.log("Missing email");
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    console.log("STEP 1: insert quote request");

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
        image_urls: [],
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("INSERT ERROR:", insertError);
      return Response.json(
        { error: `Insert failed: ${insertError?.message || "unknown error"}` },
        { status: 500 }
      );
    }

    const quoteId = inserted.id as string;
    console.log("Inserted quoteId:", quoteId);

    console.log("STEP 2: upload images");

    const imageFiles = formData.getAll("images") as File[];
    const imagePaths: string[] = [];

    for (const file of imageFiles) {
      if (!file || file.size === 0) continue;

      console.log("Uploading file:", file.name, file.type, file.size);

      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/\s+/g, "-");
      const filePath = `quotes/${quoteId}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("quote-images")
        .upload(filePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        continue;
      }

      imagePaths.push(filePath);
    }

    console.log("Uploaded paths:", imagePaths);

    console.log("STEP 3: update image_urls");

    const { error: updateError } = await supabase
      .schema("cleaning")
      .from("quote_requests")
      .update({ image_urls: imagePaths })
      .eq("id", quoteId);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      return Response.json(
        { error: `Update failed: ${updateError.message}` },
        { status: 500 }
      );
    }

    console.log("SUCCESS");
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

// export async function POST(req: Request) {
//   try {
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

//     if (!email) {
//       return Response.json({ error: "Email is required." }, { status: 400 });
//     }

//     const supabase = createServerSupabaseClient();

//     // 1) 先插入一条 request
//     const { data: inserted, error: insertError } = await supabase
//       .schema("cleaning").from("quote_requests")
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
//       .select()
//       .single();

//     if (insertError || !inserted) {
//       return Response.json(
//         { error: `Insert failed: ${insertError?.message}` },
//         { status: 500 }
//       );
//     }

//     const quoteId = inserted.id as string;

//     // 2) 上传图片到同一个 request 文件夹下
//     const imageFiles = formData.getAll("images") as File[];
//     const imagePaths: string[] = [];

//     for (const file of imageFiles) {
//       if (!file || file.size === 0) continue;

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
//         console.error("Upload error:", uploadError.message);
//         continue;
//       }

//       imagePaths.push(filePath);
//     }

//     // 3) 回写图片路径数组
//     const { error: updateError } = await supabase
//       .schema("cleaning")
//       .from("quote_requests")
//       .update({ image_urls: imagePaths })
//       .eq("id", quoteId);

//     if (updateError) {
//       return Response.json(
//         { error: `Update failed: ${updateError.message}` },
//         { status: 500 }
//       );
//     }

//     return Response.json({ success: true, quoteId });
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { error: "Unexpected server error" },
//       { status: 500 }
//     );
//   }
// }