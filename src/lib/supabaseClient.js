// Importamos supabase
import { createClient } from '@supabase/supabase-js'

// Configuramos el URL de nuestro proyecto con su respectiva key
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseWNoeWNoeWV6eWp1bWttZHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyMzIxMjAsImV4cCI6MTk5MzgwODEyMH0.DDzo3Osabf31hrVHnAVk4-0TswmTQfd4CNTvNZSCeLs'
export const supabase = createClient('https://zlychychyezyjumkmdwb.supabase.co', anonKey)