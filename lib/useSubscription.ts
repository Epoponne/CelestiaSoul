import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export function useSubscription() {
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single()
      if (data && (data.status === 'active' || data.status === 'trialing')) {
        setIsPaid(true)
      }
      setLoading(false)
    }
    check()
  }, [])

  return { isPaid, loading }
}