"use client";
import { useAuthActions } from '@convex-dev/auth/react';
import { motion } from 'framer-motion'
import { AlertCircle, Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react'
import { AuthLayout } from './AuthLayout';

export const SignupForm = () => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const {signIn}=useAuthActions();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)
    setError('')
    
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      setIsAuthenticating(false)
      return
    }
    

      // Your signup logic here
      await signIn("password",{ "name":data.name as string,"email":data.email as string,"targetWeight":parseInt(data.targetWeight as string),"currentWeight":parseInt
        (data.currentWeight as string), "password":data.password as string,flow:"signUp"}).then(()=>{
        router.push('/dashboard')
      }).catch((error) => {
           
            setError(error.message || "An error occurred");
            setIsAuthenticating(false);
         }).finally(()=>{
            setIsAuthenticating(false);
         }) // Simulate API call
      // Redirect or show success message
   
  }

  const checkPasswordStrength = (password: string) => {
    // Simple password strength checker
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  return (
    <AuthLayout type='signup'>
        <form onSubmit={handleSignUp} className="space-y-4 text-left ">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center  gap-2 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm"
        >
          <AlertCircle className="flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-500" />
          </div>
          <input
            disabled={isAuthenticating}
            type="text"
            placeholder="Username"
            required
            name="name"
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="text-gray-500" />
          </div>
          <input
            disabled={isAuthenticating}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-500" />
            </div>
            <input
              disabled={isAuthenticating}
              required
              name="password"
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
          </div>
          {passwordStrength > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 h-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className={`flex-1 rounded-full ${
                      i <= passwordStrength 
                        ? i <= 2 ? 'bg-red-500' : i === 3 ? 'bg-yellow-500' : 'bg-green-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Good' : 'Strong'} password
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="text-gray-500" />
          </div>
          <input
            disabled={isAuthenticating}
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-400 mb-1">
            Current Weight (kg)
          </label>
          <input
            disabled={isAuthenticating}
            required
            name="currentWeight"
            type="number"
            min="30"
            max="300"
            step="0.1"
            placeholder="e.g. 75.5"
            className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-400 mb-1">
            Target Weight (kg)
          </label>
          <input
            disabled={isAuthenticating}
            required
            name="targetWeight"
            type="number"
            min="30"
            max="300"
            step="0.1"
            placeholder="e.g. 70.0"
            className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            disabled={isAuthenticating}
            className="focus:ring-orange-500 h-4 w-4 text-orange-500 border-gray-700 rounded bg-gray-800"
          />
        </div>
        <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
          I agree to the{' '}
          <a href="#" className="text-orange-500 hover:text-orange-400">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-orange-500 hover:text-orange-400">
            Privacy Policy
          </a>
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={isAuthenticating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          isAuthenticating ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isAuthenticating ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          'Sign Up'
        )}
      </motion.button>
    </form>
    </AuthLayout>
  )
}