'use server';
/**
 * @fileOverview A Genkit flow for generating realistic social media comments for simulation purposes.
 *
 * - generateSimulationComment - A function that handles the generation of a social media comment.
 * - GenerateSimulationCommentInput - The input type for the generateSimulationComment function.
 * - GenerateSimulationCommentOutput - The return type for the generateSimulationComment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSimulationCommentInputSchema = z.object({
  postContent: z
    .string()
    .describe('The full content of the social media post (text, or description of image/video).'),
  postTopic: z.string().describe('The main topic or theme of the social media post.'),
  existingComments: z
    .array(z.string())
    .optional()
    .describe('An optional list of existing comments on the post to maintain context and diversity.'),
  commentStyle: z
    .enum(['positive', 'negative', 'question', 'humorous', 'neutral'])
    .optional()
    .describe('The desired style or tone for the generated comment.'),
  targetAudience: z
    .string()
    .optional()
    .describe('An optional description of the target audience for the comment (e.g., teenagers, professionals).'),
});
export type GenerateSimulationCommentInput = z.infer<typeof GenerateSimulationCommentInputSchema>;

const GenerateSimulationCommentOutputSchema = z.object({
  comment: z.string().describe('The generated social media comment.'),
});
export type GenerateSimulationCommentOutput = z.infer<typeof GenerateSimulationCommentOutputSchema>;

export async function generateSimulationComment(
  input: GenerateSimulationCommentInput
): Promise<GenerateSimulationCommentOutput> {
  return generateSimulationCommentFlow(input);
}

const generateSimulationCommentPrompt = ai.definePrompt({
  name: 'generateSimulationCommentPrompt',
  input: { schema: GenerateSimulationCommentInputSchema },
  output: { schema: GenerateSimulationCommentOutputSchema },
  prompt: `You are an AI assistant designed to generate realistic, human-like social media comments for simulation purposes.
Generate a single comment for the following social media post.

**Social Media Post Content:** {{{postContent}}}
**Main Topic of the Post:** {{{postTopic}}}

{{#if existingComments}}
**Existing Comments for Context:**
{{#each existingComments}}- {{{this}}}
{{/each}}
{{/if}}

{{#if commentStyle}}
**Desired Comment Style/Tone:** {{{commentStyle}}}
{{/if}}

{{#if targetAudience}}
**Target Audience for the Comment:** {{{targetAudience}}}
{{/if}}

Please ensure the comment is:
- Contextually relevant to the post content and topic.
- Human-like in its phrasing and natural language.
- Diverse and not repetitive if existing comments are provided.
- Reflects the requested style/tone and target audience if specified.

Generate only the comment text, without any additional dialogue or formatting.`,
});

const generateSimulationCommentFlow = ai.defineFlow(
  {
    name: 'generateSimulationCommentFlow',
    inputSchema: GenerateSimulationCommentInputSchema,
    outputSchema: GenerateSimulationCommentOutputSchema,
  },
  async (input) => {
    const { output } = await generateSimulationCommentPrompt(input);
    return output!;
  }
);
