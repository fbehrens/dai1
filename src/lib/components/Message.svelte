<script lang="ts">
  import type { UIMessage } from "ai";
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
    <b>{part.toolInvocation.toolName}</b>
    (
    {JSON.stringify(part.toolInvocation.args)}
    )={#if part.toolInvocation.state === "result"}{part.toolInvocation.result
        .length} chars
    {/if}
    <br />
  {/if}
{/each}
<hr />
