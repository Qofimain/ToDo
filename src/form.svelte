<script>
    //https://svelte-forms-lib-sapper-docs.vercel.app/introduction
    //npm i svelte-forms-lib

    // https://www.npmjs.com/package/yup
    //npm i yup

    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";

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
                    .required(),

                title: yup.string().oneOf(["Mr,", "Mrs", "Mx."]).required(),

                password: yup.string().required("Укажите, пожалуйста, пароль"),

                confirmpwd: yup
                    .string()
                    .oneOf([yup.ref("password")], "Пароли не совпадают"),
            }),

            onSubmit: (values) => {
                alert(JSON.stringify(values.email));
            },
        });
</script>

<div>{$isValid}</div>
<div>
    {JSON.stringify($errors)}
</div>
<div>
    {JSON.stringify($form)}
</div>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="title">title</label>
        <select
            id="title"
            name="title"
            on:change={handleChange}
            bind:value={$form.title}
        >
            <option />
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Mx.</option>
        </select>
    </div>
    <div>
        <label for="name">name</label>
        <input
            id="name"
            name="name"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.name}
        />
        {#if $errors.name}
            <p>
                <small>
                    {$errors.name}
                </small>
            </p>
        {/if}
    </div>
    <div>
        <label for="email">email</label>
        <input
            id="email"
            name="email"
            type="email"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.email}
        />
        {#if $errors.email}
            <small>
                {$errors.email}
            </small>
        {/if}
    </div>

    <div>
        <label for="password">Пароль</label>
        <input
            id="password"
            name="password"
            type="password"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.password}
        />
        {#if $errors.password}
            <small>
                {$errors.password}
            </small>
        {/if}
    </div>

    <div>
        <label for="confirmpwd">Подтвердите пароль</label>
        <input
            id="confirmpwd"
            name="confirmpwd"
            type="password"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.confirmpwd}
        />
        {#if $errors.confirmpwd}
            <small>
                {$errors.confirmpwd}
            </small>
        {/if}
    </div>

    <p>
        <button disabled={!$isValid} type="submit">Submit</button>
    </p>
</form>