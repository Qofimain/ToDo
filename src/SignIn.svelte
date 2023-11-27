<script>
    //https://tailwindui.com/components/application-ui/forms/sign-in-forms 
    
    import { supabase } from "./store";
       import {supauser} from "./store"
   
       // import User from './user.svelte'
    
    let email='vkondra@gmail.com'
    export let hide;
   
   
   
    let pwd, pwd2;
    pwd='123MazayMazay!'
    pwd2='123MazayMazay!'
    $: pwderr = pwd != pwd2
   
   const signup = async()=>{
    
       const { data, error } = await supabase.auth.signUp({
                 email: email,
                 password: pwd,
                 options: {
                   redirectTo: {emailRedirectTo:'https://5173-vlakondra-supawind-ipljnaxxxny.ws-eu105.gitpod.io'}
                 }
     })
     console.log("???",error, data)
     if (data.user){
     $supauser=data.user}
   }
   
   async function signInUser() {
   
   const { data, error } = await supabase.auth.signInWithPassword({
     email: email,
     password: pwd,
   })
   
   console.log("???",error, data)
     if (data.user){
       $supauser.user=data.user
       hide()
   }
   
   }
   
   
   </script>
   
   
   <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  border border-solid border-indigo-600">
     <div class='flex flex-auto justify-end cursor-pointer'>
       <p>&times;</p>
     </div>
       <div class="sm:mx-auto sm:w-full sm:max-w-sm">
         <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
         <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация пользователя</h2>
       </div>
     
       <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form   on:submit|preventDefault={signInUser} 
         class="space-y-6" >
   
   
           <div>
             <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
             <div class="mt-2">
               <input bind:value={email} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
             </div>
           </div>
     
           <div>
             <div>
               <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
             </div>
   
             <div class="mt-2">
               <input bind:value={pwd} id="password" name="password" type="password" autocomplete="current-password" required class="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
             </div>
           </div>
   
           <div>
               <div>
                 <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Повторите пароль</label>
               </div>
               <div class="mt-2">
                 <input bind:value={pwd2}  id="password" name="password" type="password" autocomplete="current-password" required class="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
               </div>
               {#if pwderr}
                   <label for="password" class="font-medium text-sm text-orange-500 ">пароли не соответствуют </label>
               {/if}  
           </div>
     
           <div>
             <button type="submit" class="form-input    flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
           </div>
         </form>
     
      
       </div>
     </div>