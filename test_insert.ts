import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://xxxx.supabase.co", // ton URL
  "ton_anon_key"
);

async function run() {
  const { data, error } = await supabase
    .from("leads")
    .insert([{ email: "hello@terminal.com", name: "_", message: "_", source: "beta_allia" }])
    .select();

  if (error) console.error("❌ Erreur :", error);
  else console.log("✅ OK :", data);
}

run();
