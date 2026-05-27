import { z } from "zod";

const GeneratePostMediaInputSchema = z.object({
  prompt: z.string(),
  aspectRatio: z.enum(["1:1", "16:9", "9:16"]).default("1:1"),
});

const GeneratePostMediaOutputSchema = z.object({
  mediaUrl: z.string(),
});

export type GeneratePostMediaInput = z.infer<typeof GeneratePostMediaInputSchema>;
export type GeneratePostMediaOutput = z.infer<typeof GeneratePostMediaOutputSchema>;

export async function generatePostMedia(
  input: GeneratePostMediaInput,
): Promise<GeneratePostMediaOutput> {
  const res = await fetch(`/api/ai/post-media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Post media request failed: ${res.status}`);
  return (await res.json()) as GeneratePostMediaOutput;
}
