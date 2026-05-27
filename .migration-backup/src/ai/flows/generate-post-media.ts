'use server';
/**
 * @fileOverview A Genkit flow for generating high-fidelity social media post media using Imagen 4.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePostMediaInputSchema = z.object({
  prompt: z.string().describe('The description of the image to generate.'),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']).default('1:1').describe('The desired aspect ratio of the image.'),
});

const GeneratePostMediaOutputSchema = z.object({
  mediaUrl: z.string().describe('The generated image as a data URI.'),
});

export type GeneratePostMediaInput = z.infer<typeof GeneratePostMediaInputSchema>;
export type GeneratePostMediaOutput = z.infer<typeof GeneratePostMediaOutputSchema>;

export async function generatePostMedia(input: GeneratePostMediaInput): Promise<GeneratePostMediaOutput> {
  return generatePostMediaFlow(input);
}

const generatePostMediaFlow = ai.defineFlow(
  {
    name: 'generatePostMediaFlow',
    inputSchema: GeneratePostMediaInputSchema,
    outputSchema: GeneratePostMediaOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A professional, high-quality social media post image: ${input.prompt}. Style: Modern, clean, and engaging.`,
    });

    if (!media) {
      throw new Error('Failed to generate image media.');
    }

    return {
      mediaUrl: media.url,
    };
  }
);
