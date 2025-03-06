import { z } from "zod";
// import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { getTranscript } from "$lib/yt.ts";
import type { RequestHandler } from "@sveltejs/kit";
import { fromFileUrl } from "@std/path/posix/from-file-url";
console.log(fromFileUrl("file:///home/foo"));
// const model = openai("gpt-4o");
const model = anthropic("claude-3-7-sonnet-20250219");
const transcript = tool({
  description: "Get the transcript of a video",
  parameters: z.object({
    videoId: z
      .string()
      .describe("The videoId of the video to get the transcript from"),
  }),
  execute: getTranscript,
});
export const POST = (async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model,
    tools: {
      transcript,
    },
    maxSteps: 5,
    messages,
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;
