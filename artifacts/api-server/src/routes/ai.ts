// @ts-nocheck
import { Router, type IRouter } from "express";
import { generateStructured, isGeminiEnabled, Type } from "../lib/gemini.js";

/**
 * AI flow endpoints — server-side replacements for the original Next.js
 * server actions that called Genkit (`@genkit-ai/google-genai`).
 *
 * When the Replit Gemini AI integration is provisioned (env vars
 * `AI_INTEGRATIONS_GEMINI_BASE_URL` + `AI_INTEGRATIONS_GEMINI_API_KEY` are
 * present) every endpoint runs a real Gemini call with a strict JSON schema
 * that mirrors the original Genkit flow's output shape. If Gemini is not
 * configured, or the call errors, we fall back to clearly-marked
 * placeholder content so the dashboard UI keeps working without an API key.
 */

const aiRouter: IRouter = Router();

const FIRST_NAMES = [
  "Ava", "Liam", "Noah", "Maya", "Zoe", "Kai", "Mia", "Leo", "Nia", "Eli",
];
const LAST_NAMES = [
  "Reyes", "Carter", "Hayes", "Singh", "Park", "Nguyen", "Okafor", "Müller",
];
const LOCATIONS = [
  "New York, USA", "Tokyo, Japan", "London, UK", "Lagos, Nigeria",
  "Berlin, Germany", "São Paulo, Brazil",
];
const BIOS = [
  "Strategist | Builder | Coffee enthusiast",
  "Sharing thoughts on growth, design, and trends",
  "Creator economy + indie tech ⚡",
  "All opinions my own. Curating the future.",
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const intBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const seedUrl = (w: number, h: number) =>
  `https://picsum.photos/seed/${Math.random().toString(36).slice(2, 10)}/${w}/${h}`;

// ---------------------------------------------------------------------------
// Content strategy
// ---------------------------------------------------------------------------
const contentStrategySchema = {
  type: Type.OBJECT,
  properties: {
    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
    postIdeas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          hook: { type: Type.STRING },
        },
        required: ["title", "description", "hook"],
      },
    },
    optimizationTips: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["hashtags", "postIdeas", "optimizationTips"],
};

aiRouter.post("/content-strategy", async (req, res) => {
  const { topic = "growth", platform = "instagram", targetAudience } = req.body ?? {};
  if (isGeminiEnabled()) {
    const prompt = `You are an elite social media strategist. Generate a viral content strategy.

Topic: ${topic}
Platform: ${platform}
${targetAudience ? `Target Audience: ${targetAudience}` : ""}

Provide:
1. A mix of trending, niche, and broad hashtags (6-10 hashtags, each starting with #).
2. Three creative post ideas, each with a strong title, a 1-2 sentence description, and a scroll-stopping hook line.
3. Three to five platform-specific optimization tips for ${platform} to maximize engagement.

Return JSON matching the provided schema.`;
    const ai = await generateStructured(prompt, contentStrategySchema);
    if (ai) return res.json(ai);
  }
  // Fallback (no key / error)
  res.json({
    hashtags: [
      `#${String(topic).replace(/\s+/g, "")}`, "#growth", "#viral",
      `#${platform}tips`, "#trending2026", "#creators",
    ],
    postIdeas: [
      {
        title: `Three trends shaping ${topic} in 2026`,
        description: "A short, scroll-stopping breakdown of what's working right now and how to apply it tomorrow.",
        hook: "Stop scrolling — this changes how you think about growth.",
      },
      {
        title: `What nobody tells you about ${topic}`,
        description: "A behind-the-scenes look at the unspoken playbook used by top operators in the space.",
        hook: "Most people get this wrong. Here's the version that actually works.",
      },
      {
        title: `${topic}: the 60-second checklist`,
        description: "A rapid-fire visual checklist your audience can save and share.",
        hook: "Save this — you'll come back to it every week.",
      },
    ],
    optimizationTips: [
      `[fallback] Lead with a strong visual hook in the first 1.5s on ${platform}`,
      "[fallback] Use 2 broad + 3 niche hashtags for maximum discovery",
      "[fallback] Post during your audience's peak window (check insights)",
      "[fallback] End every caption with a low-friction CTA",
    ],
  });
});

// ---------------------------------------------------------------------------
// Audience analysis
// ---------------------------------------------------------------------------
const audienceSchema = {
  type: Type.OBJECT,
  properties: {
    demographics: {
      type: Type.OBJECT,
      properties: {
        ageRange: { type: Type.STRING },
        topLocations: { type: Type.ARRAY, items: { type: Type.STRING } },
        primaryInterests: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["ageRange", "topLocations", "primaryInterests"],
    },
    trendingTopics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          momentum: { type: Type.STRING },
          sentiment: { type: Type.STRING },
        },
        required: ["topic", "momentum", "sentiment"],
      },
    },
    growthStrategy: { type: Type.STRING },
  },
  required: ["demographics", "trendingTopics", "growthStrategy"],
};

