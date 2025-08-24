'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Camera, User, LogOut } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar: string | null
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
  
  // Mock user state - replace with actual auth context
  const [user] = useState<User | null>(null)

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = (): void => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <nav className="bg-primary-200 shadow-lg/60 sticky top-0 z-50 shadow-primary-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Camera className="h-10 w-10 text-blue-900" />
            <span className="text-3xl font-bold text-blue-900">ImageVault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className=" text-gray-700 text-lg weight-20px hover:text-primary-600 hover:underline transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-700 text-lg hover:text-primary-600 hover:underline transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 text-lg hover:text-primary-600 hover:underline transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 text-lg hover:text-primary-600 hover:underline transition-colors">
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-900 hover:underline transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/gallery" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Profile
                  </Link>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}