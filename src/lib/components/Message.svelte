<script lang="ts">
  import type { UIMessage } from "ai";

  let { message }: { message: UIMessage } = $props();
</script>

<pre><b>{message.role}:</b>
{#each message.parts as part}
    {#if part.type === "text"}{part.text}
    {:else if part.type === "tool-invocation"}<b
        >{part.toolInvocation.toolName}</b
      >({JSON.stringify(
        part.toolInvocation.args
      )})={#if part.toolInvocation.state === "result"}{part.toolInvocation
          .result}
      {/if}
    {/if}
  {/each}
</pre>
<hr />
