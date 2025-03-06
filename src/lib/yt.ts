import { YoutubeTranscript } from "@fbehrens/youtube-transcript";

export async function getTranscript({ videoId }: { videoId: string }) {
  const t = await YoutubeTranscript.fetchTranscript(videoId);
  const text = t.reduce((acc, o) => {
    return acc + " " + o.text;
  }, "§");
  return text;
}
