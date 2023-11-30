<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { onMount } from "svelte";
    import { supabase } from "./store";
    import { supauser } from "./store";

    let todos = null;
    
    // onMount(async () => {
    //     let { data: GrigorievToDo, error } = await supabase
    //         .from("GrigorievToDo")
    //         .select("*");
            
    //     if (GrigorievToDo) {
    //         todos = GrigorievToDo;
    //     }
        
    // });
    onMount(
        //Обработка создания компонента
        async () => {
            refresh();
        },
        // async () => {
        // let { data: mytodos, error } = await supabase
        //     .from("mytodos")
        //     .select("*");

        // if (mytodos) {
        //     todos = mytodos;
        // }
    );

    async function refresh() {
        //Обновление
        let { data: GrigorievToDo, error } = await supabase
            .from("GrigorievToDo")
            .select("*");

        if (GrigorievToDo) {
            todos = GrigorievToDo;
        }
    }

    async function addToList() {
         //обработка (fake) добавления
        const { data, error } = await supabase
            .from("GrigorievToDo")
            .insert([{ Text: "новое дело 6", Done: false }])
            .select();

        console.log(error, data);
        if (data) {
            todos = [
                ...todos,
                { Text: data[0].Text, Done: data[0].Done },
            ];
        }
    }
    async function onChange(ev) {
        //обработка checkBox

        console.log(ev.srcElement.checked);

        const { data, error } = await supabase
            .from("mytodos")
            .update({ done: ev.srcElement.checked })
            .eq("id", ev.srcElement.id)
            .select();

        console.log(data,error)
     }
</script>

<div class="flex flex-col items-center justify-center text-black">
    {#if todos}
        <div class="flex flex-col">
            {#each todos as item}
                <div class="flex flex-row justify-between">
                    <div>
                        {item.id}
                    </div>
                    <div>
                        <input
                            id={item.id}
                            on:change={onChange}
                            bind:checked={item.Done}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        {item.Text}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>Загрузка данных...</p>
    {/if}

    <div>
        <button on:click={addToList}> Добавить </button>
    </div>
    <div>
        <button on:click={refresh}> Обновить </button>
    </div>
</div>



<!-- <div class="flex flex-col items-center justify-center">
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
</div> -->