import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const quoteId = String(body.quoteId || "").trim();
    const fileName = String(body.fileName || "").trim();
    const contentType = String(body.contentType || "image/jpeg").trim();

    if (!quoteId) {
      return Response.json({ error: "quoteId is required." }, { status: 400 });
    }

    if (!fileName) {
      return Response.json({ error: "fileName is required." }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const safeName = sanitizeFileName(fileName);
    const filePath = `quotes/${quoteId}/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("quote-images")
      .createSignedUploadUrl(filePath);

    if (error || !data) {
      return Response.json(
        { error: error?.message || "Failed to create signed upload URL." },
        { status: 500 }
      );
    }

    return Response.json({
      path: filePath,
      token: data.token,
      // 调试时可用
      contentType,
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}