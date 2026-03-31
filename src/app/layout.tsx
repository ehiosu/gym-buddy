
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/Providers/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
// import { AuthModal } from "@/features/auth/components/AuthModal";
import { Toaster } from "@/components/ui/sonner";
import { CreateRoutineModal } from "@/features/routines/components/create-routine-modal";
import { CreateGoalDialog } from "@/features/goals/components/create-goal-dialog";
import { AddRecordModal } from "@/features/goals/components/add-record-modal";
import { CreateDietModal } from "@/features/diet/components/create-diet-modal";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx or app/page.tsx
export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Gym Buddy – AI Fitness Planner",
  description:
    "Gym Buddy is an AI-powered fitness app that generates personalized workout routines and diet plans. Track your fitness goals with ease using a smart, responsive interface.",
  keywords: [
    "AI fitness app",
    "workout planner",
    "diet planner",
    "fitness tracker",
    "Next.js app",
    "Convex backend",
    "Gym Buddy",
    "personalized workouts",
    "nutrition plan",
  ],
  authors: [{ name: "Umar Abdulmalik", }],
  creator: "Umar Abudlmalik",
  openGraph: {
    title: "Gym Buddy – AI Fitness Planner",
    description:
      "An AI-powered app that creates custom workouts and diet plans to help you meet your fitness goals.",
    url: "https://your-gymbuddy.netlify.app/",
    
    siteName: "Gym Buddy",
    images: [
      {
        url: "https://your-gymbuddy.netlify.app/gym-buddy-logo.png", // Replace with your image
        width: 1200,
        height: 630,
        alt: "Gym Buddy App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Buddy – AI Fitness Planner",
    description:
      "AI-generated workouts and nutrition plans tailored to your goals. Built with Next.js and Convex.",
    images: ["https://your-gymbuddy.netlify.app/gym-buddy-logo.png"], // Same image as OpenGraph
    creator: "@yourhandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          {/* <AuthModal/> */}
          <CreateRoutineModal/>
          <CreateGoalDialog/>
          <AddRecordModal/>
          <CreateDietModal/>
          <Toaster position={"top-center"} closeButton />
          {children}
          </ConvexClientProvider>
      </body>
    </html>
    </ConvexAuthNextjsServerProvider>
  );
}
