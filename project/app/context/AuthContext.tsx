'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  signup: (name: string, email: string, password: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage, cookies, etc.)
    const checkAuth = (): void => {
      // For now, we'll just set loading to false
      // In a real app, you'd check for existing auth tokens
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    // Implement login logic here
    // For now, just simulate a successful login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: null
    }
    setUser(mockUser)
    return mockUser
  }

  const signup = async (name: string, email: string, password: string): Promise<User> => {
    // Implement signup logic here
    // For now, just simulate a successful signup
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      avatar: null
    }
    setUser(mockUser)
    return mockUser
  }

  const logout = (): void => {
    setUser(null)
    // Clear any stored auth tokens
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
