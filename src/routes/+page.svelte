<script lang="ts">
  import { useChat } from "@ai-sdk/svelte";
  import Message from "../lib/components/Message.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { Input } from "$lib/components/ui/input/index.js";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  const { input, handleSubmit, messages } = useChat();
  $input = "Please summarise dQw4w9WgXcQ";
  $effect(() => {
    console.log($messages);
  });
</script>

<main>
  {#each $messages as message}
    <Message {message} />
  {/each}
  <form onsubmit={handleSubmit}>
    <div class="grid w-full gap-2">
      <Textarea class="max-w" bind:value={$input} />
      <Button variant="outline" type="submit">send</Button>
    </div>
  </form>
</main>
