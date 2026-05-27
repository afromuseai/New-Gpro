import { z } from "zod";

const AnalyzeAudienceInputSchema = z.object({
  niche: z.string(),
});

const AnalyzeAudienceOutputSchema = z.object({
  demographics: z.object({
    ageRange: z.string(),
    topLocations: z.array(z.string()),
    primaryInterests: z.array(z.string()),
  }),
  trendingTopics: z.array(
    z.object({
      topic: z.string(),
      momentum: z.string(),
      sentiment: z.string(),
    }),
  ),
  growthStrategy: z.string(),
});

export type AnalyzeAudienceInput = z.infer<typeof AnalyzeAudienceInputSchema>;
export type AnalyzeAudienceOutput = z.infer<typeof AnalyzeAudienceOutputSchema>;

export async function analyzeAudienceTrends(
  input: AnalyzeAudienceInput,
): Promise<AnalyzeAudienceOutput> {
  const res = await fetch(`/api/ai/analyze-audience`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Audience analysis request failed: ${res.status}`);
  return (await res.json()) as AnalyzeAudienceOutput;
}
