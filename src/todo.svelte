<script>
    import { onMount } from "svelte";
    import { supabase } from "./store";
    import { supauser } from "./store";

    let todos = null;
    let ErrorMasage = null;
    
    onMount(async () => {
        let { data: GrigorievToDo, error } = await supabase
            .from("GrigorievToDo")
            .select("*");
            
        if (GrigorievToDo) {
            todos = GrigorievToDo;
        }
        
    });
</script>


<div class="flex flex-col items-center justify-center">
{#if todos}
    {#each todos as item}
        <p>
            {item.Text}
            {item.Done}
        </p>
    {/each}
{:else}
    <p>Загрузка данных...</p>
{/if}
</div>