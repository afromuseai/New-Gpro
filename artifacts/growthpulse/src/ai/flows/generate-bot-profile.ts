import { z } from "zod";

const GenerateBotProfileInputSchema = z.object({
  platform: z
    .enum(["instagram", "tiktok", "twitter", "youtube", "linkedin", "generic"])
    .optional(),
  profileType: z.string(),
  archetype: z
    .enum(["Skeptic", "Superfan", "Analytical", "Hype", "Professional", "Casual"])
    .default("Casual"),
  interests: z.string().optional(),
});
export type GenerateBotProfileInput = z.infer<typeof GenerateBotProfileInputSchema>;

const GenerateBotProfileOutputSchema = z.object({
  generalProfile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    profilePictureUrl: z.string(),
    bio: z.string(),
    joinDate: z.string(),
    isVerified: z.boolean(),
    followerCount: z.number(),
    followingCount: z.number(),
    postCount: z.number(),
    location: z.string().optional(),
    archetypeLabel: z.string(),
  }),
});
export type GenerateBotProfileOutput = z.infer<typeof GenerateBotProfileOutputSchema>;

export async function generateBotProfile(
  input: GenerateBotProfileInput,
): Promise<GenerateBotProfileOutput> {
  const res = await fetch(`/api/ai/generate-bot-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Bot profile request failed: ${res.status}`);
  return (await res.json()) as GenerateBotProfileOutput;
}
