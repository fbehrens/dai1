import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { getTranscript } from "$lib/yt.ts";
import type { RequestHandler } from "@sveltejs/kit";

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
    model: openai("gpt-4o"),
    tools: {
      transcript,
    },
    maxSteps: 5,
    messages,
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;
