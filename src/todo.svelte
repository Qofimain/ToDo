<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { onMount } from "svelte";
    import { supabase } from "./store";
    import { supauser } from "./store";

    let todos = null;
    let newItem = '';
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
            .insert([{ UserID: $supauser.user.id, Text: newItem, Done: false }])
            .select();

        console.log(error, data);
        if (data) {
            todos = [
                ...todos,
                { id: data[0].id, UserID: data[0].UserID, Text: data[0].Text, Done: data[0].Done },
            ];
            
        }
    }

    async function deleteToList(id){

        const { error } = await supabase
            .from('GrigorievToDo')
            .delete()
            .eq('id', id)
            refresh()
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
            <p class = "border-b border-black">
                ㅤ
            </p>
            {#each todos as item}
                <div class="[&:not(:first-child)]:border-l
                            [&:not(:first-child)]:border-r
                            [&:not(:first-child)]:border-b
                            [&:first-child]:border
                             border-black
                            flex flex-row
                            justify-between
                            p-2
                            rw">
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
                        <button on:click={() => deleteToList(item.id)}>
                            ❌
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>Загрузка данных...</p>
    {/if}

    <div class="flex flex-col">
        <p>
            ㅤ
        </p>
        <input bind:value={newItem} type="text" placeholder="Новое дело..">
        <button on:click={addToList}> Добавить </button>
    </div>
    <div>
        <button on:click={refresh}> Обновить </button>
    </div>
</div>

<style>
    /* .rw:first-child {
        border: 1px solid red;
    }
    .rw:not(:first-child) {
        border: 1px solid red;
        border-width: 0 1px 1px 1px;
    }

    .rw{
        border-bottom: 1px solid blue;
        } */
</style>

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