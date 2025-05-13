"use client";
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full z-50 glass shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="gradient-text">GYM</span> BUDDY
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Success Stories</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Pricing</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href={"/auth/signin"} className="hidden md:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all hover:scale-105">
              Log In
            </Link>
            <Link href={"/auth/signup"} className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105 shadow-lg shadow-orange-500/20">
              Get Started
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="#features" className="block text-gray-300 hover:text-white">Features</Link>
            <Link href="#testimonials" className="block text-gray-300 hover:text-white">Success Stories</Link>
            <Link href="#pricing" className="block text-gray-300 hover:text-white">Pricing</Link>
            <Link href="#contact" className="block text-gray-300 hover:text-white">Contact</Link>
            <button className="block w-full mt-4 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  )
}