'use server';
/**
 * @fileOverview A Genkit flow for generating narrative-shifting strategies during social media crises.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CrisisResponseInputSchema = z.object({
  crisisDescription: z.string().describe('The nature of the negative sentiment or crisis.'),
  targetPlatform: z.string().describe('The platform where the crisis is unfolding.'),
  intensity: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The severity of the situation.'),
});

const CrisisResponseOutputSchema = z.object({
  narrativeShift: z.string().describe('The core message shift needed to neutralize the crisis.'),
  fleetDirectives: z.array(z.object({
    archetype: z.string(),
    action: z.string().describe('What this archetype should do (e.g., "Ask clarifying questions").'),
    sampleComment: z.string(),
  })).describe('Instructions for the 1.2M managed fleet.'),
  threatLevelReduction: z.string().describe('Estimated reduction in negative sentiment.'),
});

export type CrisisResponseInput = z.infer<typeof CrisisResponseInputSchema>;
export type CrisisResponseOutput = z.infer<typeof CrisisResponseOutputSchema>;

export async function generateCrisisResponse(input: CrisisResponseInput): Promise<CrisisResponseOutput> {
  return crisisResponseFlow(input);
}

const crisisPrompt = ai.definePrompt({
  name: 'generateCrisisResponsePrompt',
  input: { schema: CrisisResponseInputSchema },
  output: { schema: CrisisResponseOutputSchema },
  prompt: `You are a high-level Crisis Communications AI. A negative narrative is emerging.

**Crisis:** {{{crisisDescription}}}
**Platform:** {{{targetPlatform}}}
**Intensity:** {{{intensity}}}

Task:
1. Define a narrative shift to neutralize the situation without looking like a corporate bot.
2. Provide specific directives for our 1.2M profile fleet, broken down by Behavioral Archetypes (Skeptic, Superfan, Analytical).
3. The response should be subtle, organic, and designed to drown out the negativity with 'Reasonable Doubt' or 'Alternative Perspectives'.`,
});

const crisisResponseFlow = ai.defineFlow(
  {
    name: 'crisisResponseFlow',
    inputSchema: CrisisResponseInputSchema,
    outputSchema: CrisisResponseOutputSchema,
  },
  async (input) => {
    const { output } = await crisisPrompt(input);
    return output!;
  }
);
