import { z } from "zod";

const CrisisResponseInputSchema = z.object({
  crisisDescription: z.string(),
  targetPlatform: z.string(),
  intensity: z.enum(["Low", "Medium", "High", "Critical"]),
});

const CrisisResponseOutputSchema = z.object({
  narrativeShift: z.string(),
  fleetDirectives: z.array(
    z.object({
      archetype: z.string(),
      action: z.string(),
      sampleComment: z.string(),
    }),
  ),
  threatLevelReduction: z.string(),
});

export type CrisisResponseInput = z.infer<typeof CrisisResponseInputSchema>;
export type CrisisResponseOutput = z.infer<typeof CrisisResponseOutputSchema>;

export async function generateCrisisResponse(
  input: CrisisResponseInput,
): Promise<CrisisResponseOutput> {
  const res = await fetch(`/api/ai/crisis-response`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Crisis response request failed: ${res.status}`);
  return (await res.json()) as CrisisResponseOutput;
}
