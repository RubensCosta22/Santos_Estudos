import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './config.js'

const configured = Boolean(
  SUPABASE_URL &&
  SUPABASE_PUBLISHABLE_KEY &&
  !SUPABASE_URL.includes('SEU-PROJETO') &&
  !SUPABASE_PUBLISHABLE_KEY.includes('SUBSTITUA_AQUI')
)

export const cloudEnabled = configured
export const supabase = configured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null

export async function getSession(){
  if(!supabase) return { session:null, error:new Error('Supabase não configurado') }
  const { data, error } = await supabase.auth.getSession()
  return { session:data?.session ?? null, error }
}

export async function signIn(email,password){ return supabase.auth.signInWithPassword({ email, password }) }
export async function signUp(email,password){
  return supabase.auth.signUp({ email, password, options:{ emailRedirectTo: window.location.origin } })
}
export async function signOut(){ return supabase.auth.signOut() }
export function onAuthStateChange(callback){ return supabase.auth.onAuthStateChange((event,session)=>callback(event,session)) }

export async function fetchUserState(userId){
  const { data, error } = await supabase.from('user_state').select('state, updated_at').eq('user_id',userId).maybeSingle()
  if(error) throw error
  return data ?? null
}
export async function saveUserState(userId,state){
  const { error } = await supabase.from('user_state').upsert({ user_id:userId, state, updated_at:new Date().toISOString() },{ onConflict:'user_id' })
  if(error) throw error
}

export async function fetchTranspetroState(userId){
  const { data, error } = await supabase.from('transpetro_state').select('state, updated_at').eq('user_id',userId).maybeSingle()
  if(error) throw error
  return data ?? null
}
export async function saveTranspetroState(userId,state){
  const { error } = await supabase.from('transpetro_state').upsert({ user_id:userId, state, updated_at:new Date().toISOString() },{ onConflict:'user_id' })
  if(error) throw error
}
