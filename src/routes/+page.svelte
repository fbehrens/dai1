<script lang="ts">
  import { useChat } from "@ai-sdk/svelte";
  import Message from "../lib/components/Message.svelte";
  const { input, handleSubmit, messages } = useChat();
  $input = "Please summarise gUiSSddtqpM";
  $effect(() => {
    console.log($messages);
  });
</script>

<main>
  {#each $messages as message}
    <Message {message} />
  {/each}
  <form onsubmit={handleSubmit}>
    <input bind:value={$input} />
    <button type="submit">Send</button>
  </form>
</main>