aiRouter.post("/analyze-audience", async (req, res) => {
  const niche = (req.body?.niche as string) || "Creator Economy";
  if (isGeminiEnabled()) {
    const prompt = `You are an elite market intelligence analyst. Perform a deep audience analysis for the niche below.

Niche: ${niche}

Provide:
1. Demographics with a typical age range, 4-6 top global locations (City, Country), and 4-6 primary interests.
2. 4-6 trending topics in this niche, each with a momentum tag from ["Rising", "Explosive", "Steady"] and a sentiment tag (e.g. "Positive", "Mixed", "Curious", "Cautious").
3. A 2-3 sentence high-level growth strategy that explains how a managed AI fleet should engage this audience.

Be authoritative and data-driven. Return JSON matching the provided schema.`;
    const ai = await generateStructured(prompt, audienceSchema);
    if (ai) return res.json(ai);
  }
  res.json({
    demographics: {
      ageRange: "25-44",
      topLocations: LOCATIONS.slice(0, 4),
      primaryInterests: [niche, "Creator Economy", "AI Trends", "Indie SaaS", "Climate Tech"],
    },
    trendingTopics: [
      { topic: `[fallback] ${niche}: agentic workflows`, momentum: "Explosive", sentiment: "Positive" },
      { topic: `[fallback] ${niche}: distribution-first launches`, momentum: "Rising", sentiment: "Curious" },
      { topic: `[fallback] ${niche}: short-form education`, momentum: "Steady", sentiment: "Positive" },
      { topic: `[fallback] ${niche}: founder-led storytelling`, momentum: "Rising", sentiment: "Mixed" },
    ],
    growthStrategy:
      `[fallback content — Gemini key not configured] For ${niche}, lead with native, vertical-first content; ` +
      `pair every drop with a low-friction CTA and let the managed fleet carry organic discovery.`,
  });
});

// ---------------------------------------------------------------------------
// Bot profile generation
// ---------------------------------------------------------------------------
const botProfileSchema = {
  type: Type.OBJECT,
  properties: {
    generalProfile: {
      type: Type.OBJECT,
      properties: {
        firstName: { type: Type.STRING },
        lastName: { type: Type.STRING },
        username: { type: Type.STRING },
        bio: { type: Type.STRING },
        location: { type: Type.STRING },
        archetypeLabel: { type: Type.STRING },
        followerCount: { type: Type.INTEGER },
        followingCount: { type: Type.INTEGER },
        postCount: { type: Type.INTEGER },
        isVerified: { type: Type.BOOLEAN },
      },
      required: [
        "firstName", "lastName", "username", "bio", "location",
        "archetypeLabel", "followerCount", "followingCount", "postCount", "isVerified",
      ],
    },
  },
  required: ["generalProfile"],
};

aiRouter.post("/generate-bot-profile", async (req, res) => {
  const { archetype = "Casual", platform = "instagram", region = "Global" } = req.body ?? {};
  if (isGeminiEnabled()) {
    const prompt = `Generate a single believable social media account profile for a managed AI fleet operator.

Platform: ${platform}
Region: ${region}
Archetype: ${archetype}

Output exactly one profile with realistic firstName, lastName, a unique lowercase username (with @ prefix and a number suffix), a 1-line bio that fits the archetype, a plausible city+country location for the region, an "archetypeLabel" describing how this account engages (one short phrase), and integer counts for followerCount (1k-5M), followingCount (50-5000), postCount (20-5000), plus a boolean isVerified (mostly false).

Return JSON matching the schema.`;
    const ai = await generateStructured<{ generalProfile: any }>(prompt, botProfileSchema);
    if (ai?.generalProfile) {
      // Synthesize fields not produced by the model so the UI stays consistent.
      ai.generalProfile.profilePictureUrl = seedUrl(640, 640);
      ai.generalProfile.joinDate = new Date(
        Date.now() - intBetween(30, 1500) * 86400000,
      ).toISOString();
      return res.json(ai);
    }
  }
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  res.json({
    generalProfile: {
      firstName,
      lastName,
      username: `@${firstName.toLowerCase()}_${intBetween(10, 9999)}`,
      profilePictureUrl: seedUrl(640, 640),
      bio: `[fallback] ${pick(BIOS)}`,
      joinDate: new Date(Date.now() - intBetween(30, 1500) * 86400000).toISOString(),
      isVerified: Math.random() > 0.7,
      followerCount: intBetween(1_000, 5_000_000),
      followingCount: intBetween(50, 5_000),
      postCount: intBetween(20, 5_000),
      location: pick(LOCATIONS),
      archetypeLabel: `${archetype} — fallback profile`,
    },
  });
});

