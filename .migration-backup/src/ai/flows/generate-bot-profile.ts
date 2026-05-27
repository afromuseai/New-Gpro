'use server';
/**
 * @fileOverview A Genkit flow for generating realistic bot profiles with behavioral archetypes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as pools from '@/lib/bot-generator/data-pools';

const GenerateBotProfileInputSchema = z.object({
  platform: z
    .enum(['instagram', 'tiktok', 'twitter', 'youtube', 'linkedin', 'generic'])
    .optional()
    .describe('The social media platform for which to generate the profile.'),
  profileType: z
    .string()
    .describe('The type of profile to generate, e.g., "influencer", "brand".'),
  archetype: z
    .enum(['Skeptic', 'Superfan', 'Analytical', 'Hype', 'Professional', 'Casual'])
    .default('Casual')
    .describe('The behavioral archetype that dictates engagement style.'),
  interests: z
    .string()
    .optional()
    .describe('Comma-separated list of interests.'),
});
export type GenerateBotProfileInput = z.infer<typeof GenerateBotProfileInputSchema>;

const GenerateBotProfileOutputSchema = z.object({
  generalProfile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    profilePictureUrl: z.string().url(),
    bio: z.string(),
    joinDate: z.string().datetime(),
    isVerified: z.boolean(),
    followerCount: z.number(),
    followingCount: z.number(),
    postCount: z.number(),
    location: z.string().optional(),
    archetypeLabel: z.string().describe('A short description of the behavioral archetype behavior.'),
  }),
});
export type GenerateBotProfileOutput = z.infer<typeof GenerateBotProfileOutputSchema>;

export async function generateBotProfile(input: GenerateBotProfileInput): Promise<GenerateBotProfileOutput> {
  return generateBotProfileFlow(input);
}

const botProfilePrompt = ai.definePrompt({
  name: 'generateBotProfilePrompt',
  input: { schema: GenerateBotProfileInputSchema },
  output: { schema: GenerateBotProfileOutputSchema },
  prompt: `You are an expert in social media profile generation and behavioral psychology.
Generate a realistic AI asset for a managed fleet of 1.2M profiles.

**Behavioral Archetype:** {{{archetype}}}
(This profile should behave as a {{{archetype}}}. Their bio and metadata should subtly reflect this persona.)

Profile Type: {{{profileType}}}
Platform: {{{platform}}}
Interests: {{{interests}}}

Use these pools for inspiration:
- Names: {{{firstNames}}}, {{{lastNames}}}
- Locations: {{{locations}}}
- Bio Mottos: {{{mottos}}}

Ensure the 'archetypeLabel' describes how this persona interacts (e.g., 'Challenges claims with data' for Analytical, or 'Boosts enthusiasm' for Superfan).`,
});

const generateBotProfileFlow = ai.defineFlow(
  {
    name: 'generateBotProfileFlow',
    inputSchema: GenerateBotProfileInputSchema,
    outputSchema: GenerateBotProfileOutputSchema,
  },
  async (input) => {
    const { output } = await botProfilePrompt({
      ...input,
      firstNames: JSON.stringify(pools.firstNames),
      lastNames: JSON.stringify(pools.lastNames),
      locations: JSON.stringify(pools.locations),
      mottos: JSON.stringify(pools.mottos),
    });
    return output!;
  }
);
