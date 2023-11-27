<script>
    import { onMount } from "svelte";
    import { supabase } from "./store";
    import { supauser } from "./store";

    let todos = null;
    
    onMount(async () => {
        let { data: mytodos, error } = await supabase
            .from("mytodos")
            .select("*");

        if (mytodos) {
            todos = mytodos;
        }
    });
</script>
<div>
{#if todos}
    {#each todos as item}
        <p>
            {item.content}
        </p>
    {/each}
{:else}
    <p>Загрузка данных...</p>
{/if}
</div>