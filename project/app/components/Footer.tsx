import Link from 'next/link'
import { Camera, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white h-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">ImageVault</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform for organizing, storing, and sharing your precious memories. 
              Secure, fast, and beautiful.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features/upload" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Bulk Upload
                </Link>
              </li>
              <li>
                <Link href="/features/organize" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Smart Organization
                </Link>
              </li>
              <li>
                <Link href="/features/share" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Easy Sharing
                </Link>
              </li>
              <li>
                <Link href="/features/security" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/features/api" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">hello@imagevault.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">123 Gallery St, Photo City, PC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 ImageVault. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}