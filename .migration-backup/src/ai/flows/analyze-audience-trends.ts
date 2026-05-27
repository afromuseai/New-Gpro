'use server';
/**
 * @fileOverview A Genkit flow for deep audience intelligence and niche trend analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeAudienceInputSchema = z.object({
  niche: z.string().describe('The industry or niche to analyze (e.g., "Luxury Travel", "SaaS Tech").'),
});

const AnalyzeAudienceOutputSchema = z.object({
  demographics: z.object({
    ageRange: z.string(),
    topLocations: z.array(z.string()),
    primaryInterests: z.array(z.string()),
  }),
  trendingTopics: z.array(z.object({
    topic: z.string(),
    momentum: z.string().describe('e.g., "Rising", "Explosive", "Steady"'),
    sentiment: z.string(),
  })),
  growthStrategy: z.string().describe('A high-level growth strategy for this specific audience.'),
});

export type AnalyzeAudienceInput = z.infer<typeof AnalyzeAudienceInputSchema>;
export type AnalyzeAudienceOutput = z.infer<typeof AnalyzeAudienceOutputSchema>;

export async function analyzeAudienceTrends(input: AnalyzeAudienceInput): Promise<AnalyzeAudienceOutput> {
  return analyzeAudienceFlow(input);
}

const audiencePrompt = ai.definePrompt({
  name: 'analyzeAudiencePrompt',
  input: { schema: AnalyzeAudienceInputSchema },
  output: { schema: AnalyzeAudienceOutputSchema },
  prompt: `You are an elite market intelligence analyst. Perform a deep audience analysis for the following niche:

Niche: {{{niche}}}

Provide:
1. Detailed demographics including age, locations, and interests.
2. Current trending topics with their momentum and general sentiment.
3. A strategic growth recommendation to capture this audience's attention using a managed AI fleet.

Ensure the data feels authoritative and data-driven.`,
});

const analyzeAudienceFlow = ai.defineFlow(
  {
    name: 'analyzeAudienceFlow',
    inputSchema: AnalyzeAudienceInputSchema,
    outputSchema: AnalyzeAudienceOutputSchema,
  },
  async (input) => {
    const { output } = await audiencePrompt(input);
    return output!;
  }
);
