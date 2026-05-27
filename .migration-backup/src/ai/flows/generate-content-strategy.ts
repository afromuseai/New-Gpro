'use server';
/**
 * @fileOverview A Genkit flow for generating viral social media strategies, including hashtags and post ideas.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContentStrategyInputSchema = z.object({
  topic: z.string().describe('The main topic or niche of the content.'),
  platform: z.enum(['instagram', 'twitter', 'tiktok', 'linkedin', 'youtube']).describe('The target platform.'),
  targetAudience: z.string().optional().describe('Description of the target audience.'),
});

const ContentStrategyOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('A list of trending and niche-specific hashtags.'),
  postIdeas: z.array(z.object({
    title: z.string(),
    description: z.string(),
    hook: z.string().describe('A compelling first line or visual hook.'),
  })).describe('Creative post ideas based on the topic.'),
  optimizationTips: z.array(z.string()).describe('Platform-specific tips to increase reach.'),
});

export type ContentStrategyInput = z.infer<typeof ContentStrategyInputSchema>;
export type ContentStrategyOutput = z.infer<typeof ContentStrategyOutputSchema>;

export async function generateContentStrategy(input: ContentStrategyInput): Promise<ContentStrategyOutput> {
  return contentStrategyFlow(input);
}

const strategyPrompt = ai.definePrompt({
  name: 'generateContentStrategyPrompt',
  input: { schema: ContentStrategyInputSchema },
  output: { schema: ContentStrategyOutputSchema },
  prompt: `You are an elite social media strategist. Generate a viral content strategy for the following:

Topic: {{{topic}}}
Platform: {{{platform}}}
{{#if targetAudience}}Target Audience: {{{targetAudience}}}{{/if}}

Provide:
1. A mix of trending, niche, and broad hashtags.
2. 3 creative post ideas with strong hooks.
3. 3-5 platform-specific optimization tips for maximum engagement.

Ensure the tone matches the platform's current trends.`,
});

const contentStrategyFlow = ai.defineFlow(
  {
    name: 'contentStrategyFlow',
    inputSchema: ContentStrategyInputSchema,
    outputSchema: ContentStrategyOutputSchema,
  },
  async (input) => {
    const { output } = await strategyPrompt(input);
    return output!;
  }
);
