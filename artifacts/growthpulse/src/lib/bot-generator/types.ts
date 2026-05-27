export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'linkedin' | 'generic';
export type Gender = 'male' | 'female' | 'neutral';

export interface BotProfileBase {
  platform: Platform;
  id: string;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  profilePicture: string;
  followerCount: number;
  followingCount: number;
  isVerified: boolean;
  accountCreated: Date;
  location?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InstagramProfile extends BotProfileBase {
  platform: 'instagram';
  isPrivate: boolean;
  isBusiness: boolean;
  mediaCount: number;
  highlights: number;
  storyArchive: boolean;
}

export interface TikTokProfile extends BotProfileBase {
  platform: 'tiktok';
  displayName: string;
  heartCount: number;
  videoCount: number;
  avgViewCount: number;
  avgEngagementRate: number;
  duetsEnabled: boolean;
  stitchesEnabled: boolean;
  primaryCategory: string;
  badges: string[];
}

export interface TwitterProfile extends BotProfileBase {
  platform: 'twitter';
  displayName: string;
  headerImage: string;
  tweetCount: number;
  likesCount: number;
  isBot: boolean;
  theme: string;
}

export type BotProfile = InstagramProfile | TikTokProfile | TwitterProfile;
