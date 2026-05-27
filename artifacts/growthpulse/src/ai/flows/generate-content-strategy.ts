import { z } from "zod";

const ContentStrategyInputSchema = z.object({
  topic: z.string(),
  platform: z.enum(["instagram", "twitter", "tiktok", "linkedin", "youtube"]),
  targetAudience: z.string().optional(),
});

const ContentStrategyOutputSchema = z.object({
  hashtags: z.array(z.string()),
  postIdeas: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      hook: z.string(),
    }),
  ),
  optimizationTips: z.array(z.string()),
});

export type ContentStrategyInput = z.infer<typeof ContentStrategyInputSchema>;
export type ContentStrategyOutput = z.infer<typeof ContentStrategyOutputSchema>;

export async function generateContentStrategy(
  input: ContentStrategyInput,
): Promise<ContentStrategyOutput> {
  const res = await fetch(`/api/ai/content-strategy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Content strategy request failed: ${res.status}`);
  return (await res.json()) as ContentStrategyOutput;
}
