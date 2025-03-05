import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;
