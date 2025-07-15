'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'

export function SessionProvider({ children }) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(true)
      
      // Check for existing session in localStorage
      try {
        const stored = localStorage.getItem('auth-storage')
        if (stored) {
          const { state } = JSON.parse(stored)
          if (state?.user) {
            setUser(state.user)
          }
        }
      } catch (error) {
        console.error('Session restore error:', error)
      }
      
      setLoading(false)
    }

    getInitialSession()
  }, [setUser, setLoading])

  return <>{children}</>
}