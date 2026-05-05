import { YouTubeTrack } from "./types";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Parses an ISO 8601 duration string (e.g., PT3M42S) into total seconds.
 */
function parseISODuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Fetches playlist items, retrieves their durations, and returns a shuffled queue.
 * Caches the raw API responses for 1 hour to prevent quota exhaustion.
 */
export async function fetchRandomizedPlaylist(playlistId: string): Promise<YouTubeTrack[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YOUTUBE_API_KEY is not defined. Returning empty playlist.");
    return [];
  }

  try {
    const cacheTime = process.env.NODE_ENV === "development" ? 0 : 3600;

    // 1. Fetch playlist items (only getting the snippet and contentDetails for the videoId)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: cacheTime } }
    );

    if (!playlistRes.ok) {
      throw new Error(`Failed to fetch playlist items: ${playlistRes.statusText}`);
    }

    const playlistData = await playlistRes.json();
    const videoIds = playlistData.items?.map((item: any) => item.contentDetails?.videoId).filter(Boolean);

    if (!videoIds || videoIds.length === 0) return [];

    // 2. Fetch actual video details to get titles, thumbnails, and accurate durations
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: cacheTime } }
    );

    if (!videosRes.ok) {
      throw new Error(`Failed to fetch video details: ${videosRes.statusText}`);
    }

    const videosData = await videosRes.json();

    // 3. Map into strictly typed YouTubeTrack objects
    const tracks: YouTubeTrack[] = videosData.items.map((item: any) => {
      const durationStr = item.contentDetails?.duration || "PT0S";
      return {
        id: item.id,
        title: item.snippet?.title || "Unknown Title",
        duration: parseISODuration(durationStr),
        thumbnailUrl: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || "",
      };
    });

    // 4. Randomize the track queue
    return shuffleArray(tracks);
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    return [];
  }
}
