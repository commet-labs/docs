import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";
import type { NextRequest } from "next/server";

// cached forever
export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang?: string }> },
) {
  const { lang } = await params;
  const scan = source.getPages(lang).map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
