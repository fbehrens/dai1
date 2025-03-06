import { YoutubeTranscript } from "$lib/vendor/youtube-transcript.ts";

export async function getTranscript({ videoId }: { videoId: string }) {
  const t = await YoutubeTranscript.fetchTranscript(videoId);
  const text = t.reduce((acc, o) => {
    return acc + " " + o.text;
  }, "§");
  return text;
}
