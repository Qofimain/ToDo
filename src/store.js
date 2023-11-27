import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_KEY
)

const user={user:null}

export const supauser = writable(user)