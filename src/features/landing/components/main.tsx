"use client";
import Head from 'next/head'
import AnimatedBlobs from './animated-blobs'
import Header from './header'
import Hero from './hero'
import Features from './features'
import Testimonials from './testimonials'
import Pricing from './pricing'
import CTA from './cta'
import Footer from './footer'


export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Gym Buddy | AI-Powered Fitness Companion</title>
        <meta name="description" content="Generate workout plans, diet recommendations, and track your sessions with Gym Buddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedBlobs />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}