"use client";
import { useConvexAuth } from "convex/react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { usePathname } from "next/navigation";
export const AuthModal = () => {
    const {isAuthenticated}=useConvexAuth();
    const pathname = usePathname();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [isAuthenticating,setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {signIn}=useAuthActions();
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if(error){
            setError(null);

        }
       try{
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const email = (formData.get('email') as string).trim()
        const name = (formData.get('username') as string).trim()
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        if(password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }
        setIsAuthenticating(true);
        const currentWeight = parseInt(formData.get('currentWeight') as string)
        const targetWeight = parseInt(formData.get('targetWeight') as string)
       
         signIn("password",{ "name":name,"email":email,"targetWeight":targetWeight,"currentWeight":currentWeight, "password":password,flow:"signUp"}).catch((error) => {
           
            setError(error.message || "An error occurred");
            setIsAuthenticating(false);
         }).finally(()=>{
            setIsAuthenticating(false);
         })
       }catch(error){

        
        setError("An error occurred")
        setIsAuthenticating(false);
       }

    }

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (file) {
    //     //   setImage(file)
    //     //   setPreview(URL.createObjectURL(file))
    //     }
    //   }

    const handleSignIn=(e: React.FormEvent)=>{
      e.preventDefault()
        if(error){
            setError(null);
        }
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        signIn("password",{email,password,flow:"signIn"}).catch((error) => {
        
          setError(error.message || "An error occurred");
          setIsAuthenticating(false);
       }).finally(()=>{
          setIsAuthenticating(false);
       })
    }
  return (
    <Dialog open={!isAuthenticated&&!pathname.includes("landing")} onOpenChange={() => {}}>
        <AnimatePresence>
        {!isAuthenticated && (
          <DialogContent className="flex  max-w-screen md:min-w-[800px]">
           
            <Image src={"/signup-img.svg"} className="w-[300px] md:block hidden" height={200} width={200} alt="Signup"/>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex-1 space-y-4 text-center "
            >
                {error && (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mb-4 rounded-md border border-red-400 bg-red-50 px-4 py-2 text-sm text-red-700"
    >
      {error}
    </motion.div>
  )}
              <DialogTitle className="text-2xl font-semibold lg:p-0 p-4" >
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mb-4">
                {mode === 'signin'
                  ? 'Sign in to continue your fitness journey'
                  : 'Let’s get started on your transformation'}
              </DialogDescription>

           { mode === "signin"?  <form onSubmit={handleSignIn} className="space-y-3">
                <input
                disabled={isAuthenticating}
                name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring"
                />
                <input
                name="password"
                disabled={isAuthenticating}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-black text-white py-2 text-sm hover:bg-neutral-800 transition"
                >
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              </form> :  <>
              {/* <div className="flex flex-col items-center gap-y-2 justify-center">
                <p className="text-sm">
                    Profile picture
                </p>
                <label className="relative cursor-pointer group">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <div className="h-20 w-20 rounded-full border bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm hover:ring-2 hover:ring-black transition">
                    {preview ? (
                      <img src={preview} alt="Profile preview" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-sm text-gray-500">Upload</span>
                    )}
                  </div>
                </label>
              </div> */}

              <form onSubmit={handleSignUp} className=" space-y-3 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                  disabled={isAuthenticating}
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                  <input
                  disabled={isAuthenticating}
                  name="email"
                  required
                    type="email"
                    placeholder="Email"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                  disabled={isAuthenticating}
                  required
                  name="password"
                    type="password"
                    placeholder="Password"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                  <input
                  disabled={isAuthenticating}
                  required
                  name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                  disabled={isAuthenticating}
                  required
                  name="currentWeight"
                    type="number"
                    placeholder="Current Weight (kg)"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                  <input
                  disabled={isAuthenticating}
                  required
                  name="targetWeight"
                    type="number"
                    placeholder="Target Weight (kg)"
                    className="rounded-md border px-3 py-2 text-sm focus:ring w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-black text-white py-2 text-sm hover:bg-neutral-800 transition"
                >
                  Sign Up
                </button>
              </form></>}

              <p className="text-xs text-muted-foreground">
                {mode === 'signin' ? (
                  <>
                    Don’t have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="underline hover:text-black transition"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="underline hover:text-black transition"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>

    </Dialog>
  )
}
