import { z } from "zod";

const GenerateVideoInputSchema = z.object({
  prompt: z.string(),
  aspectRatio: z.enum(["16:9"]).default("16:9"),
});

const GenerateVideoOutputSchema = z.object({
  videoUrl: z.string(),
});

export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideoMedia(
  input: GenerateVideoInput,
): Promise<GenerateVideoOutput> {
  const res = await fetch(`/api/ai/video-media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Video media request failed: ${res.status}`);
  return (await res.json()) as GenerateVideoOutput;
}
