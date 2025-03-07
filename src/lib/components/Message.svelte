<script lang="ts">
  import type { UIMessage } from "ai";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import markdownit from "markdown-it";
  const md = markdownit();
  let { message }: { message: UIMessage } = $props();
</script>

<b>{message.role}:</b>
{#each message.parts as part}
  {#if part.type === "text"}
    <div class="markdown-content prose prose-slate max-w-none">
      {@html md.render(part.text)}
    </div>
  {:else if part.type === "tool-invocation"}
    <Accordion.Root type="single">
      <Accordion.Item value="item-1">
        <Accordion.Trigger
          >Tool: {part.toolInvocation.toolName}
          {JSON.stringify(part.toolInvocation.args)})</Accordion.Trigger
        >
        <Accordion.Content>
          ={#if part.toolInvocation.state === "result"}{part.toolInvocation
              .result}
          {/if}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  {/if}
{/each}
<hr />