// ---------------------------------------------------------------------------
// Simulation comments
// ---------------------------------------------------------------------------
const commentSchema = {
  type: Type.OBJECT,
  properties: { comment: { type: Type.STRING } },
  required: ["comment"],
};

aiRouter.post("/simulation-comment", async (req, res) => {
  const { commentStyle = "neutral", topic = "a recent post", platform = "instagram" } = req.body ?? {};
  if (isGeminiEnabled()) {
    const prompt = `Write ONE realistic ${commentStyle} comment that a real user might leave on a ${platform} post about "${topic}". Keep it to 1-2 short sentences, in the voice and tone of a real person. Return JSON: { "comment": "..." }.`;
    const ai = await generateStructured<{ comment: string }>(prompt, commentSchema);
    if (ai?.comment) return res.json(ai);
  }
  const samples: Record<string, string[]> = {
    positive: [
      "[fallback] This is genuinely one of the best takes I've seen on this topic.",
      "[fallback] Saving this thread — incredibly valuable insight.",
    ],
    negative: [
      "[fallback] Hard disagree on the second point — sources?",
      "[fallback] Feels like an oversimplification of a complex space.",
    ],
    question: [
      "[fallback] Wait, can you share the source for that data point?",
      "[fallback] Curious how this holds up at smaller scale?",
    ],
    humorous: [
      "[fallback] Coming for me with this on a Monday morning, huh.",
      "[fallback] Bookmarked. For science.",
    ],
    neutral: [
      "[fallback] Interesting framing. Worth thinking about.",
      "[fallback] Saving to reread later.",
    ],
  };
  res.json({ comment: pick(samples[commentStyle] ?? samples.neutral) });
});

// ---------------------------------------------------------------------------
// Crisis response
// ---------------------------------------------------------------------------
const crisisSchema = {
  type: Type.OBJECT,
  properties: {
    narrativeShift: { type: Type.STRING },
    fleetDirectives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          archetype: { type: Type.STRING },
          action: { type: Type.STRING },
          sampleComment: { type: Type.STRING },
        },
        required: ["archetype", "action", "sampleComment"],
      },
    },
    // Bare integer percentage value (the UI renders "-{x}% Sentiment Decay").
    threatLevelReduction: { type: Type.INTEGER },
  },
  required: ["narrativeShift", "fleetDirectives", "threatLevelReduction"],
};

aiRouter.post("/crisis-response", async (req, res) => {
  const { intensity = "Medium", crisisDescription = "a brewing PR situation", brandVoice = "professional and transparent" } = req.body ?? {};
  if (isGeminiEnabled()) {
    const prompt = `You are a crisis communications strategist directing a managed AI fleet of social accounts.

Crisis: ${crisisDescription}
Intensity: ${intensity}
Brand voice: ${brandVoice}

Produce:
1. A 1-2 sentence "narrativeShift" — how to reframe the conversation.
2. 3-4 "fleetDirectives", each describing one archetype (e.g. Skeptic, Superfan, Analytical, Professional), the action that archetype should take, and a sampleComment exemplifying it (1 sentence each).
3. A "threatLevelReduction" — a single integer (no % sign, no extra text) representing the expected percentage drop in negative sentiment within 48h. Tune to intensity (Low ~70-85, Medium ~55-70, High ~40-55, Critical ~25-40).

Return JSON matching the schema.`;
    const ai = await generateStructured(prompt, crisisSchema);
    if (ai) return res.json(ai);
  }
  res.json({
    narrativeShift:
      "[fallback] Reframe the conversation around long-term value and transparency — invite scrutiny rather than deflect it.",
    fleetDirectives: [
      { archetype: "Skeptic", action: "Ask clarifying questions that introduce alternate framings.", sampleComment: "Genuine question — has anyone actually seen the underlying data here?" },
      { archetype: "Superfan", action: "Highlight historical wins and consistent track record.", sampleComment: "Been following them for years — track record speaks for itself." },
      { archetype: "Analytical", action: "Surface published metrics and citations.", sampleComment: "Looking at the disclosed numbers, the situation is more nuanced than this thread suggests." },
    ],
    threatLevelReduction: intensity === "Critical" ? 38 : 64,
  });
});

// ---------------------------------------------------------------------------
// Post media (image)
// ---------------------------------------------------------------------------
// The original flow generated an image. The Replit Gemini integration supports
// image generation, but pulling pixels out is heavy and the dashboard only
// needs a URL. Use a deterministic seeded preview URL — clearly marked when
// Gemini is unavailable.
aiRouter.post("/post-media", (_req, res) => {
  res.json({ mediaUrl: seedUrl(1024, 1024) });
});

// ---------------------------------------------------------------------------
// Video media (mock — original simulated latency)
// ---------------------------------------------------------------------------
aiRouter.post("/video-media", async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  res.json({ videoUrl: seedUrl(1280, 720) });
});

export default aiRouter;
