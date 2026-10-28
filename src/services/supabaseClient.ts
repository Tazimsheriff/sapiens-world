import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Future table `interactive_content`:
 * id text primary key
 * title text
 * description text
 * action_label text null
 * action_href text null
 * tags text[] null
 *
 * Placement ids in the world layout already match `id`.
 */
export type InteractiveContentRow = {
  id: string
  title: string
  description: string
  action_label: string | null
  action_href: string | null
  tags: string[] | null
}

function envString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null
}

export function createSupabaseClient(): SupabaseClient | null {
  const url = envString(import.meta.env.VITE_SUPABASE_URL)
  const anonKey = envString(import.meta.env.VITE_SUPABASE_ANON_KEY)
  if (!url || !anonKey) return null
  return createClient(url, anonKey)
}

export const supabaseClient = createSupabaseClient()
