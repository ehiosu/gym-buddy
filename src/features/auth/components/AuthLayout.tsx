import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

export const AuthLayout = ({
  children,
  type = "login",
}: {
  children: React.ReactNode;
  type?: "login" | "signup" | "forgot";
}) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-800 shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 flex flex-col items-center">
            <Link href="/" className="mb-4">
              <div className="p-1 bg-white rounded-full">
                <Image
                src="/gym buddy logo.png"
                width={80}
                height={80}
                alt="Gym Buddy logo"
                className="w-16 rounded-lg"
              />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white">
              {type === "login" && "Welcome Back"}
              {type === "signup" && "Create Account"}
              {type === "forgot" && "Reset Password"}
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {type === "login" && "Sign in to continue your fitness journey"}
              {type === "signup" && "Start transforming your body today"}
              {type === "forgot" && "Enter your email to reset your password"}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">{children}</div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-800 text-center text-sm text-gray-400">
            {type === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Sign up
                </Link>
              </>
            ) : type === "signup" ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Social Auth */}
       
      </div>
    </div>
  );
};

// const GoogleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path
//       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//       fill="#4285F4"
//     />
//     <path
//       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//       fill="#34A853"
//     />
//     <path
//       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//       fill="#EA4335"
//     />
//   </svg>
// );

// const AppleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
//   </svg>
// );
