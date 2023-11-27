<script>
    //https://svelte-forms-lib-sapper-docs.vercel.app/introduction
    //npm i svelte-forms-lib

    // https://www.npmjs.com/package/yup
    //npm i yup

    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";

    import { supabase } from "./store";
    import { supauser } from "./store";

    export let hide;

    const { isValid, form, errors, state, handleChange, handleSubmit } =
        createForm({
            initialValues: {
                title: "Mr.",
                name: "",
                email: "vvv@mm.com",
                password: "",
                confirmpwd: "",
            },

            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .min(3, "имя д.б. не менее 3-х символов")
                    .required("Укажите, пожалуйста, имя"),

                email: yup
                    .string()
                    .email("укажите корректный email")
                    .required("Это поле обязательно для заполнения"),

                title: yup.string().oneOf(["Mr,", "Mrs", "Mx."]).required(),

                password: yup
                    .string()
                    .min(6, "пароль д.б. не менее 6 символов")
                    .required("Укажите, пожалуйста, пароль"),

                confirmpwd: yup
                    .string()
                    .oneOf([yup.ref("password")], "Пароли не совпадают"),
            }),

            onSubmit: (values) => {
                console.log("submit");
                alert(JSON.stringify(values.email));
            },
        });

    async function signInUser() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: $form.email,
            password: $form.password,
        });

        console.log("???", error, data);
        if (data.user) {
            $supauser.user = data.user;
            hide();
        }
    }
</script>

<div
    class=" bg-gray-100 py-0 flex flex-col justify-center sm:py-12 border border-gray-400"
>

    <form on:submit|preventDefault={signInUser}>
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"
            ></div>
            <div
                class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
            >
                <div class="max-w-md mx-auto">
                    <div>
                        <h1 class="text-2xl font-semibold">Вход</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div
                            class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                        >
                            <div class="relative">
                                <input
                                    autocomplete="off"
                                    id="email"
                                    name="email"
                                    type="email"
                                    on:change={handleChange}
                                    on:blur={handleChange}
                                    bind:value={$form.email}
                                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Email address"
                                />

                                <label
                                    for="email"
                                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >Email Address</label
                                >

                                <div class="mt-1 w-[200px]">
                                    {#if $errors.email}
                                        <small class="block leading-none">
                                            {$errors.email}
                                        </small>
                                    {/if}
                                </div>
                            </div>

                            <div class="relative">
                                <input
                                    autocomplete="off"
                                    id="password"
                                    name="password"
                                    type="password"
                                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Password"
                                    on:change={handleChange}
                                    on:blur={handleChange}
                                    bind:value={$form.password}
                                />
                                <label
                                    for="password"
                                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >Password</label
                                >

                                <div class="mt-1 w-[200px]">
                                    {#if $errors.password}
                                        <small class="block leading-none">
                                            {$errors.password}
                                        </small>
                                    {/if}
                                </div>
                            </div>
                            <div class="relative text-right">
                                <button type='submit'
                                disabled={!$isValid} 
                                    class="bg-blue-500 text-white rounded-md px-2 py-1"
                                    >Войти</button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<style>
</style>