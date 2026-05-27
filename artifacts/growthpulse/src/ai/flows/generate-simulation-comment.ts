import { z } from "zod";

const GenerateSimulationCommentInputSchema = z.object({
  postContent: z.string(),
  postTopic: z.string(),
  existingComments: z.array(z.string()).optional(),
  commentStyle: z
    .enum(["positive", "negative", "question", "humorous", "neutral"])
    .optional(),
  targetAudience: z.string().optional(),
});
export type GenerateSimulationCommentInput = z.infer<
  typeof GenerateSimulationCommentInputSchema
>;

const GenerateSimulationCommentOutputSchema = z.object({
  comment: z.string(),
});
export type GenerateSimulationCommentOutput = z.infer<
  typeof GenerateSimulationCommentOutputSchema
>;

export async function generateSimulationComment(
  input: GenerateSimulationCommentInput,
): Promise<GenerateSimulationCommentOutput> {
  const res = await fetch(`/api/ai/simulation-comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Simulation comment request failed: ${res.status}`);
  return (await res.json()) as GenerateSimulationCommentOutput;
}
