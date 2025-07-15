import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lyhrksnxjoqkuwpebffx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aHJrc254am9xa3V3cGViZmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzY4ODgsImV4cCI6MjA2ODA1Mjg4OH0.Xt4ZO0C5msAxLIyw8_01ApwG2gtEVBgdoeIdqKqud3Q'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)