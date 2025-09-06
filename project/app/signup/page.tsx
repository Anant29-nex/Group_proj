'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

export default function SignupPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/gallery')
    }
  }, [user, router])

  if (user) return null

  return (
    <div className="max-w-md mx-auto mt-12 mb-25">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Account</h1>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}